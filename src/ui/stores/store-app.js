import { intercept, makeObservable, observable } from 'mobx';
import { Program } from '../../core/program';
import { StoreContainer } from './store-container';
import { StoreNode } from './store-node';

/** 一个拓扑图的状态 */
export class StoreMap {
  /**
   * @param {Program} program
   * @param {StoreContainer} container
   */
  constructor(program, container) {
    this.program = program;
    this.container = container;
    makeObservable(this);

    // 缩放限制
    intercept(this, 'scale', e => {
      var val = e.newValue;
      val = Number(val);
      if (Number.isNaN(val)) {
        val = 1;
      }
      if (val < 0.4) {
        val = 0.4;
      }
      if (val > 2.5) {
        val = 2.5;
      }
      e.newValue = val;
      return e;
    });

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
  @observable refOrigin;
  /** 获取宽高 */
  @observable viewSize = { width: 0, height: 0 };
  /** 视图原点屏幕坐标 */
  @observable viewOrigin = { x: 0, y: 0 };
  /** 当前鼠标在视图中的坐标 */
  @observable mousePosition = { x: 0, y: 0 };
  /** @type {StoreContainer} 图所属的容器 */
  @observable container;

  /** @type {StoreNode[]} 节点状态列表 */
  @observable nodes = [];
  /** @type {Program} 图中的节点表 */
  @observable program;
  /** 整个视图的位移 */
  @observable position = {
    x: 0,
    y: 0
  };
  /** 当前视图的缩放 */
  @observable scale = 1;

  /** @type {{type:string,pos:{x:number,y:number},key:string,node:StoreNode}} 正在操作中的操作点 */
  @observable actionPointer;

  /**
   * 屏幕坐标转换为视图坐标
   * @param {{x:number,y:number}} pos 要转换的屏幕坐标
   * @returns
   */
  mouse2view(pos) {
    return {
      x: (pos.x - this.viewOrigin.x) / this.scale,
      y: (pos.y - this.viewOrigin.y) / this.scale
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

  /**
   * 进行选中处理的节点表
   * @param {StoreNode[]} nodes 要进行选中处理的节点表
   * @param {0|1|2} mode 选中模式 0 直接选择 1 反选 2 附加
   */
  selectNode(nodes, mode = 0) {
    // 循环处理所有节点
    this.nodes.forEach(node => {
      if (mode === 2) {
        // 附加
        if (nodes.includes(node)) {
          node.isSelect = true;
        }
      } else if (mode === 1) {
        // 反选
        if (nodes.includes(node)) {
          node.isSelect = !node.isSelect;
        }
      } else {
        // 直接选择
        if (nodes.includes(node)) {
          node.isSelect = true;
        } else {
          node.isSelect = false;
        }
      }
    });
  }
}
