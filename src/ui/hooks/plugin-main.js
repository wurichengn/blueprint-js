import { useContextMenu } from './hook-contextmenu';
import { useDomEvent, useMouseDrag } from './hook-event';
import { usePluginMapMenu } from './plugin-map-menu';

/**
 * 编辑器情况下需要使用的扩展逻辑
 * @param {import("../../main").Program} program 蓝图程序实例
 */
export var PluginEditor = (program) => {
  // 拓扑图编辑器渲染扩展
  program.hooks.add('map-render', ({ ref, state, refBG }) => {
    // 绑定鼠标拖动功能
    useMouseDrag({ callback: e => {
      state.position.x += e.x / state.scale;
      state.position.y += e.y / state.scale;
    }, ref: refBG });
    // 右键菜单功能
    usePluginMapMenu(refBG, state);
    // 鼠标滚轮功能
    useDomEvent('wheel', e => {
      if (e.deltaY > 0) {
        state.scale /= 1.08;
      } else {
        state.scale *= 1.08;
      }
    }, refBG);
  });

  // 单个节点渲染功能扩展
  program.hooks.add('node-render', ({ refTitle, state }) => {
    // 鼠标是否有拖动
    var mouseMoveEnd = false;
    // 绑定鼠标拖动功能
    useMouseDrag({
      onmousedown: e => {
        mouseMoveEnd = false;
      },
      onmouseup: e => {
        if (mouseMoveEnd === true) {
          return;
        }
        var mode = 0;
        if (e.ctrlKey) {
          mode = 1;
        }
        if (e.shiftKey) {
          mode = 2;
        }
        state.map.selectNode([state], mode);
      },
      callback: e => {
        mouseMoveEnd = true;
        var useNodes = state.map.nodes.filter(node => node.isSelect);
        if (!useNodes.includes(state)) {
          useNodes = [state];
        }
        useNodes.forEach(node => {
          node.x += e.x / state.map.scale;
          node.y += e.y / state.map.scale;
          node.node.attrs.x = node.x;
          node.node.attrs.y = node.y;
        });
      },
      ref: refTitle
    });
    // 绑定鼠标右键功能
    useContextMenu({ ref: refTitle, menuData() {
      var menuData = [
        ['删除节点', () => {
          if (state.isSelect) {
            for (var i = state.map.nodes.length - 1; i >= 0; i--) {
              if (state.map.nodes[i].isSelect) {
                state.node.program.removeNode(state.map.nodes[i].node);
              }
            }
          } else {
            state.node.program.removeNode(state.node);
          }
        }]
      ];
      state.node.hooks.trigger('node-contextmenu', { node: state.node, menuData: menuData });
      return menuData;
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
