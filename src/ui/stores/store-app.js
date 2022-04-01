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

    // 节点变化侦听
    program.hooks.add('map-remove-node', e => {
      this.nodes.splice(this.nodes.findIndex(i => i.uid === e.node.uid), 1);
    });
  }

  /** @type {HTMLDivElement} 节点原点节点 */
  refOrigin;
  /** 获取宽高 */
  @observable viewSize = { width: 0, height: 0 };
  /** 视图原点屏幕坐标 */
  @observable viewOrigin = { x: 0, y: 0 };
  /** 当前鼠标在视图中的坐标 */
  @observable mousePosition = { x: 0, y: 0 };

  /** @type {StoreNode[]} 节点状态列表 */
  @observable nodes = [];
  /** @type {Program} 图中的节点表 */
  @observable program;
  /** 整个视图的位移 */
  @observable position = {
    x: 0,
    y: 0
  };

  /** @type {{type:string,pos:{x:number,y:number},key:string,node:StoreNode}} 正在操作中的操作点 */
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

  /**
   * 获取指定真实节点在图中的视图坐标位置
   * @param {HTMLElement} dom 要获取坐标的节点
   */
  getDomViewPosition(dom) {
    var now = dom;
    var re = { x: 0, y: 0 };
    while (now != null && now !== document) {
      re.x += now.offsetLeft;
      re.y += now.offsetTop;
      now = now.parentNode;
      if (now === this.refOrigin) {
        return re;
      }
    }
    return re;
  }
}
