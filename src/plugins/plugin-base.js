import { BluePrintNode } from '../core/node';
import { Program } from '../core/program';

/**
 * 基础功能
 * @param {Program} program 要运行插件的程序
 */
export var PluginBase = function(program) {
  // ============类型定义============
  program.addType('number', { name: '数值', inputModule: (val, cb) => {
    return <input type='number' key='number' value={val} onChange={e => { cb(Number(e.target.value)); }} />;
  } });
  program.addModule('math:add', MathAdd);
};

/** 加法 */
class MathAdd extends BluePrintNode {
  static menu = '数学/加法运算';

  run(props) {
    console.log(props);
    return { num: props.a + props.b, num2: props.a - props.b };
  }

  define = this.$define({
    inputs: {
      'a': { name: 'A', type: 'number' },
      'b': { name: 'B', type: 'number' }
    },
    outputs: {
      'num': { name: '数值', type: 'number', default: true },
      'num2': { name: '数值', type: 'number', default: true }
    }
  })
}
