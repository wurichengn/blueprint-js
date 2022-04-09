import { useLocalObservable, useObserver } from 'mobx-react';
import { StoreContainer } from './stores/store-container';
import { UIMap } from './ui-map';
import React, { memo } from 'react';

/** 蓝图编辑器容器 */
export var UIContainer = memo(props => {
  var state = useLocalObservable(() => { return new StoreContainer(props.program); });

  return useObserver(() => {
    return <div style={{ height: '100%' }}>
      <UIMap key={state.activeMap.program.uid} store={state.activeMap} />
    </div>;
  });
});
