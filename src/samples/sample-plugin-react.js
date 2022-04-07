import { Component } from 'react';
import { BluePrintInputDefine } from '../core/define-node';
import { BluePrintNode, Program } from '../main';

/**
 * 测试面板
 * @param {*} props
 * @returns
 */
var Panle = (props) => {
  return <div style={{ backgroundColor: props.color, display: 'inline-block', padding: props.padding }}>{props.children}</div>;
};

/**
 * 测试按钮
 * @param {*} props
 * @returns
 */
var Button = (props) => {
  return <button>{props.text}</button>;
};

/**
 * 插件
 * @param {Program} program
 */
export var PluginReactTest = function(program) {
  program.addType('react:module', { name: 'React组件' });
  program.addModule('test:Panle', createReactModule({
    module: Panle,
    useChildren: true,
    inputs: {
      color: { type: 'color', name: '背景颜色', default: '#ff0000' },
      padding: { type: 'number', name: '内间距', default: 0 }
    }
  }));
  program.addModule('test:Button', createReactModule({
    module: Button,
    inputs: {
      text: { type: 'string', name: '文字', default: '按钮' }
    }
  }));
};

/** React组件快速扩展参数定义 */
class ReactModuleArgs {
  /** @type {()=>{}|Component} 要添加的组件，可以是函数组件或者类组件 */
  module = null;
  /** 组件的名称 */
  name = '未命名节点';
  /** 组件在创建菜单中的位置 */
  menu = 'React/未命名组件';
  /** @type {{[key:string]:BluePrintInputDefine}} 输入参数的定义 */
  inputs = {};
  /** 是否要使用children输入，如果为true，会自动加入一个children的输入定义 */
  useChildren = false;
}

/**
 * 创建一个React组件蓝图定义
 * @param {ReactModuleArgs} props 组件定义参数
 */
var createReactModule = function(props) {
  var Module = props.module;
  // 参数缺失报错
  if (Module == null) {
    throw new Error('组件定义必须包含[module]参数');
  }

  /** 构造定义 */
  var define = {
    color: '#7a1717',
    inputs: props.inputs || {},
    name: props.name || Module.name,
    outputs: { 'module': { name: '组件', type: 'react:module', default: true }}
  };

  // 如果接受子节点
  if (props.useChildren) {
    define.inputs['children'] = {
      name: 'children',
      type: 'react:module',
      many: true
    };
  }

  // 返回定义类
  return class extends BluePrintNode {
    /** 菜单项 */
    static menu = props.menu || 'React/' + Module.name;
    /** 定义 */
    define = this.$define(define);
    /** 运行逻辑 */
    run(props) {
      console.log('run', props);
      // 子节点参数处理为虚拟节点
      var children = null;
      if (props.children) {
        children = props.children.map((child, index) => child({}, index));
        delete props.children;
      }

      // 返回一个函数组件
      return (p = {}, key) => {
        var useProps = { ...p };
        // 定义参数缺审
        for (var i in props) {
          if (useProps[i] == null) {
            useProps[i] = props[i];
          }
        }
        return <Module key={key} {...useProps}>{children}{p.children}</Module>;
      };
    }
  };
};
