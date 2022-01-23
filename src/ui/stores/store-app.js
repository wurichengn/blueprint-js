import { makeObservable, observable } from 'mobx';
import { Program } from '../../main';

/** 一个拓扑图的状态 */
export class StoreMap {
  constructor(program) {
    this.program = program;
    makeObservable(this);
  }

  /** @type {Program} 图中的节点表 */
  @observable program;

  /** 整个视图的位移 */
  @observable position = {
    x: 0,
    y: 0
  };
}
