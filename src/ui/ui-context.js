import { StoreMap } from './stores/store-app';
import { StoreNode } from './stores/store-node';
import React from 'react';

/** 单个拓扑图的上下文 */
export var MapContext = React.createContext({
  /** @type {StoreMap} 整个图的状态 */
  state: null
});

/** 单个节点的上下文 */
export var NodeContext = React.createContext({
  /** @type {StoreNode} 单个节点的状态 */
  state: null
});
