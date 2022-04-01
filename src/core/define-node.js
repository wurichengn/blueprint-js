
/** 蓝图输入的定义 */
export class BluePrintInputDefine {
  /** 输入的名称，用于编辑器显示 */
  name = '未命名输入';
  /** @type {null|"string"} 输入的数据类型 */
  type = null;
  /** 是否是多输入 */
  many = false;
  /** 输入的默认值 */
  default = null;
  /** 在多输入情况下是否有顺序要求 */
  // orderly = false;
}

export class BluePrintOutputDefine {
  /** 输出的名称,用于编辑显示 */
  name = '未命名输出';
  /** @type {null|"string"} 输出的类型 */
  type = null;
  /** 是否是默认输出，如果是默认输出的话函数的返回值会直接写入到这个值中，而不是取指定的下标 */
  default = false;
}
