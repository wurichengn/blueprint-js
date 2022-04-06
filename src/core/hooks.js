import { AddHooksFunction } from './hooks-define';

/** 蓝图钩子 */
export class BluePrintHooks {
  constructor() {
    /** 当前绑定的钩子表 */
    var hooks = {};
    /** 当前全局侦听的回调表 */
    var alls = [];

    /**
     * 添加一个全钩子侦听回调
     * @param {(e,type:keyof BluePrintHooksDefine)=>{}} callback 要侦听的回调方法
     * @returns {()=>{}} 释放对应钩子的方法
     */
    this.all = function(callback) {
      alls.push(callback);
      return () => {
        alls.splice(alls.indexOf(callback), 1);
      };
    };

    /**
     * 添加一个钩子
     * @type {AddHooksFunction}
     * @param {string|Symbol} type 钩子类型
     * @param {()=>{}} callback 绑定的钩子
     * @returns {()=>{}} 释放对应的钩子的方法
     */
    this.add = function(type, callback) {
      var hook = [type, callback];
      hooks[type] = hooks[type] || [];
      hooks[type].push(hook);
      var isRemove = false;

      return function() {
        if (isRemove || hooks[type] == null) return;
        isRemove = true;
        hooks[type].splice(hooks.indexOf(hook), 1);
      };
    };

    /**
     * 触发钩子
     * @param {string|Symbol} type 钩子的类型
     * @param {*} args 钩子的参数
     * @returns {*} 直接将args参数返回
     */
    this.trigger = async function(type, args) {
      var list = hooks[type];
      // 触发指定类型回调
      for (var i in list) {
        await list[i][1](args);
      }
      // 触发全侦听回调
      for (var i in alls) {
        await alls[i](args, type);
      }
      return args;
    };

    /**
   * 同步触发钩子
   * @param {string|Symbol} type 钩子的类型
   * @param {*} args 钩子的参数
   * @returns {*} 直接将args参数返回
   */
    this.triggerSync = function(type, args) {
      var list = hooks[type];
      // 触发指定类型回调
      for (var i in list) {
        list[i][1](args);
      }
      // 触发全侦听回调
      for (var i in alls) {
        alls[i](args, type);
      }
      return args;
    };
  }
}
