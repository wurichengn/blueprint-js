import ReactDOM from 'react-dom';
import Styles from './styles/ui-contextmenu.less';
import React from 'react';

/**
 * 右键悬浮菜单
 * @param {*} menu 菜单的数据
 * @returns
 */
export var UIContextMenu = (menu) => {
  return ReactDOM.createPortal(<div className={Styles.Menu}>
    <div>lalala</div>
  </div>, document.body);
};
