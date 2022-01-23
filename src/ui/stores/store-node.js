import { makeObservable, observable } from 'mobx';

/** 单个节点的状态 */
export class StoreNode {
  constructor() {
    makeObservable(this);
  }

  /** 当前节点对应的参数 */
  @observable attrs = {
    /** 节点标题 */
    title: '',
    /** 节点坐标X */
    x: 0,
    /** 节点坐标Y */
    y: 0
  };
}
