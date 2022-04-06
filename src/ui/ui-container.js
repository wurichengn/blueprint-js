import { useLocalObservable, useObserver } from 'mobx-react';
import { StoreContainer } from './stores/store-container';
import { UIMap } from './ui-map';

export var UIContainer = props => {
  var state = useLocalObservable(() => { return new StoreContainer(props.program); });

  return useObserver(() => {
    return <div>
      <UIMap key={state.activeMap.program.uid} store={state.activeMap} />
    </div>;
  });
};
