import { BPDefineType } from './define-type';
import { BluePrintHooks } from './hooks';
import { BluePrintNode } from './node';

/** 蓝图逻辑处理程序 */
export class Program {
  /**
   * @param {ProgramConfig} config 初始化程序的配置
   */
  constructor(config) {
    // 初始化配置
    this.config = new ProgramConfig();
    for (var i in config) {
      this.config[i] = config[i];
    }
    // 运行插件逻辑
    for (var i in this.config.plugins) {
      this.config.plugins[i](this);
    }
  }

  /** 蓝图程序的钩子 */
  hooks = new BluePrintHooks();

  /** @type {ProgramConfig} 程序的相关配置 */
  config;

  /** @type {{[key:string]:BPDefineType}} 类型定义表 */
  types = {};
  /** @type {{[key:string]:typeof BluePrintNode}} 节点逻辑定义表 */
  modules = {};

  /** @type {BluePrintNode[]} 当前程序里的所有节点 */
  nodes = [];
  /** @type {{[key:string]:BluePrintNode}} 当前程序里所有节点的uid映射表 */
  nodesMap = {};

  /**
   * 往程序中添加一个类型定义
   * @param {string|Symbol} key 类型的唯一标识符
   * @param {BPDefineType} type 类型的定义
   */
  addType(key, type) {
    if (this.types[key]) {
      console.warn(`覆盖了已经定义的类型[${key}]`);
    }
    this.types[key] = type;
  }

  /**
   * 添加节点的逻辑定义
   * @param {string|Symbol} key 节点逻辑的唯一标识符
   * @param {typeof BluePrintNode} module 节点的类定义，需要继承自BluePrintNode
   */
  addModule(key, module) {
    if (this.modules[key]) {
      console.warn(`覆盖了已经定义的节点逻辑[${key}]`);
    }
    this.modules[key] = module;
  }

  /**
   * 向当前程序中添加一个节点
   * @param {BluePrintNode} node 要添加的节点实例
   */
  addNode(node) {
    this.nodes.push(node);
    this.nodesMap[node.uid] = node;
    // 触发添加节点处理
    this.hooks.trigger('map-add-node', { node, program: this });
  }

  /**
   * 从当前程序中删除一个节点
   * @param {BluePrintNode} node 要删除的节点实例
   */
  removeNode(node) {
    if (!this.nodes.includes(node)) return;
    // 移除列表
    this.nodes.splice(this.nodes.indexOf(node), 1);
    delete this.nodesMap[node.uid];
    // 清理多余关联内容
    this.nodes.forEach(node => {
      node.clearLink();
    });
    // 触发移除节点处理钩子
    this.hooks.trigger('map-remove-node', { node, program: this });
  }
}

/** 蓝图程序配置 */
class ProgramConfig {
  /** @type {(program:Program)=>{}[]} 蓝图程序的插件，在程序初始化时运行 */
  plugins = [];
};
