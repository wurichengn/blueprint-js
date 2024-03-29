import { Program } from '../../core/program';
import { useContextMenu } from './hook-contextmenu';
import { useDomEvent, useMouseDrag } from './hook-event';
import { usePluginMapMenu } from './plugin-map-menu';

/**
 * 编辑器情况下需要使用的扩展逻辑
 * @param {import("../../main").BluePrintProgram} program 蓝图程序实例
 */
export var PluginEditor = (program) => {
  // 拓扑图编辑器渲染扩展
  program.hooks.add('map-render', ({ ref, state, refBG }) => {
    // 绑定鼠标拖动功能
    useMouseDrag({ callback: e => {
      state.position.x += e.x / state.scale;
      state.position.y += e.y / state.scale;
    }, ref: refBG });
    // 右键多选
    useMouseDrag({
      button: 2,
      onmousedown: e => {
        var pos = state.mouse2view(e);
        state.selectBox = { x1: pos.x, x2: pos.x, y1: pos.y, y2: pos.y };
      },
      onmousemove: e => {
        var pos = state.mouse2view(e);
        state.selectBox.x2 = pos.x;
        state.selectBox.y2 = pos.y;
      },
      onmouseup: e => {
        var sx = Math.min(state.selectBox.x1, state.selectBox.x2);
        var sy = Math.min(state.selectBox.y1, state.selectBox.y2);
        var ex = Math.max(state.selectBox.x1, state.selectBox.x2);
        var ey = Math.max(state.selectBox.y1, state.selectBox.y2);
        var mode = 0;
        if (e.ctrlKey) { mode = 1; }
        if (e.shiftKey) { mode = 2; }
        var nodes = state.nodes.filter(node => {
          return node.x > sx && node.x < ex && node.y > sy && node.y < ey;
        });
        state.selectNode(nodes, mode);
        state.selectBox = null;
      },
      ref: refBG
    });
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
  program.hooks.add('node-render', ({ refTitle, state, render }) => {
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
        ['修改名称', () => {
          var name = prompt('请输入要修改的名称', state.node.getNodeName());
          state.node.attrs.name = name;
          render();
        }],
        ['删除节点', () => {
          if (state.isSelect) {
            state.map.removeSelectNode();
          } else {
            state.node.program.removeNode(state.node);
          }
        }],
        ['复制节点', () => {
          if (state.isSelect) {
            state.map.copyNodes(state.map.nodes.filter(node => node.isSelect));
          } else {
            state.map.copyNodes([state]);
          }
        }]
      ];
      state.node.hooks.trigger('node-contextmenu', { node: state.node, menuData: menuData });
      return menuData;
    } });
  });

  /** 图右键菜单扩展 */
  program.hooks.add('map-contextmenu', (e) => {
    if (e.state.clipboard != null) {
      // 粘贴节点
      e.menuData.push(['粘贴节点', async() => {
        e.state.pasteNodes();
      }]);
    }
  });
};

/**
 * 编辑器下组件内输入参数扩展
 * @param {Program} program 蓝图程序实例
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
        node.hooks.trigger('node-forms-update', { node: node, key: state.index, value: val });
        render({});
      }, state.define));
    }
  });
};
