
/**
 * 判断一个节点是否是另一个节点的子节点
 * @param {HTMLElement} par 要判断的父节点
 * @param {HTMLElement} child 要判断的子节点
 * @returns {boolean}
 */
export var isChild = function(par, child) {
  var now = child;
  while (now && now.parentNode && now.parentNode != null) {
    if (now === par || now.parentNode === par) { return true; }
    now = now.parentNode;
  }
  return false;
};
