import _ from 'lodash';
import { UUID } from '../utils/utils-base';
import { BluePrintInputDefine, BluePrintOutputDefine } from './define-node';
import { BluePrintHooks } from './hooks';
import { Program } from './program';

/** 蓝图节点逻辑定义 */
export class BluePrintNode {
  /**
   * @param {Program} program 节点所属的程序
   * @param {*} saveData 之前保存的数据
   */
  constructor(program, saveData) {
    this.program = program;
    // 钩子转发
    this.hooks.all((e, type) => {
      e = e || {};
      e.node = this;
      this.program.hooks.trigger(type, e);
    });
    // from改变触发onChange
    this.hooks.add('node-forms-update', (e) => {
      if (this.define.inputs[e.key] && this.define.inputs[e.key].onChange) {
        this.define.inputs[e.key].onChange({ node: this, key: e.key, value: e.value });
      }
    });
    // 如果有已保存的数据
    if (saveData) {
      for (var i in saveData.attrs) {
        this.attrs[i] = saveData.attrs[i];
      }
      this.uid = saveData.uid;
    }
  }

  /**
   * @type {()=>{}|Promise<any>} 运行的逻辑，可以是异步函数
   **/
  run() {};

  /** 唯一编号 */
  uid = UUID();
  /** @type {Program} 节点所属的程序 */
  program;
  /** @type {string} 节点在当前程序中的类型 */
  type;

  /** 当前节点的钩子 */
  hooks = new BluePrintHooks();

  /** @type {NodeDefine} 当前的节点定义 */
  define = new NodeDefine();
  /** @type {NodeAttrs} 当前节点的属性 */
  attrs = new NodeAttrs();

  /**
   * 定义属性,setDefine的别名，构造初始化时也需要调用
   * @param {NodeDefine} define
   * @returns
   */
  $define(define) { return this.setDefine(define); }

  /**
   * 设置节点定义
   * @param {NodeDefine} define
   */
  setDefine(define) {
    this._define = define || this._define;
    this.define = define = _.cloneDeep(this._define);

    // 重新构造输入
    var inputs = {};
    for (var i in define.inputs) {
      if (typeof define.inputs[i] === 'function') {
        // 如果是方法类型的输入则执行方法
        define.inputs[i]({ node: this, key: i, inputs });
      } else {
        // 否则直接使用输入
        inputs[i] = define.inputs[i];
      }
    }
    define.inputs = inputs;

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

    // 触发定义改变消息
    this.hooks.triggerSync('node-update-define', { define: define });

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

    // 处理参数回调
    for (var i in this.define.inputs) {
      if (this.define.inputs[i].onBuild) {
        this.define.inputs[i].onBuild({ node: this, key: i, args: args });
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
    // 触发添加关联项消息
    this.hooks.trigger('node-set-link', { node: this, key: key, link: link });
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

    // 触发添加关联项消息
    this.hooks.trigger('node-delete-link', { node: this, key: key, index });
  }

  /** 序列化当前节点的数据 */
  save() {
    var re = {
      uid: this.uid,
      type: this.type,
      attrs: { ...this.attrs }
    };
    this.hooks.triggerSync('node-save', { saveData: re });
    return re;
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
  /** 节点的颜色，仅用于UI中区分类型 */
  color = '#17487a';
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
}

/** 关联信息数据 */
class LinkData {
  /** @type {string} 对应的输出组件的uid */
  uid;
  /** 对应的输出接口 */
  key;
}
