var ReactDOM = require('react-dom');
var Styles = require('./styles/ui-contextmenu.less');

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
