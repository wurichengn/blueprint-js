import Styles from './styles/map-top-menu.less';
import React from 'react';
import { StoreMap } from '../stores/store-app';

/**
 * 编辑器下组件内输入参数扩展
 * @param {import("../../main").Program} program 蓝图程序实例
 */
export var PluginTopMenu = program => {
  program.hooks.add('map-render', ({ expand, state }) => {
    expand.push(<Menu key='map-top-menu' state={state} />);
  });
};

/**
 * 顶部菜单组件
 * @param {{state:StoreMap}} props
 * @returns
 */
var Menu = props => {
  return <div className={Styles.Menu}>
    <div className={Styles.Types} />
    <div className={Styles.Stack} />
    <div className={Styles.Buttons}>
      <button onClick={e => { props.state.scale /= 1.08; }}>-</button>
      <button onClick={e => { props.state.scale *= 1.08; }}>+</button>
    </div>
  </div>;
};
