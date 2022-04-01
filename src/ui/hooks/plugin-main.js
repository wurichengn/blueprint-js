import { useContextMenu } from './hook-contextmenu';
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
    // 绑定鼠标右键功能
    useContextMenu({ ref: refTitle, menuData() {
      var menu = [
        ['删除节点', () => { state.node.program.removeNode(state.node); }]
      ];
      state.node.hooks.trigger('node-context-menu', { node: state.node, menu: menu });
      return menu;
    } });
  });
};

/**
 * 编辑器下组件内输入参数扩展
 * @param {import("../../main").Program} program 蓝图程序实例
 */
export var PluginEditorInnerInput = (program) => {
  program.hooks.add('node-render-input', ({ state, node, expand, render }) => {
    // 多输入不支持内联输入参数
    if (state.define.many === true) return;
    // 获取类型
    var type = node.program.types[state.define.type];
    // 非空判断
    if (type == null) return;
    // 如果类型包含输入组件则渲染输入组件
    if (type.inputModule) {
      expand.push(type.inputModule(node.attrs.forms[state.index], (val) => {
        node.attrs.forms[state.index] = val;
        render({});
      }));
    }
  });
};
