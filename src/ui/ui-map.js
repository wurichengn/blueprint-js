import { configure } from 'mobx';
import { useLocalObservable, useObserver } from 'mobx-react';
import { memo, useRef } from 'react';
import { useContext, useEffect } from 'react';
import { useContextMenu } from './hooks/hook-contextmenu';
import { useDomEvent, useMouseDrag } from './hooks/hook-event';
import { StoreMap } from './stores/store-app';
import { MapContext } from './ui-context';
import { UINode } from './ui-node';
import { useSize } from 'ahooks';
import { Program } from '../core/program';
import Styles from './styles/ui-map.less';
import React from 'react';
configure({ enforceActions: false });

/**
 * 逻辑图编辑组件
 * @param {{store:StoreMap}} props
 * @returns {}
 */
export var UIMap = (props) => {
  /** 视图的状态 */
  var state = props.store;
  /** 根节点的ref */
  var ref = useRef();
  var refBG = useRef();
  var refNodes = useRef();
  /** 扩展渲染的节点 */
  var expand = [];
  // 触发渲染钩子
  state.program.hooks.triggerSync('map-render', { ref: ref, state: state, refBG, refNodes, expand });

  // 记录原点坐标
  useEffect(() => {
    state.refOrigin = refNodes.current;
    var rect = refNodes.current.getBoundingClientRect();
    state.viewOrigin.x = rect.left * state.scale;
    state.viewOrigin.y = rect.top * state.scale;

    state.viewSize.width = ref.current.offsetWidth;
    state.viewSize.height = ref.current.offsetHeight;
  });

  // 全局鼠标放开处理
  useDomEvent('mouseup', (e) => { state.actionPointer = null; });
  // 全局鼠标移动
  useDomEvent('mousemove', e => { state.mousePosition = state.mouse2view(e); });

  // 侦听尺寸变化
  useSize(ref);

  return useObserver(() => {
    /** 节点列表 */
    var nodes = state.nodes.map(node => {
      return <UINode node={node} key={node.uid} />;
    });

    return <MapContext.Provider value={{ state: state }}>
      <div ref={ref} style={{ backgroundPosition: `${state.position.x * state.scale}px ${state.position.y * state.scale}px` }} className={Styles.Map}>
        <div ref={refBG} className={Styles.bg} />
        <UILinks />
        <div ref={refNodes} style={{ marginLeft: state.position.x + 'px', marginTop: state.position.y + 'px', zoom: state.scale }} className={Styles.nodes}>{nodes}</div>
        {expand}
      </div>
    </MapContext.Provider>;
  });
};

/** 关联线组件 */
var UILinks = memo(function() {
  var state = useContext(MapContext).state;

  return useObserver(() => {
    // 关联内容
    var lines = state.nodes.map(node => node.getLinks()).flat(5).map(v => {
      v.pe.x;
      return <Line key={v.key} ps={v.ps} pe={v.pe} menuData={v.menuData}/>;
    });

    // 加入当前关联操作
    if (state.actionPointer) {
      lines.push(<Line key='actionPointer' ps={state.actionPointer.pos} pe={state.mousePosition}/>);
    }

    return <div className={Styles.Link}>
      <svg>
        <g style={{ transform: `translate3d(${state.viewSize.width / 2}px,${state.viewSize.height / 2}px,0px)` }}>
          <g style={{ transform: `translate3d(${state.position.x * state.scale}px,${state.position.y * state.scale}px,0px)` }}>{lines}</g>
        </g>
      </svg>
    </div>;
  });
});

/**
 * 单根关联线渲染
 * @param {{ps:{x:number,y:number},pe:{x:number,y:number}}} props 关联线参数
 * @returns
 */
var Line = memo(function(props) {
  var state = useContext(MapContext).state;
  var p1 = { ...props.ps };
  var p2 = { ...props.pe };
  p1.x *= state.scale;
  p1.y *= state.scale;
  p2.x *= state.scale;
  p2.y *= state.scale;
  var c = { x: (p2.x + p1.x) / 2, y: (p2.y + p1.y) / 2 };
  var ref = useRef();

  // 右键菜单功能
  useContextMenu({ ref, menuData: async() => {
    var menu = [];
    if (props.menuData)menu = props.menuData() || [];
    return menu;
  } });

  /** 曲线偏移量 */
  var offset = 40 * state.scale;

  return useObserver(() => {
    return <>
      <path ref={ref} className={Styles.linebg} d={'M' + p1.x + ',' + p1.y + ' Q' + (p1.x + offset) + ',' + p1.y + ',' + c.x + ',' + c.y + ' T' + p2.x + ',' + p2.y} />
      <path className={Styles.line} d={'M' + p1.x + ',' + p1.y + ' Q' + (p1.x + offset) + ',' + p1.y + ',' + c.x + ',' + c.y + ' T' + p2.x + ',' + p2.y} />
    </>;
  });
});
