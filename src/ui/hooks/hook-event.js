import { useEffect, useRef } from 'react';

class MouseDragArgs {
  /** @type {{x:number,y:number}} 要操作的对象 */
  position = null;
  /** @type {(pos:{x:number,y:number})=>{}} 移动回调函数 */
  callback = null;
  /** 是否反向操作 */
  reverse = false;
  /** 操作比例尺 */
  scale = 1;
  /** 要侦听的按钮 */
  button = 0;
  /** 要侦听事件的ref，如果没有会自动创建 */
  ref = null;
}

/**
 * 添加一个鼠标拖动功能
 * @param {MouseDragArgs} cfg 功能参数
 */
export var useMouseDrag = function(cfg = {}) {
  var ref = cfg.ref || useRef();

  // 绑定事件
  useEffect(() => {
    /** 当前功能配置 */
    var config = new MouseDragArgs();
    for (var i in cfg)config[i] = cfg[i];

    /** 当前的状态是否按下 */
    var isd = false;
    var lx, ly;

    // 鼠标按下
    ref.current.addEventListener('mousedown', e => {
      // 限制按键
      if (e.button !== config.button) return;
      isd = true;
      lx = e.x;
      ly = e.y;
    });

    // 鼠标移动
    var mousemove = e => {
      if (!isd) return;
      var cx = (e.x - lx) * config.scale;
      var cy = (e.y - ly) * config.scale;
      // 如果逆转
      if (config.reverse) {
        cx = -cx;
        cy = -cy;
      }
      /** 如果直接赋值 */
      if (config.position) {
        config.position.x += cx;
        config.position.y += cy;
      }
      // 如果回调函数处理
      if (config.callback) {
        config.callback({ x: cx, y: cy });
      }
      lx = e.x;
      ly = e.y;
    };
    document.addEventListener('mousemove', mousemove);

    // 鼠标放开
    var mouseup = e => {
      if (!isd) return;
      isd = false;
    };
    document.addEventListener('mouseup', mouseup);

    // 析构处理
    return () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };
  }, []);

  return ref;
};
