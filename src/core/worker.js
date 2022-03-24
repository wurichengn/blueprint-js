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

  /** @type {NodeDefine} 要运行的节点 */
  entryNode;

  /** 记录的组件输出结果 */
  outputs = {};

  /** 运行的关联树 */
  linkTree;
}
