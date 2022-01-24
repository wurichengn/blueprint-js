import { Program } from '../../main';
import { useContextMenu } from './hook-contextmenu';
import { useMouseDrag } from './hook-event';

/**
 * 编辑器情况下需要使用的扩展逻辑
 * @param {Program} program 蓝图程序实例
 */
export var PluginEditor = (program) => {
  // 拓扑图编辑器渲染扩展
  program.hooks.add('map-render', ({ ref, state }) => {
    // 绑定鼠标拖动功能
    useMouseDrag({ position: state.position, ref });

    // 右键菜单功能
    useContextMenu({ ref, menuData: async() => {
      return (await program.hooks.trigger('map-contextmenu', { menuData: [
        '---',
        ['a'],
        ['b', () => { console.log('b'); }],
        ['c', [
          ['d', () => { console.log('d'); }]
        ]]
      ] })).menuData;
    } });
  });
};
