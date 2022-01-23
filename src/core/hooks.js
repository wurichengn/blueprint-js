
/** 蓝图钩子 */
export class BluePrintHooks {
  constructor() {
    /** 当前绑定的钩子表 */
    var hooks = {};

    /**
     * 添加一个钩子
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
      for (var i in list) {
        await list[i][1](args);
      }
      return args;
    };
  }
}
