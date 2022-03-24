import { UUID } from '../utils/utils-base';
import { BluePrintInputDefine, BluePrintOutputDefine } from './define-node';
import { BluePrintHooks } from './hooks';
import { Program } from './program';

/** 蓝图节点逻辑定义 */
export class BluePrintNode {
  /**
   * @param {Program} program 节点所属的程序
   */
  constructor(program) {
    this.program = program;
    // 钩子转发
    this.hooks.all((e, type) => {
      e = e || {};
      e.node = this;
      this.program.hooks.trigger(type, e);
    });
  }

  /**
   * @type {()=>{}|Promise<any>} 运行的逻辑，可以是异步函数
   **/
  run() {};

  /** 唯一编号 */
  uid = UUID();
  /** @type {Program} 节点所属的程序 */
  program;

  /** 当前节点的钩子 */
  hooks = new BluePrintHooks();

  /** @type {NodeDefine} 当前的节点定义 */
  define = new NodeDefine();
  /** @type {NodeAttrs} 当前节点的属性 */
  attrs = new NodeAttrs();

  /**
   * 定义属性，仅用于代码提示
   * @param {NodeDefine} define
   * @returns
   */
  $define(define) { return define; }

  /**
   * 设置节点定义
   * @param {NodeDefine} define
   */
  setDefine(define) {
    this.define = define;
  }

  /** 获取实例名称 */
  getNodeName() {
    if (this.define.name) return this.define.name;
    if (this.constructor.menu) {
      var menu = this.constructor.menu;
      return menu.substr(menu.lastIndexOf('/') + 1);
    }
    return this.constructor.name;
  }

  /** 运行一次该节点 */
  runNode() {

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
  /** @type {{[key:string]:BluePrintOutputDefine}} 输出的定义 */
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
  /** @type {{[key:string]:LinkData|LinkData[]}} 当前节点输入关联的组件 */
  links = {};
  /** 当前节点关联输入的值 */
  link_values = {};
  /** 整合后所有输入的值 */
  inputs = {};
  /** 当前节点输出的值 */
  outputs = {};
}

/** 关联信息数据 */
class LinkData {
  /** @type {string} 对应的输出组件的uid */
  uid;
  /** 对应的输出接口 */
  key;
}
