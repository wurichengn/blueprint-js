import { Ref } from "react";
import { StoreMap } from "../ui/stores/store-app";
import { StoreNode } from "../ui/stores/store-node";
import { BluePrintNode } from "./node";
import { Program } from "./program";

declare global {
  interface BluePrintHooksDefine{
    /**每当map视图渲染时就会触发该消息，你可以在这里通过hooks增加额外功能 */
    "map-render":(e:{
      /** 图组件的根容器的引用 */
      ref:Ref<HTMLDivElement>,
      /** 图组件的背景引用，对于背景增加时间处理可以避免内容节点触发 */
      refBG:Ref<HTMLDivElement>,
      /** 图组件的节点容器的引用 */
      refNodes:Ref<HTMLDivElement>,
      /** 图组件的状态 */
      state:StoreMap
    })=>{};
    
    /**在图中打开右键菜单时触发 */
    "map-contextmenu":(e:{
      /**当前的菜单数据，修改该数据可以影像菜单最终打开的结果，如果要关闭菜单可以赋值为空数组 */
      menuData:any
    })=>{};

    /**图中添加节点时触发 */
    "map-add-node":(e:{
      /**添加的节点 */
      node:BluePrintNode,
      /**节点所属的程序 */
      program:Program
    })=>{};

    /**节点渲染时触发 */
    "node-render":(e:{
      /**渲染的逻辑节点 */
      node:BluePrintNode,
      /**渲染的UI状态机 */
      state:StoreNode,
      /**节点容器的ref */
      ref:Ref<HTMLDivElement>,
      /**节点标题的ref */
      refTitle:Ref<HTMLDivElement>
    })=>{};
  }
}

export type AddHooksFunction = <T extends keyof BluePrintHooksDefine>(key:T,callback:BluePrintHooksDefine[T])=>{};