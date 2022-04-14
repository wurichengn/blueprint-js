import { action, makeObservable, observable } from 'mobx';
import { BluePrintInputDefine, BluePrintOutputDefine } from '../../core/define-node';
import { NodeDefine, BluePrintNode } from '../../core/node';
import { PointerCanLink } from '../../utils/utils-base';
import { StoreMap } from './store-app';

/** 单个节点的状态 */
export class StoreNode {
  /**
   * @param {BluePrintNode} node
   * @param {StoreMap} map
   */
  constructor(node, map) {
    this.map = map;
    this.node = node;
    this.uid = node.uid;
    this.x = node.attrs.x || 0;
    this.y = node.attrs.y || 0;
    this.define = node.define;
    makeObservable(this);
    // 初始化处理
    this.updateDefine();

    // 关联处理
    var updateLink = e => {
      if (e && e.key) {
        this.inputs[e.key].updateLinks();
      } else {
        for (var i in this.inputs) {
          this.inputs[i].updateLinks();
        }
      }
    };
    node.hooks.add('node-set-link', updateLink);
    node.hooks.add('node-delete-link', updateLink);

    // 更新定义处理
    node.hooks.add('node-update-define', () => {
      this.updateDefine();
      updateLink();
    });
  }

  /** @type {StoreMap} 节点所属的图 */
  map;

  /** 节点的全局唯一编号 */
  uid = '';

  /** 节点是否被选中 */
  @observable isSelect = false;

  /** 节点在图中的位置X */
  @observable x = 0;
  /** 节点在图中的位置Y */
  @observable y = 0;

  /** @type {NodeDefine} 节点当前的定义信息 */
  @observable define = {};

  /** @type {import("../../main").BluePrintNode} 单个节点的数据 */
  @observable node;

  /** @type {{[key:string]:StoreInput}} 输入状态表 */
  @observable inputs = {};
  /** 输出状态表 */
  @observable outputs = {};
  /** 节点的颜色 */
  @observable color = '#17487a';

  /** 更新定义 */
  @action updateDefine() {
    this.define = this.node.define;

    this.color = this.define.color;

    this.inputs = {};
    for (var i in this.define.inputs) {
      this.inputs[i] = new StoreInput(this, i);
    }

    this.outputs = {};
    for (var i in this.define.outputs) {
      this.outputs[i] = new StoreOutput(this, i);
    }
  }

  /** 获取关联数据集 */
  getLinks() {
    var re = [];
    for (var i in this.inputs) {
      re.push(this.inputs[i].links);
    }
    return re;
  }
}

/** 输入状态 */
export class StoreInput {
  /**
   * @param {StoreNode} node 输入所属的节点
   * @param {string} index 输入的下标
   */
  constructor(node, index) {
    makeObservable(this);
    this.index = index;
    this.node = node;
    this.define = node.define.inputs[index] || {};
    this.updateLinks();
  }

  /** 下标 */
  index = '';
  /** @type {StoreNode} 输入所属的节点 */
  node;
  /** @type {BluePrintInputDefine} 当前输入的定义 */
  @observable define = {};
  /** 当前的输入的接口坐标 */
  @observable pos = { x: 0, y: 0 };

  /**
   * 让当前节点主动连接正在操作的连接点
   */
  @action linkToActionPointer() {
    var pointer = this.node.map.actionPointer;
    // 如果没有正在操作的连接点则跳过
    if (pointer == null || pointer.type !== 'output') return;
    // 如果无效关联则跳过
    if (!PointerCanLink(pointer.node.define.outputs[pointer.key], this.define)) return;
    // 增加关联
    this.node.node.addLink(this.index, { uid: pointer.node.uid, key: pointer.key });
    // 增加关联
    // this.node.node.attrs.links[this.index] = { uid: pointer.node.uid, key: pointer.key };
  }

  /** 当前的关联项集合 */
  @observable links = [];

  /** 同步当前输入的关联项 */
  updateLinks() {
    var re = [];
    this.node.node.links(this.index).forEach((out, index) => {
      re.push({
        /** 起点获取方法 */
        ps: () => {
          var node = this.node.map.nodes.find(node => node.uid === out.uid);
          return node.outputs[out.key].pos;
        },
        /** 终点位置 */
        pe: this.pos,
        /** 唯一key */
        key: this.node.uid + ':' + this.index + ':' + out.uid + ':' + out.key,
        /** 删除关联的处理方法 */
        delete: () => {
          this.node.node.deleteLink(this.index, index);
          // TODO:暂时使用这种方案刷新
          this.pos.x += 0.00001 * (Math.random() - 0.5);
        }
      });
    });
    this.links = re;
  }
}

/** 输出状态 */
export class StoreOutput {
  /**
   * @param {StoreNode} node 输出所属的节点
   * @param {string} index 输出的下标
   */
  constructor(node, index) {
    makeObservable(this);
    this.index = index;
    this.node = node;
    this.define = node.define.outputs[index] || {};
  }

  /** 下标 */
  index = '';
  /** @type {StoreNode} 输出所属的节点 */
  node;
  /** @type {BluePrintOutputDefine} 当前输出的定义 */
  @observable define = {};
  /** 当前的输出的接口坐标 */
  @observable pos = { x: 0, y: 0 };
}
