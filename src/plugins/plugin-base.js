import { BluePrintNode } from '../core/node';
import { Program } from '../core/program';
import Styles from './plugin-base.less';

/**
 * 基础功能
 * @param {Program} program 要运行插件的程序
 */
export var PluginBase = function(program) {
  // ============类型定义============
  program.addType('number', { name: '数值', inputModule: (val, cb) => {
    return <input className={Styles.input} type='number' key='number' value={val} onChange={e => { cb(Number(e.target.value)); }} />;
  } });
  program.addType('string', { name: '字符串', inputModule: (val, cb) => {
    return <input className={Styles.input} type='text' key='string' value={val} onChange={e => { cb(e.target.value); }} />;
  } });
  program.addType('color', { name: '颜色', inputModule: (val, cb) => {
    return <input className={Styles.color} type='color' key='color' value={val} onChange={e => { cb(e.target.value); }} />;
  } });
  program.addModule('math:add', MathAdd);
  program.addModule('math:add-all', MathAddAll);
};

/** 加法 */
class MathAdd extends BluePrintNode {
  static menu = '数学/加法运算';

  run(props) {
    return props.a + props.b;
  }

  define = this.$define({
    inputs: {
      'a': { name: 'A', type: 'number' },
      'b': { name: 'B', type: 'number' }
    },
    outputs: {
      'num': { name: '数值', type: 'number', default: true }
    }
  })
}

/** 加法 */
class MathAddAll extends BluePrintNode {
  static menu = '数学/全部相加';

  run(props) {
    return props.nums.reduce((a, b) => a + b, 0);
  }

  define = this.$define({
    inputs: {
      'nums': { name: '数值', type: 'number', many: true }
    },
    outputs: {
      'num': { name: '数值', type: 'number', default: true }
    }
  })
}
