import { makeObservable, observable } from 'mobx';
import { Program } from '../../main';
import { StoreNode } from './store-node';

/** 一个拓扑图的状态 */
export class StoreMap {
  /**
   *
   * @param {Program} program
   */
  constructor(program) {
    this.program = program;
    makeObservable(this);

    // ======初始化数据======
    // 节点
    for (var i in program.nodes) {
      this.nodes.push(new StoreNode(program.nodes[i], this));
    }

    // 节点变化侦听
    program.hooks.add('map-add-node', e => {
      this.nodes.push(new StoreNode(e.node, this));
    });
  }

  /** @type {HTMLDivElement} 节点原点节点 */
  refOrigin;
  /** 视图原点屏幕坐标 */
  @observable viewOrigin = { x: 0, y: 0 };

  /** @type {StoreNode[]} 节点状态列表 */
  @observable nodes = [];
  /** @type {Program} 图中的节点表 */
  @observable program;
  /** 整个视图的位移 */
  @observable position = {
    x: 0,
    y: 0
  };

  /** @type {{type:string,pos:{x:number,y:number}}} 正在操作中的操作点 */
  @observable actionPointer;

  /**
   * 屏幕坐标转换为视图坐标
   * @param {{x:number,y:number}} pos 要转换的屏幕坐标
   * @returns
   */
  mouse2view(pos) {
    return {
      x: pos.x - this.viewOrigin.x,
      y: pos.y - this.viewOrigin.y
    };
  }
}
