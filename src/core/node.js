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
   * 定义属性
   * @param {NodeDefine} define
   * @returns
   */
  $define(define) { return this.setDefine(define); }

  /**
   * 设置节点定义
   * @param {NodeDefine} define
   */
  setDefine(define) {
    this.define = define;
    // 输入处理
    for (var i in define.inputs) {
      // 数组类型处理
      if (define.inputs[i].many && !Array.isArray(this.attrs.links[i])) {
        this.attrs.links[i] = [];
      }
      // 非数组类型处理
      if (!define.inputs[i].many && Array.isArray(this.attrs.links[i])) {
        this.attrs.links[i] = this.attrs.links[i][0];
      }
      // 默认值写入
      if (this.define.inputs[i].default != null && this.attrs.forms[i] == null) {
        this.attrs.forms[i] = this.define.inputs[i].default;
      }
    }

    return this.define;
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

  /** 构造当前节点依赖的参数 */
  buildArgs(outputs) {
    var args = {};

    // 循环处理表单项
    for (var i in this.attrs.forms) {
      args[i] = this.attrs.forms[i];
    }

    // 循环处理关联项
    for (var i in this.attrs.links) {
      var link = this.attrs.links[i];
      // 如果是多引用
      if (Array.isArray(link)) {
        var vals = [];
        for (var j in link) {
          vals.push(outputs(link[j].uid, link[j].key));
        }
        args[i] = vals;
      } else {
        // 单引用
        args[i] = outputs(link.uid, link.key);
      }
    }

    return args;
  }

  /**
   * 清理无效节点关联
   */
  clearLink() {
    for (var i in this.attrs.links) {
      var links = this.attrs.links[i];
      if (Array.isArray(links)) {
        this.attrs.links[i] = links.filter(link => this.program.nodesMap[link.uid] != null);
      } else {
        if (this.program.nodesMap[links.uid] == null) {
          delete this.attrs.links[i];
        }
      }
    }
  }

  /**
   * 循环获取所有的关联项数据
   * @param {string} key 要获取关联项的输入key
   * @returns {LinkData[]}
   */
  links(key) {
    if (this.attrs.links[key] == null) return [];
    if (Array.isArray(this.attrs.links[key])) {
      return this.attrs.links[key];
    } else {
      return [this.attrs.links[key]];
    }
  }

  /** 增加一个关联项 */
  addLink(key, link) {
    // 如果是数组输入项
    if (Array.isArray(this.attrs.links[key])) {
      // 循环判断是否已经有对应关联项
      for (var i in this.attrs.links[key]) {
        var now = this.attrs.links[key][i];
        if (now.uid === link.uid && now.key === link.key) {
          return;
        }
      }
      // 加入关联项
      this.attrs.links[key].push(link);
    } else {
      // 直接设置关联项
      this.attrs.links[key] = link;
    }
  }

  /**
   * 移除一个关联项
   * @param {string} key 要移除的关联项下标
   * @param {number} index 要移除的关联项序号，多输入时使用
   */
  deleteLink(key, index) {
    if (Array.isArray(this.attrs.links[key])) {
      this.attrs.links[key].splice(index, 1);
    } else {
      delete this.attrs.links[key];
    }
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
