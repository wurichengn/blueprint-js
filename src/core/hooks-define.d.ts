import { Ref } from "react";
import { StoreMap } from "../ui/stores/store-app";

declare global {
  interface BluePrintHooksDefine{
    "map-render":(e:{
      /** 图组件的根容器的引用 */
      ref:Ref<HTMLDivElement>,
      /** 图组件的状态 */
      state:StoreMap
    })=>{}
  }
}

export type AddHooksFunction = <T extends keyof BluePrintHooksDefine>(key:T,callback:BluePrintHooksDefine[T])=>{};