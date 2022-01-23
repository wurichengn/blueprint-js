import { BluePrintNode } from '../core/node';
import { Program } from '../core/program';

/**
 * 基础功能
 * @param {Program} program 要运行插件的程序
 */
export var PluginBase = function(program) {
  // ============类型定义============
  program.addType('number', { name: '数值' });
  program.addModule('math:add', MathAdd);
};

/** 加法 */
class MathAdd extends BluePrintNode {
  constructor() {
    super();
    /** 设置定义 */
    this.setDefine({
      inputs: {
        'a': { name: 'A', type: 'number' },
        'b': { name: 'B', type: 'number' }
      }
    });
  }

  run(props) {
    return props.a + props.b;
  }
}
