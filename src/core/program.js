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

  /** 类型定义表 */
  types = {};
  /** 节点逻辑定义表 */
  modules = {};

  /** 当前程序里的所有节点 */
  nodes = [];

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
    this.types[key] = module;
  }
}

/** 蓝图程序配置 */
class ProgramConfig {
  /** @type {(program:Program)=>{}[]} 蓝图程序的插件，在程序初始化时运行 */
  plugins = [];
};
