import { BluePrintNode, Program } from '../main';
import React from 'react';
import { BluePrintWorker } from '../core/worker';

/**
 * 子程序插件，为当前程序加入可以创建子程序的功能
 * @param {Program} program 要运行插件的程序
 */
export var PluginChildProgram = (program) => {
  program.addModule('child-program', ChildProgram);
};

/** 子程序节点逻辑 */
export class ChildProgram extends BluePrintNode {
  static menu = '基础/子程序';

  /**
   * @param {Program} program 节点所属的程序
   * @param {*} saveData 之前保存的数据
   */
  constructor(program, saveData, config) {
    // 运行父类构造函数
    super(program, saveData);

    /** 构造子程序的配置 */
    var cfg = config;
    if (cfg == null) {
      cfg = { plugins: [...this.program.config.plugins, PluginChildProgramBaseFunction] };
    }

    // 构造子图的配置
    this.childProgram = new Program(cfg);

    // 如果有保存记录
    if (saveData && saveData.CPSave) {
      this.childProgram.load(saveData.CPSave);
    }

    // 节点渲染扩展
    this.hooks.add('node-render', ({ expand, state }) => {
      expand.push(<button key='child-program-button' onClick={() => { state.map.container.pushProgram(this.childProgram); }}>编辑程序</button>);
    });

    // 保存扩展
    this.hooks.add('node-save', ({ saveData }) => {
      saveData.CPSave = this.childProgram.save();
    });

    // 初始化时更新输入输出
    this.loadChildDefine();

    this.childProgram.hooks.add('map-add-node', this.loadChildDefine.bind(this));
    this.childProgram.hooks.add('map-remove-node', this.loadChildDefine.bind(this));
  }

  /** @type {Program} 运行在子节点中的程序 */
  childProgram;

  /** 子线程中的线程配置 */
  programConfig;

  define = this.$define({
    name: '子程序',
    inputs: {},
    outputs: {}
  });

  /** 运行一次程序 */
  async run(props) {
    var outputs = this.childProgram.nodes.filter(node => node.type === 'child-program-output');
    var inputs = this.childProgram.nodes.filter(node => node.type === 'child-program-input');
    inputs.forEach(node => { node.inputData = props[node.uid]; });
    var worker = new BluePrintWorker(outputs[0]);
    await worker.run();
    var re = {};
    outputs.forEach(node => { re[node.uid] = node.outputData; });
    console.log(props, re);
    return re;
  }

  /** 根据当前的图情况重新生成定义 */
  loadChildDefine() {
    var inputDefine = {};
    var outputDefine = {};
    this.childProgram.nodes.forEach(node => {
      if (node.type === 'child-program-input') {
        inputDefine[node.uid] = { name: node.attrs.forms.name, type: null };
      }
      if (node.type === 'child-program-output') {
        outputDefine[node.uid] = { name: node.attrs.forms.name, type: null };
      }
    });

    this.define.inputs = inputDefine;
    this.define.outputs = outputDefine;
    this.setDefine(this.define);
  }
}

/**
 * 子程序中常用的功能
 * @param {Program} program 要增加功能的蓝图子程序
 */
var PluginChildProgramBaseFunction = (program) => {
  program.hooks.add('map-contextmenu', ({ menuData, state }) => {
    menuData.push(['返回上层', () => {
      state.container.popProgram();
    }]);
  });

  program.addModule('child-program-input', ChildProgramInput);
  program.addModule('child-program-output', ChildProgramOutput);
};

/** 子程序输入 */
class ChildProgramInput extends BluePrintNode {
  static menu = '子程序/输入';

  /** 外部输入的值 */
  inputData;

  run() {
    return this.inputData;
  }

  define = this.$define({
    name: '子程序输入',
    inputs: {
      'name': { name: '输入名称', default: '无名输入', type: 'string' }
    },
    outputs: {
      'in': { default: true, type: null, name: '输入内容' }
    }
  });
}

/** 子程序输出 */
class ChildProgramOutput extends BluePrintNode {
  static menu = '子程序/输出';

  /** 最终输出的值 */
  outputData;

  run(props) {
    this.outputData = props.out;
  }

  define = this.$define({
    name: '子程序输出',
    inputs: {
      'name': { name: '输出名称', default: '无名输出', type: 'string' },
      'out': { type: null, name: '输出内容' }
    }
  });
}
