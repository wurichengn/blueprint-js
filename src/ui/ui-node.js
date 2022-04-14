import { useObserver } from 'mobx-react';
import { memo, useContext, useEffect, useState } from 'react';
import { useRef } from 'react/cjs/react.development';
import { BluePrintInputDefine, BluePrintOutputDefine } from '../core/define-node';
import { PointerCanLink } from '../utils/utils-base';
import { StoreInput, StoreNode, StoreOutput } from './stores/store-node';
import { MapContext, NodeContext } from './ui-context';
import Styles from './styles/ui-node.less';
import React from 'react';

/**
 * 单个节点组件
 */
export var UINode = memo(function(/** @type {{node:StoreNode}} */props) {
  // ref初始化
  var ref = useRef();
  var refTitle = useRef();

  /** 当前节点的状态机 */
  var state = props.node;
  /** 节点的额外渲染内容 */
  var expand = [];

  // 触发节点渲染
  state.node.hooks.triggerSync('node-render', { state: state, ref, refTitle, node: state.node, expand });

  return useObserver(() => {
    /** 节点样式 */
    var style = {
      left: state.x + 'px',
      top: state.y + 'px'
    };

    // 触发节点渲染Observer
    state.node.hooks.triggerSync('node-render-observer', { state: state, ref, refTitle, node: state.node, expand });

    // 输入节点
    var inputs = state.inputs;
    var inputDoms = [];
    if (false) {
      for (var key in inputs) {
        inputs[key].pos = { x: state.x, y: state.y + 12 };
      }
    } else {
      for (var key in inputs) {
        inputDoms.push(<Input store={inputs[key]} key={key} />);
      }
    }

    // 输出节点
    var outputs = state.outputs;
    var outputDoms = [];
    for (var key in outputs) {
      outputs[key];
      outputDoms.push(<Output store={outputs[key]} key={key} />);
    }

    var classList = [Styles.Node];
    if (state.isSelect) {
      classList.push(Styles.isSelect);
    }

    return <NodeContext.Provider value={{ state: state }}>
      <div style={style} ref={ref} className={classList.join(' ')}>
        <div ref={refTitle} style={{ backgroundColor: state.color }} className={Styles.title}>{state.node.getNodeName()}</div>
        <div className={Styles.group} >{expand}{inputDoms}{outputDoms}</div>
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
  var [, render] = useState();
  var refPointer = useRef();
  var ref = useRef();
  /** 额外渲染内容 */
  var expand = [];

  // 触发节点渲染
  store.node.node.hooks.triggerSync('node-render-input', { state: store, ref, refPointer, expand, node: store.node.node, render });

  // 更新连接点位置
  useEffect(() => {
    var pos = state.getDomViewPosition(refPointer.current);
    pos.x += 6;
    pos.y += 6;
    store.pos.x = pos.x;
    store.pos.y = pos.y;
  });

  return useObserver(() => {
    state.refOrigin;
    /** 连接点样式 */
    var pointerClass = [Styles.pointer];
    if (state.actionPointer && state.actionPointer.type === 'output') {
      var output = state.actionPointer.node.define.outputs[state.actionPointer.key];
      if (output && PointerCanLink(output, store.define)) {
        pointerClass.push(Styles.active);
      }
    }
    if (store.define.disable_link) {
      pointerClass.push(Styles.hidden);
    }

    return <div className={Styles.Input}>
      <div ref={refPointer} className={pointerClass.join(' ')} onMouseUp={e => { store.linkToActionPointer(); }}/>
      <div className={Styles.group}>{store.define.name}</div>
      <div>{expand}</div>
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
    store.pos.x = pos.x;
    store.pos.y = pos.y;
  });

  return useObserver(() => {
    state.refOrigin;
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
