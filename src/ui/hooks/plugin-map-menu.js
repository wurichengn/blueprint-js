import { StoreMap } from '../stores/store-app';
import { useContextMenu } from './hook-contextmenu';

/**
 * 启用图的右键菜单插件
 * @param {*} ref 图根节点指针
 * @param {StoreMap} state 蓝图程序实例
 */
export var usePluginMapMenu = function(ref, state) {
  // 右键菜单功能
  useContextMenu({ ref, menuData: async() => {
    var createNodeMenu = getCreateNodeMenu(state);
    return (await state.program.hooks.trigger('map-contextmenu', { state: state, program: state.program, menuData: [
      ['创建节点', createNodeMenu]
    ] })).menuData;
  } });
};

/**
 * 获取创建节点的菜单
 * @param {StoreMap} state
 */
var getCreateNodeMenu = function(state) {
  var program = state.program;
  /** 菜单的映射表 */
  var menuMap = {};
  // 循环写入映射表
  for (var i in program.modules) {
    var module = program.modules[i];
    // 层级处理
    var menu = (module.menu || module.name).split('/');
    var menuItem = menuMap;
    menu.forEach((item, index) => {
      if (index < menu.length - 1) {
        menuItem[item] = menuItem[item] || {};
        menuItem = menuItem[item];
      } else {
        // 回调方法
        menuItem[item] = createNodeCallback(module, state);
      }
    });
  }

  return mapToList(menuMap);
};

/** 将映射表转换为列表 */
var mapToList = function(map) {
  var list = [];
  for (var i in map) {
    if (typeof map[i] === 'object') {
      list.push([i, mapToList(map[i])]);
    } else {
      list.push([i, map[i]]);
    }
  }
  return list;
};

/**
 * 创建节点回调
 * @param {*} Module
 * @param {StoreMap} state
 * @returns
 */
var createNodeCallback = (Module, state) => {
  return ({ event }) => {
    var node = new Module(state.program);
    var pos = state.mouse2view(event);
    node.attrs.x = pos.x;
    node.attrs.y = pos.y;
    state.program.addNode(node);
  };
};
