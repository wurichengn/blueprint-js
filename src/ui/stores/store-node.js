import { makeObservable, observable } from 'mobx';
import { NodeDefine } from '../../core/node';
import { StoreMap } from './store-app';

/** 单个节点的状态 */
export class StoreNode {
  constructor(node, map) {
    this.map = map;
    this.node = node;
    this.uid = node.uid;
    this.x = node.attrs.x || 0;
    this.y = node.attrs.y || 0;
    this.define = node.define;
    makeObservable(this);
  }

  /** @type {StoreMap} 节点所属的图 */
  map;

  /** 节点的全局唯一编号 */
  uid = '';

  /** 节点在图中的位置X */
  @observable x = 0;
  /** 节点在图中的位置Y */
  @observable y = 0;

  /** @type {NodeDefine} 节点当前的定义信息 */
  @observable define = {};

  /** @type {import("../../main").BluePrintNode} 单个节点的数据 */
  @observable node;
}
