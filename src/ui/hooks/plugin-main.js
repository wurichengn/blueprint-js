import { useMouseDrag } from './hook-event';
import { usePluginMapMenu } from './plugin-map-menu';

/**
 * 编辑器情况下需要使用的扩展逻辑
 * @param {import("../../main").Program} program 蓝图程序实例
 */
export var PluginEditor = (program) => {
  // 拓扑图编辑器渲染扩展
  program.hooks.add('map-render', ({ ref, state, refBG }) => {
    // 绑定鼠标拖动功能
    useMouseDrag({ position: state.position, ref: refBG });
    // 右键菜单功能
    usePluginMapMenu(refBG, state);
  });

  // 单个节点渲染功能扩展
  program.hooks.add('node-render', ({ refTitle, state }) => {
    // 绑定鼠标拖动功能
    useMouseDrag({ position: state, ref: refTitle });
  });
};
