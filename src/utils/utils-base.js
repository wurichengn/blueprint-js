/**
 * 生成一个UUID字符串
 * @param {number} [num] 随机串数，默认为4
 * @returns {string} 生成的UID
 */
export var UUID = function(num = 4) {
  // 生成一串随机串
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  // 先插入时间戳
  var re = (new Date().getTime()).toString(16);
  // 循环加入随机串
  for (var i = 0; i < num; i++) {
    re += '-' + S4();
  }
  return re;
};
