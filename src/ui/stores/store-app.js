import { computed, intercept, makeObservable, observable } from 'mobx';
import { Program } from '../../core/program';
import { UUID } from '../../utils/utils-base';
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
  /** @type {{spos:{x:number,y:number},nodes:StoreNode[]}} 节点剪贴板 */
  @observable clipboard;

  /** @type {{type:string,pos:{x:number,y:number},key:string,node:StoreNode}} 正在操作中的操作点 */
  @observable actionPointer;

  /** @type {{x1:number,y1:number,x2:number,y2:number}} 当前节点批量选择框的范围 */
  @observable selectBox;
  /** 选择框范围 */
  get selectRange() {
    var sx = Math.min(this.selectBox.x1, this.selectBox.x2);
    var sy = Math.min(this.selectBox.y1, this.selectBox.y2);
    var ex = Math.max(this.selectBox.x1, this.selectBox.x2);
    var ey = Math.max(this.selectBox.y1, this.selectBox.y2);
    return {
      left: ((sx + this.position.x) * this.scale + this.viewSize.width / 2) + 'px',
      top: ((sy + this.position.y) * this.scale + this.viewSize.height / 2) + 'px',
      width: (ex - sx) * this.scale + 'px',
      height: (ey - sy) * this.scale + 'px'
    };
  }

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

  /** 删除当前已选中的节点 */
  removeSelectNode() {
    for (var i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].isSelect) {
        this.program.removeNode(this.nodes[i].node);
      }
    }
  }

  /**
   * 复制节点到剪贴板
   * @param {StoreNode[]} nodes 要复制的节点表
   * @param {{x:number,y:number}} spos 复制相对位置的起点
   */
  copyNodes(nodes, spos) {
    this.clipboard = {
      nodes,
      spos
    };
  }

  /**
   * 将当前复制的节点粘贴到图中
   * @param {{x:number,y:number}} epos 要粘贴的位置起点
   */
  pasteNodes(epos) {
    if (this.clipboard == null) return;
    /** @type {{[key:string]:StoreNode}} 要复制的节点uid映射表 */
    var nodemap = {};
    /** UID改动的映射表 */
    var uidmap = {};

    // 循环将节点记录到表中
    this.clipboard.nodes.forEach(node => {
      nodemap[node.uid] = node.node.save();
      uidmap[node.uid] = UUID();
    });

    /** 位置偏移量 */
    var offset = {
      x: epos.x - this.clipboard.spos.x,
      y: epos.y - this.clipboard.spos.y
    };

    console.log(nodemap, uidmap);
  }
}
