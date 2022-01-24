import { configure } from 'mobx';
import { useLocalObservable, useObserver } from 'mobx-react';
import { useRef } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Program } from '../main';
import { useMouseDrag } from './hooks/hook-event';
import { StoreMap } from './stores/store-app';
import { UINode } from './ui-node';
var Styles = require('./styles/ui-map.less');
configure({ enforceActions: false });

/**
 * 逻辑图编辑组件
 * @param {{program:Program}} props
 * @returns {}
 */
export var UIMap = (props) => {
  /** 视图的状态 */
  var state = useLocalObservable(() => { return new StoreMap(props.program); });
  /** 根节点的ref */
  var ref = useRef();
  var refBG = useRef();
  var refNodes = useRef();
  // 触发渲染钩子
  props.program.hooks.trigger('map-render', { ref: ref, state: state, refBG, refNodes });

  // 记录原点坐标
  useEffect(() => {
    state.refOrigin = refNodes.current;
    var rect = refNodes.current.getBoundingClientRect();
    state.viewOrigin.x = rect.left;
    state.viewOrigin.y = rect.top;
  });

  return useObserver(() => {
    /** 节点列表 */
    var nodes = state.nodes.map(node => {
      return <UINode node={node} key={node.uid} />;
    });

    return <div ref={ref} style={{ backgroundPosition: `${state.position.x}px ${state.position.y}px` }} className={Styles.Map}>
      <div ref={refBG} className={Styles.bg} />
      <div ref={refNodes} style={{ marginLeft: state.position.x + 'px', marginTop: state.position.y + 'px' }} className={Styles.nodes}>{nodes}</div>
    </div>;
  });
};
