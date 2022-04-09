import { makeObservable, observable } from 'mobx';
import { useObserver } from 'mobx-react';
import { useEffect, useRef } from 'react';
import { isChild } from '../../utils/utils-dom';
import Styles from './styles/contextmenu.less';
import ReactDOM from 'react-dom';
import React from 'react';

class useContextMenuConfig {
  /** 菜单数据，返回要创建的菜单的数据 */
  async menuData() {};
  /** @type {import("react").Ref<HTMLElement>} 要侦听事件的ref */
  ref;
}

/**
 * 绑定右键菜单
 * @param {useContextMenuConfig} cfg hooks参数
 */
export var useContextMenu = function(cfg) {
  // 初始化菜单
  useEffect(() => {
    var config = new useContextMenuConfig();
    for (var i in cfg)config[i] = cfg[i];

    // 事件侦听
    config.ref.current.addEventListener('contextmenu', async e => {
      lastEvent = e;
      await initMenu();
      e.preventDefault();
      var menuData = await config.menuData();
      globalState.x = e.x;
      globalState.y = e.y;
      globalState.menus = menuData;
      globalState.subState = null;
    });
  });
};

// =======================菜单组件的实现===========================

/** @type {ContextMenuState} 全局公用菜单状态 */
var globalState;
/** @type {HTMLElement} 全局公用容器 */
var globalDiv;
/** @type {MouseEvent} 最后的右键点击事件 */
var lastEvent;

/** 初始化菜单 */
var initMenu = function() {
  if (globalState != null) return;

  return new Promise((next) => {
    /** 全局公用菜单容器 */
    globalDiv = document.createElement('div');
    globalDiv.oncontextmenu = e => { e.preventDefault(); };
    document.body.appendChild(globalDiv);
    // 初始化全局状态
    globalState = new ContextMenuState();
    // 渲染全局菜单
    ReactDOM.render(<ContextMenu state={globalState} />, globalDiv, next);
  });
};

/** 菜单组件 */
var ContextMenu = function(props) {
  /** @type {ContextMenuState} 当前菜单的状态 */
  var state = props.state;
  var ref = useRef();

  // 全局点击侦听
  useEffect(() => {
    // 仅根组件侦听
    if (state !== globalState) return;

    // 点击其他位置关闭菜单
    var click = e => {
      if (!isChild(globalDiv, e.target)) {
        state.menus = null;
      }
    };
    document.addEventListener('click', click);

    // 释放功能
    return () => {
      document.removeEventListener('click', click);
    };
  });

  return useObserver(() => {
    // 没内容不显示
    if (state.menus == null || state.menus.length === 0) {
      return <div />;
    }

    /** 样式 */
    var style = {
      left: state.x + 'px',
      top: state.y + 'px'
    };

    // 处理选项
    var items = state.menus.map((item, index) => {
      // 如果是字符串
      if (typeof item === 'string') {
        return <div className={Styles.text} key={index}>{item}</div>;
      }

      // 非数组过滤
      if (!Array.isArray(item)) return;

      // 如果是回调选项
      if (item.length < 2 || typeof item[1] === 'function') {
        return <div className={Styles.item} key={index} onClick={(item.length > 1) ? () => {
          globalState.menus = null;
          item[1]({ event: lastEvent });
        } : null}
        onMouseOver={e => {
          state.subState = null;
        }}>{item[0]}</div>;
      }

      // 如果是子选项
      if (Array.isArray(item[1])) {
        return <div className={Styles.item} key={index} onMouseOver={e => {
          var subState = new ContextMenuState();
          subState.x = state.x + ref.current.offsetWidth;
          subState.y = state.y + e.target.offsetTop;
          subState.menus = item[1];
          state.subState = subState;
        }}>{item[0]}</div>;
      }
    });

    // 子菜单生成
    var subMenu = null;
    if (state.subState) {
      subMenu = <ContextMenu state={state.subState} />;
    }

    if (state === globalState) {
      return <div ref={ref} style={style} className={Styles.Menu}>{items}{subMenu}</div>;
    } else {
      return ReactDOM.createPortal(<div ref={ref} style={style} className={Styles.Menu}>{items}{subMenu}</div>, globalDiv);
    }
  });
};

/** 右键菜单状态 */
class ContextMenuState {
  constructor() {
    makeObservable(this);
  }
  /** 菜单位置 */
  @observable x = 0;
  @observable y = 0;
  /** 菜单的选项集合 */
  @observable menus = [];
  /** 子节点的状态 */
  @observable subState;
}
