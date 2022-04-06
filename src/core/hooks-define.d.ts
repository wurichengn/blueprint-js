import { Ref } from "react";
import { StoreMap } from "../ui/stores/store-app";
import { StoreInput, StoreNode } from "../ui/stores/store-node";
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
      state:StoreMap,
      /**图的扩展渲染内容集合 */
      expand:[]
    })=>{};
    
    /**在图中打开右键菜单时触发 */
    "map-contextmenu":(e:{
      /**当前的菜单数据，修改该数据可以影像菜单最终打开的结果，如果要关闭菜单可以赋值为空数组 */
      menuData:any,
      /**图的状态 */
      state:StoreMap,
      /**图对应的程序 */
      program:Program
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
      refTitle:Ref<HTMLDivElement>,
      /**图的扩展渲染内容集合 */
      expand:[]
    })=>{};

    /**节点渲染时触发，在observer内部,node-render之后 */
    "node-render-observer":(e:{
      /**渲染的逻辑节点 */
      node:BluePrintNode,
      /**渲染的UI状态机 */
      state:StoreNode,
      /**节点容器的ref */
      ref:Ref<HTMLDivElement>,
      /**节点标题的ref */
      refTitle:Ref<HTMLDivElement>,
      /**图的扩展渲染内容集合 */
      expand:[]
    })=>{};
    
    /**节点的输入组件渲染时 */
    "node-render-input":(e:{
      /**重渲染当前输入组件 */
      render:()=>{};
      /**渲染的逻辑节点 */
      node:BluePrintNode,
      /**渲染的输入节点状态 */
      state: StoreInput,
      /**整个输入的ref */
      ref:Ref<HTMLDivElement>,
      /**输入控制点的ref */
      refPointer:Ref<HTMLDivElement>,
      /**输出的扩展渲染内容集合 */
      expand:[]
    })=>{}

    /**节点要保存时 */
    "node-save":(e:{
      /**节点要保存的数据 */
      saveData:*
    })=>{}
  }
}

export type AddHooksFunction = <T extends keyof BluePrintHooksDefine>(key:T,callback:BluePrintHooksDefine[T])=>{};