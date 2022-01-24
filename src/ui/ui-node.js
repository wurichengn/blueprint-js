import { useObserver } from 'mobx-react';
import { memo } from 'react';
import { useRef } from 'react/cjs/react.development';
import { BluePrintInputDefine, BluePrintOutputDefine } from '../core/define-node';
import { StoreNode } from './stores/store-node';

var Styles = require('./styles/ui-node.less');

/**
 * 单个节点组件
 */
export var UINode = memo(function(/** @type {{node:StoreNode}} */props) {
  // ref初始化
  var ref = useRef();
  var refTitle = useRef();

  /** 当前节点的状态机 */
  var state = props.node;

  // 触发节点渲染
  state.node.hooks.trigger('node-render', { state: state, ref, refTitle });

  return useObserver(() => {
    /** 节点样式 */
    var style = {
      left: state.x + 'px',
      top: state.y + 'px'
    };

    // 输入节点
    var inputs = state.define.inputs;
    var inputDoms = [];
    for (var key in inputs) {
      inputs[key];
      inputDoms.push(<Input define={inputs[key]} key={key} index={key} />);
    }

    // 输出节点
    var outputs = state.define.outputs;
    var outputDoms = [];
    for (var key in outputs) {
      outputs[key];
      outputDoms.push(<Output define={outputs[key]} key={key} index={key} />);
    }

    return <div style={style} ref={ref} className={Styles.Node}>
      <div ref={refTitle} className={Styles.title}>{state.node.getNodeName()}</div>
      <div className={Styles.group} >{inputDoms}{outputDoms}</div>
    </div>;
  });
});

/**
 * 输入组件
 * @param {{define:BluePrintInputDefine,index:string}} props
 * @returns
 */
var Input = function(props) {
  return <div className={Styles.Input}>
    <div className={Styles.pointer} onMouseDown={e => {}}/>
    <div className={Styles.group}>{props.define.name}</div>
  </div>;
};

/**
 * 输出组件
 * @param {{define:BluePrintOutputDefine,index:string}} props
 * @returns
 */
var Output = function(props) {
  return <div className={Styles.Output}>
    <div className={Styles.pointer} />
    <div className={Styles.group}>{props.define.name}</div>
  </div>;
};
