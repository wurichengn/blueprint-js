import { BluePrintNode } from './node';
import { NodeDefine } from './node';
import { Program } from './program';

export class BluePrintWorker {
  /**
   * @param {BluePrintNode} node
   */
  constructor(node) {
    // 记录数据
    this.entryNode = node;
    this.program = node.program;
  }

  /** @type {Program} 要运行的蓝图程序 */
  program;

  /** @type {BluePrintNode} 要运行的节点 */
  entryNode;

  /** 是否正在运行中 */
  running = false;

  /** 各个节点的输出结果记录表 */
  outputs = {};

  /** 运行一次 */
  async run() {
    // 运行中检测
    if (this.running) {
      return console.warn('上一次任务正在运行中');
    }
    // 进入运行状态
    this.running = true;
    /** 节点运行队列 */
    var nodeList = this.tidyLevel();

    // 循环运行每个节点
    for (var i = 0; i < nodeList.length; i++) {
      var node = nodeList[i];
      // 构造参数
      var args = node.buildArgs((uid, key) => {
        /** 获取的输出数据 */
        var output = this.outputs[uid];
        // 如果没有对应输出数据则返回空
        if (output == null) return;
        // 判断是否为默认输出
        if (this.program.nodesMap[uid].define.outputs[key].default) return output;
        return output[key];
      });
      // 运行节点
      var output = node.run(args);
      // 异步兼容
      if (output instanceof Promise) {
        output = await output;
      }
      // 更新输出
      this.outputs[node.uid] = output;
    }

    this.running = false;

    return this.outputs[this.entryNode.uid];
  }

  /** 整理每个节点的层级 */
  tidyLevel() {
    /** @type {{[key:string]:{node:BluePrintNode,level:number}}} 节点uid映射表 */
    var nodeMap = {};

    /**
     * 整理一个节点的层级数据
     * @param {BluePrintNode} node 当前要整理的节点
     * @param {number} level 当前节点的层级
     * @param {BluePrintNode[]} runStack 当前追溯的运行栈
     */
    var tidyOne = (node, level, runStack = []) => {
      // 如果节点在运行栈中已存在则结束整理
      if (runStack.includes(node)) return;

      /** 继续追溯 */
      var nextTidy = () => {
        // 向前追溯
        for (var i in node.attrs.links) {
          var link = node.attrs.links[i];
          // 数组类型依赖
          if (Array.isArray(link)) {
            link.forEach(l => {
              tidyOne(this.program.nodesMap[l.uid], level + 1, [...runStack, node]);
            });
          } else {
            // 直接追溯
            tidyOne(this.program.nodesMap[link.uid], level + 1, [...runStack, node]);
          }
        }
      };

      // 如果节点已经加入到表中
      if (nodeMap[node.uid] != null) {
        // 层级提升
        nodeMap[node.uid].level = Math.max(nodeMap[node.uid].level, level);
        // 继续追溯
        nextTidy();
        return;
      }

      // 添加节点
      nodeMap[node.uid] = { node: node, level: level };
      // 继续追溯
      nextTidy();
    };

    // 从当前节点计算关联层级
    tidyOne(this.entryNode, 0);

    /** @type {{node:BluePrintNode,level:number}[]} 节点的执行顺序表 */
    var nodeList = [];
    for (var i in nodeMap) {
      nodeList.push(nodeMap[i]);
    }

    // 根据层级排序
    nodeList = nodeList.sort((a, b) => b.level - a.level);

    return nodeList.map(node => node.node);
  }
}
