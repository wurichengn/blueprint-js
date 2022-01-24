import { configure } from 'mobx';
import { useLocalObservable, useObserver } from 'mobx-react';
import { useRef } from 'react';
import { Program } from '../main';
import { useMouseDrag } from './hooks/hook-event';
import { StoreMap } from './stores/store-app';
var Styles = require('./styles/ui-map.less');
configure({ enforceActions: false });

/**
 * 逻辑图编辑组件
 * @param {{program:Program}} props
 * @returns
 */
export var UIMap = (props) => {
  /** 视图的状态 */
  var state = useLocalObservable(() => { return new StoreMap(props.program); });
  /** 根节点的ref */
  var ref = useRef();
  // 触发渲染钩子
  props.program.hooks.trigger('map-render', { ref: ref, state: state });

  return useObserver(() => {
    return <div ref={ref} style={{ backgroundPosition: `${state.position.x}px ${state.position.y}px` }} className={Styles.Map} />;
  });
};
