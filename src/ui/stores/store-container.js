import { action, autorun, intercept, makeObservable, observable } from 'mobx';
import { Program } from '../../core/program';
import { StoreMap } from './store-app';

/** 容器的 */
export class StoreContainer {
  /**
   * @param {Program} program 要初始化使用的程序
   */
  constructor(program) {
    makeObservable(this);
    this.mapStack.push(new StoreMap(program, this));
    this.activeMap = this.mapStack[0];
  }
  /** @type {StoreMap} 当前使用的图状态 */
  @observable activeMap;
  /** @type {StoreMap[]} 图层级栈 */
  @observable mapStack = [];

  /**
   * 向容器的栈中推入新的程序
   * @param {*} program 要推入的程序
   */
  @action pushProgram(program) {
    this.mapStack.push(new StoreMap(program, this));
    this.activeMap = this.mapStack[this.mapStack.length - 1];
  }

  /**
   * 从程序的栈中取出程序
   */
  @action popProgram() {
    if (this.mapStack.length > 1) {
      this.mapStack.splice(this.mapStack.length - 1, 1);
    }
    this.activeMap = this.mapStack[this.mapStack.length - 1];
  }
}
