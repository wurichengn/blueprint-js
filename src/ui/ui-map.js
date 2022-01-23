import { configure } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react';
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
  var state = useLocalStore(() => { return new StoreMap(props.program); });
  /** 绑定鼠标拖动功能 */
  var ref = useMouseDrag({ position: state.position });

  return useObserver(() => {
    return <div ref={ref} style={{ backgroundPosition: `${state.position.x}px ${state.position.y}px` }} className={Styles.Map} />;
  });
};
