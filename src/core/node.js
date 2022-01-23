import { BluePrintInputDefine } from './define-node';
import { BluePrintHooks } from './hooks';

/** 蓝图节点逻辑定义 */
export class BluePrintNode {
  /**
   * @type {()=>{}|Promise<any>} 运行的逻辑，可以是异步函数
   **/
  run() {};

  /** 当前节点的钩子 */
  hooks = new BluePrintHooks();

  /** @type {NodeDefine} 当前的节点定义 */
  define = new NodeDefine();
  /** @type {NodeAttrs} 当前节点的属性 */
  attrs = new NodeAttrs();

  /**
   * 设置节点定义
   * @param {NodeDefine} define
   */
  setDefine(define) {
    this.define = define;
  }

  /** @type {string} 节点所在菜单 */
  static menu;
}

/** 节点的定义数据 */
export class NodeDefine {
  constructor(define) {
    for (var i in define) {
      this[i] = define[i];
    }
  }
  /** 节点的名称 */
  name = '未命名节点';
  /** @type {{[key:string]:BluePrintInputDefine}} 输入的定义 */
  inputs = {};
  /** @type {{[]}} 输出的定义 */
  outputs = {};
}

/** 节点当前的属性 */
class NodeAttrs {
  /** 组件在画布的坐标X */
  x = 0;
  /** 组件在画布的坐标Y */
  y = 0;
  /** 从编辑器获得的输入值 */
  forms = {};
  /** 当前节点输入关联的组件 */
  links = {};
  /** 当前节点关联输入的值 */
  link_values = {};
  /** 整合后所有输入的值 */
  inputs = {};
  /** 当前节点输出的值 */
  outputs = {};
}
