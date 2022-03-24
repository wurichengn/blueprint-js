import { useObserver } from 'mobx-react';
import { memo, useContext, useEffect } from 'react';
import { useRef } from 'react/cjs/react.development';
import { BluePrintInputDefine, BluePrintOutputDefine } from '../core/define-node';
import { PointerCanLink } from '../utils/utils-base';
import { StoreInput, StoreNode, StoreOutput } from './stores/store-node';
import { MapContext, NodeContext } from './ui-context';

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
    var inputs = state.inputs;
    var inputDoms = [];
    for (var key in inputs) {
      inputs[key];
      inputDoms.push(<Input store={inputs[key]} key={key} />);
    }

    // 输出节点
    var outputs = state.outputs;
    var outputDoms = [];
    for (var key in outputs) {
      outputs[key];
      outputDoms.push(<Output store={outputs[key]} key={key} />);
    }

    return <NodeContext.Provider value={{ state: state }}>
      <div style={style} ref={ref} className={Styles.Node}>
        <div ref={refTitle} className={Styles.title}>{state.node.getNodeName()}</div>
        <div className={Styles.group} >{inputDoms}{outputDoms}</div>
      </div>
    </NodeContext.Provider>;
  });
});

/**
 * 输入组件
 * @param {{store:StoreInput}} props
 * @returns
 */
var Input = function(props) {
  /** 全局状态 */
  var state = useContext(MapContext).state;
  var store = props.store;
  var refPointer = useRef();

  // 更新连接点位置
  useEffect(() => {
    var pos = state.getDomViewPosition(refPointer.current);
    pos.x += 6;
    pos.y += 6;
    store.pos = pos;
  });

  return useObserver(() => {
    /** 连接点样式 */
    var pointerClass = [Styles.pointer];
    if (state.actionPointer && state.actionPointer.type === 'output') {
      var output = state.actionPointer.node.define.outputs[state.actionPointer.key];
      if (output && PointerCanLink(output, store.define)) {
        pointerClass.push(Styles.active);
      }
    }

    return <div className={Styles.Input}>
      <div ref={refPointer} className={pointerClass.join(' ')} onMouseUp={e => { store.linkToActionPointer(); }}/>
      <div className={Styles.group}>{store.define.name}</div>
    </div>;
  });
};

/**
 * 输出组件
 * @param {{store:StoreOutput,index:string}} props
 * @returns
 */
var Output = function(props) {
  /** 全局状态 */
  var state = useContext(MapContext).state;
  var node = useContext(NodeContext).state;
  var store = props.store;
  var refPointer = useRef();

  // 更新连接点位置
  useEffect(() => {
    var pos = state.getDomViewPosition(refPointer.current);
    pos.x += 6;
    pos.y += 6;
    store.pos = pos;
  });

  return useObserver(() => {
    return <div className={Styles.Output}>
      <div className={Styles.pointer} ref={refPointer}
        onMouseDown={e => {
          // 设置活动的连接点
          state.actionPointer = { type: 'output', node, key: store.index, pos: store.pos };
        }}/>
      <div className={Styles.group}>{store.define.name}</div>
    </div>;
  });
};