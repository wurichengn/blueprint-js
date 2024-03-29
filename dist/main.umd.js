(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/defineProperty'), require('lodash'), require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/regenerator'), require('react'), require('@babel/runtime/helpers/toConsumableArray'), require('@babel/runtime/helpers/assertThisInitialized'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/initializerDefineProperty'), require('@babel/runtime/helpers/applyDecoratedDescriptor'), require('@babel/runtime/helpers/initializerWarningHelper'), require('mobx'), require('mobx-react'), require('react-dom'), require('@babel/runtime/helpers/typeof'), require('@babel/runtime/helpers/slicedToArray'), require('ahooks')) :
  typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/defineProperty', 'lodash', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/regenerator', 'react', '@babel/runtime/helpers/toConsumableArray', '@babel/runtime/helpers/assertThisInitialized', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/initializerDefineProperty', '@babel/runtime/helpers/applyDecoratedDescriptor', '@babel/runtime/helpers/initializerWarningHelper', 'mobx', 'mobx-react', 'react-dom', '@babel/runtime/helpers/typeof', '@babel/runtime/helpers/slicedToArray', 'ahooks'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BluePJS = {}, global._classCallCheck, global._createClass, global._defineProperty, global._, global._asyncToGenerator, global._regeneratorRuntime, global.React, global._toConsumableArray, global._assertThisInitialized, global._inherits, global._possibleConstructorReturn, global._getPrototypeOf, global._initializerDefineProperty, global._applyDecoratedDescriptor, null, global.mobx, global.mobxReact, global.ReactDOM, global._typeof, global._slicedToArray, global.ahooks));
})(this, (function (exports, _classCallCheck, _createClass, _defineProperty, _, _asyncToGenerator, _regeneratorRuntime, React, _toConsumableArray, _assertThisInitialized, _inherits, _possibleConstructorReturn, _getPrototypeOf, _initializerDefineProperty, _applyDecoratedDescriptor, initializerWarningHelper, mobx, mobxReact, ReactDOM, _typeof, _slicedToArray, ahooks) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
  var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
  var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
  var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
  var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
  var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
  var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
  var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
  var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
  var _initializerDefineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_initializerDefineProperty);
  var _applyDecoratedDescriptor__default = /*#__PURE__*/_interopDefaultLegacy(_applyDecoratedDescriptor);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
  var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

  /** 蓝图钩子 */
  var BluePrintHooks = /*#__PURE__*/_createClass__default["default"](function BluePrintHooks() {
    _classCallCheck__default["default"](this, BluePrintHooks);

    /** 当前绑定的钩子表 */
    var hooks = {};
    /** 当前全局侦听的回调表 */

    var alls = [];
    /**
     * 添加一个全钩子侦听回调
     * @param {(e,type:keyof BluePrintHooksDefine)=>{}} callback 要侦听的回调方法
     * @returns {()=>{}} 释放对应钩子的方法
     */

    this.all = function (callback) {
      alls.push(callback);
      return function () {
        alls.splice(alls.indexOf(callback), 1);
      };
    };
    /**
     * 添加一个钩子
     * @type {import('./hooks-define').AddHooksFunction}
     * @param {string|Symbol} type 钩子类型
     * @param {()=>{}} callback 绑定的钩子
     * @returns {()=>{}} 释放对应的钩子的方法
     */


    this.add = function (type, callback) {
      var hook = [type, callback];
      hooks[type] = hooks[type] || [];
      hooks[type].push(hook);
      var isRemove = false;
      return function () {
        if (isRemove || hooks[type] == null) return;
        isRemove = true;
        var index = hooks[type].indexOf(hook);

        if (index >= 0) {
          hooks[type].splice(index, 1);
        }
      };
    };
    /**
     * 触发钩子
     * @param {string|Symbol} type 钩子的类型
     * @param {*} args 钩子的参数
     * @returns {*} 直接将args参数返回
     */


    this.trigger = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(type, args) {
        var list, i;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                list = hooks[type]; // 触发指定类型回调

                _context.t0 = _regeneratorRuntime__default["default"].keys(list);

              case 2:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 8;
                  break;
                }

                i = _context.t1.value;
                _context.next = 6;
                return list[i][1](args);

              case 6:
                _context.next = 2;
                break;

              case 8:
                _context.t2 = _regeneratorRuntime__default["default"].keys(alls);

              case 9:
                if ((_context.t3 = _context.t2()).done) {
                  _context.next = 15;
                  break;
                }

                i = _context.t3.value;
                _context.next = 13;
                return alls[i](args, type);

              case 13:
                _context.next = 9;
                break;

              case 15:
                return _context.abrupt("return", args);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
    /**
    * 同步触发钩子
    * @param {string|Symbol} type 钩子的类型
    * @param {*} args 钩子的参数
    * @returns {*} 直接将args参数返回
    */


    this.triggerSync = function (type, args) {
      var list = hooks[type]; // 触发指定类型回调

      for (var i in list) {
        list[i][1](args);
      } // 触发全侦听回调


      for (var i in alls) {
        alls[i](args, type);
      }

      return args;
    };
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  /** 蓝图节点逻辑定义 */

  var BluePrintNode = /*#__PURE__*/function () {
    /**
     * @param {Program} program 节点所属的程序
     * @param {*} saveData 之前保存的数据
     */
    function BluePrintNode(program, saveData) {
      var _this = this;

      _classCallCheck__default["default"](this, BluePrintNode);

      _defineProperty__default["default"](this, "uid", UUID());

      _defineProperty__default["default"](this, "program", void 0);

      _defineProperty__default["default"](this, "type", void 0);

      _defineProperty__default["default"](this, "hooks", new BluePrintHooks());

      _defineProperty__default["default"](this, "define", new NodeDefine());

      _defineProperty__default["default"](this, "attrs", new NodeAttrs());

      this.program = program; // 钩子转发

      this.hooks.all(function (e, type) {
        e = e || {};
        e.node = _this;

        _this.program.hooks.trigger(type, e);
      }); // from改变触发onChange

      this.hooks.add('node-forms-update', function (e) {
        if (_this.define.inputs[e.key] && _this.define.inputs[e.key].onChange) {
          _this.define.inputs[e.key].onChange({
            node: _this,
            key: e.key,
            value: e.value
          });
        }
      }); // 如果有已保存的数据

      if (saveData) {
        for (var i in saveData.attrs) {
          this.attrs[i] = saveData.attrs[i];
        }

        this.uid = saveData.uid;
      }
    }
    /**
     * @type {()=>{}|Promise<any>} 运行的逻辑，可以是异步函数
     **/


    _createClass__default["default"](BluePrintNode, [{
      key: "run",
      value: function run() {}
    }, {
      key: "$define",
      value:
      /**
       * 定义属性,setDefine的别名，构造初始化时也需要调用
       * @param {NodeDefine} define
       * @returns
       */
      function $define(define) {
        return this.setDefine(define);
      }
      /**
       * 设置节点定义
       * @param {NodeDefine} define
       */

    }, {
      key: "setDefine",
      value: function setDefine(define) {
        this._define = define || this._define;
        this.define = define = ___default["default"].cloneDeep(this._define); // 重新构造输入

        var inputs = {};

        for (var i in define.inputs) {
          if (typeof define.inputs[i] === 'function') {
            // 如果是方法类型的输入则执行方法
            define.inputs[i]({
              node: this,
              key: i,
              inputs: inputs
            });
          } else {
            // 否则直接使用输入
            inputs[i] = define.inputs[i];
          }
        }

        define.inputs = inputs; // 输入处理

        for (var i in define.inputs) {
          // 数组类型处理
          if (define.inputs[i].many && !Array.isArray(this.attrs.links[i])) {
            this.attrs.links[i] = [];
          } // 非数组类型处理


          if (!define.inputs[i].many && Array.isArray(this.attrs.links[i])) {
            this.attrs.links[i] = this.attrs.links[i][0];
          } // 默认值写入


          if (this.define.inputs[i]["default"] != null && this.attrs.forms[i] == null) {
            this.attrs.forms[i] = this.define.inputs[i]["default"];
          }
        } // 触发定义改变消息


        this.hooks.triggerSync('node-update-define', {
          define: define
        });
        return this.define;
      }
      /** 获取实例名称 */

    }, {
      key: "getNodeName",
      value: function getNodeName() {
        if (this.attrs.name) return this.attrs.name;
        if (this.define.name) return this.define.name;

        if (this.constructor.menu) {
          var menu = this.constructor.menu;
          return menu.substr(menu.lastIndexOf('/') + 1);
        }

        return this.constructor.name;
      }
      /** 构造当前节点依赖的参数 */

    }, {
      key: "buildArgs",
      value: function buildArgs() {
        var outputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
        var args = {}; // 循环处理表单项

        for (var i in this.attrs.forms) {
          args[i] = this.attrs.forms[i];
        } // 循环处理关联项


        for (var i in this.attrs.links) {
          var link = this.attrs.links[i]; // 如果是多引用

          if (Array.isArray(link)) {
            var vals = [];

            for (var j in link) {
              vals.push(outputs(link[j].uid, link[j].key));
            }

            args[i] = vals;
          } else {
            // 单引用
            args[i] = outputs(link.uid, link.key);
          }
        } // 处理参数回调


        for (var i in this.define.inputs) {
          if (this.define.inputs[i].onBuild) {
            this.define.inputs[i].onBuild({
              node: this,
              key: i,
              args: args
            });
          }
        }

        return args;
      }
      /**
       * 清理无效节点关联
       */

    }, {
      key: "clearLink",
      value: function clearLink() {
        var _this2 = this;

        for (var i in this.attrs.links) {
          var links = this.attrs.links[i];

          if (Array.isArray(links)) {
            this.attrs.links[i] = links.filter(function (link) {
              return _this2.program.nodesMap[link.uid] != null;
            });
          } else {
            if (this.program.nodesMap[links.uid] == null) {
              delete this.attrs.links[i];
            }
          }
        }
      }
      /**
       * 循环获取所有的关联项数据
       * @param {string} key 要获取关联项的输入key
       * @returns {LinkData[]}
       */

    }, {
      key: "links",
      value: function links(key) {
        if (this.attrs.links[key] == null) return [];

        if (Array.isArray(this.attrs.links[key])) {
          return this.attrs.links[key];
        } else {
          return [this.attrs.links[key]];
        }
      }
      /** 增加一个关联项 */

    }, {
      key: "addLink",
      value: function addLink(key, link) {
        // 如果是数组输入项
        if (Array.isArray(this.attrs.links[key])) {
          // 循环判断是否已经有对应关联项
          for (var i in this.attrs.links[key]) {
            var now = this.attrs.links[key][i];

            if (now.uid === link.uid && now.key === link.key) {
              return;
            }
          } // 加入关联项


          this.attrs.links[key].push(link);
        } else {
          // 直接设置关联项
          this.attrs.links[key] = link;
        } // 触发添加关联项消息


        this.hooks.trigger('node-set-link', {
          node: this,
          key: key,
          link: link
        });
      }
      /**
       * 移除一个关联项
       * @param {string} key 要移除的关联项下标
       * @param {number} index 要移除的关联项序号，多输入时使用
       */

    }, {
      key: "deleteLink",
      value: function deleteLink(key, index) {
        if (Array.isArray(this.attrs.links[key])) {
          this.attrs.links[key].splice(index, 1);
        } else {
          delete this.attrs.links[key];
        } // 触发添加关联项消息


        this.hooks.trigger('node-delete-link', {
          node: this,
          key: key,
          index: index
        });
      }
      /** 序列化当前节点的数据 */

    }, {
      key: "save",
      value: function save() {
        var re = {
          uid: this.uid,
          type: this.type,
          attrs: _objectSpread$1({}, this.attrs)
        };
        this.hooks.triggerSync('node-save', {
          saveData: re
        });
        return re;
      }
      /** 输出运行日志 */

    }, {
      key: "log",
      value: function log() {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        this.hooks.triggerSync('node-log', {
          node: this,
          messages: props
        });
      }
      /** @type {string} 节点所在菜单 */

    }]);

    return BluePrintNode;
  }();
  /** 节点的定义数据 */

  _defineProperty__default["default"](BluePrintNode, "menu", void 0);

  var NodeDefine = /*#__PURE__*/_createClass__default["default"](function NodeDefine(define) {
    _classCallCheck__default["default"](this, NodeDefine);

    _defineProperty__default["default"](this, "name", '未命名节点');

    _defineProperty__default["default"](this, "color", '#17487a');

    _defineProperty__default["default"](this, "inputs", {});

    _defineProperty__default["default"](this, "outputs", {});

    for (var i in define) {
      this[i] = define[i];
    }
  }
  /** 节点的名称 */
  );
  /** 节点当前的属性 */

  var NodeAttrs = /*#__PURE__*/_createClass__default["default"](function NodeAttrs() {
    _classCallCheck__default["default"](this, NodeAttrs);

    _defineProperty__default["default"](this, "x", 0);

    _defineProperty__default["default"](this, "y", 0);

    _defineProperty__default["default"](this, "forms", {});

    _defineProperty__default["default"](this, "links", {});
  });

  /**
   * 生成一个UUID字符串
   * @param {number} [num] 随机串数，默认为4
   * @returns {string} 生成的UID
   */

  var UUID = function UUID() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

    // 生成一串随机串
    function S4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    } // 先插入时间戳


    var re = new Date().getTime().toString(16); // 循环加入随机串

    for (var i = 0; i < num; i++) {
      re += '-' + S4();
    }

    return re;
  };
  /**
   * 一个输出定义是否可以连接到指定的输入定义
   * @param {BluePrintOutputDefine} output 输出的定义
   * @param {BluePrintInputDefine} input 输入的定义
   */

  var PointerCanLink = function PointerCanLink(output, input) {
    if (output.type === input.type || output.type == null || input.type == null) {
      return true;
    }

    return false;
  };

  /** 蓝图逻辑处理程序 */

  var Program = /*#__PURE__*/function () {
    /**
     * @param {ProgramConfig} config 初始化程序的配置
     */
    function Program(config) {
      _classCallCheck__default["default"](this, Program);

      _defineProperty__default["default"](this, "hooks", new BluePrintHooks());

      _defineProperty__default["default"](this, "config", void 0);

      _defineProperty__default["default"](this, "types", {});

      _defineProperty__default["default"](this, "modules", {});

      _defineProperty__default["default"](this, "nodes", []);

      _defineProperty__default["default"](this, "nodesMap", {});

      _defineProperty__default["default"](this, "uid", UUID());

      // 初始化配置
      this.config = new ProgramConfig();

      for (var i in config) {
        this.config[i] = config[i];
      } // 运行插件逻辑


      for (var i in this.config.plugins) {
        this.config.plugins[i](this);
      }
    }
    /** 蓝图程序的钩子 */


    _createClass__default["default"](Program, [{
      key: "addType",
      value:
      /**
       * 往程序中添加一个类型定义
       * @param {string|Symbol} key 类型的唯一标识符
       * @param {BPDefineType} type 类型的定义
       */
      function addType(key, type) {
        if (this.types[key]) {
          console.warn("\u8986\u76D6\u4E86\u5DF2\u7ECF\u5B9A\u4E49\u7684\u7C7B\u578B[".concat(key, "]"));
        }

        this.types[key] = type;
      }
      /**
       * 添加节点的逻辑定义
       * @param {string|Symbol} key 节点逻辑的唯一标识符
       * @param {typeof BluePrintNode} module 节点的类定义，需要继承自BluePrintNode
       */

    }, {
      key: "addModule",
      value: function addModule(key, module) {
        if (this.modules[key]) {
          console.warn("\u8986\u76D6\u4E86\u5DF2\u7ECF\u5B9A\u4E49\u7684\u8282\u70B9\u903B\u8F91[".concat(key, "]"));
        }

        this.modules[key] = module;
      }
      /**
       * 向当前程序中添加一个节点
       * @param {BluePrintNode} node 要添加的节点实例
       */

    }, {
      key: "addNode",
      value: function addNode(node) {
        var type = this.getNodeType(node);
        if (type == null) return new Error('禁止加入未在程序中定义的节点');
        node.type = type;
        this.nodes.push(node);
        this.nodesMap[node.uid] = node; // 触发添加节点处理

        this.hooks.trigger('map-add-node', {
          node: node,
          program: this
        });
      }
      /**
       * 获取节点的类型key
       * @param {BluePrintNode} node 要获取类型的节点
       * @returns {string}
       */

    }, {
      key: "getNodeType",
      value: function getNodeType(node) {
        for (var i in this.modules) {
          if (this.modules[i] == node.constructor) {
            return i;
          }
        }
      }
      /**
       * 从当前程序中删除一个节点
       * @param {BluePrintNode} node 要删除的节点实例
       */

    }, {
      key: "removeNode",
      value: function removeNode(node) {
        if (!this.nodes.includes(node)) return; // 移除列表

        this.nodes.splice(this.nodes.indexOf(node), 1);
        delete this.nodesMap[node.uid]; // 清理多余关联内容

        this.nodes.forEach(function (node) {
          node.clearLink();
        }); // 触发移除节点处理钩子

        this.hooks.trigger('map-remove-node', {
          node: node,
          program: this
        });
      }
      /** 将当前程序中的结构数据序列化为JSON */

    }, {
      key: "save",
      value: function save() {
        return {
          uid: this.uid,
          nodes: this.nodes.map(function (node) {
            return node.save();
          })
        };
      }
      /** 从已经存储好的数据中载入图结构 */

    }, {
      key: "load",
      value: function load(data) {
        var _this = this;

        // 覆盖uid
        this.uid = data.uid || this.uid; // 移除所有现有节点

        while (this.nodes.length > 0) {
          this.removeNode(this.nodes[0]);
        } // 添加节点


        data.nodes.forEach(function (node) {
          if (_this.modules[node.type]) {
            _this.addNode(new _this.modules[node.type](_this, node));
          } else {
            console.warn("\u8F7D\u5165\u6570\u636E\u4E2D\u51FA\u73B0\u4E86\u672A\u5B9A\u4E49\u7EC4\u4EF6[".concat(node.type, "]"));
          }
        });
      }
    }]);

    return Program;
  }();
  /** 蓝图程序配置 */

  var ProgramConfig = /*#__PURE__*/_createClass__default["default"](function ProgramConfig() {
    _classCallCheck__default["default"](this, ProgramConfig);

    _defineProperty__default["default"](this, "plugins", []);
  });

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$4 = ".plugin-base_input__C-rHJ {\n  width: 100px;\n  background: #222;\n  border: 1px solid #777;\n  color: #fff;\n  border-radius: 4px;\n}\n.plugin-base_color__q8tfB {\n  padding: 0px;\n  background: none;\n  border: none;\n}\n";
  var Styles$4 = {"input":"plugin-base_input__C-rHJ","color":"plugin-base_color__q8tfB"};
  styleInject(css_248z$4);

  /**
   * 基础功能
   * @param {Program} program 要运行插件的程序
   */

  var PluginBase = function PluginBase(program) {
    // ============类型定义============
    program.addType('number', {
      name: '数值',
      inputModule: function inputModule(val, cb) {
        return /*#__PURE__*/React__default["default"].createElement("input", {
          className: Styles$4.input,
          type: "number",
          key: "number",
          value: val,
          onChange: function onChange(e) {
            cb(Number(e.target.value));
          }
        });
      }
    });
    program.addType('string', {
      name: '字符串',
      inputModule: function inputModule(val, cb) {
        return /*#__PURE__*/React__default["default"].createElement("input", {
          className: Styles$4.input,
          type: "text",
          key: "string",
          value: val,
          onChange: function onChange(e) {
            cb(e.target.value);
          }
        });
      }
    });
    program.addType('select', {
      name: '选项',
      inputModule: function inputModule(val, cb, define) {
        var args = [];

        for (var i in define.args) {
          args.push( /*#__PURE__*/React__default["default"].createElement("option", {
            key: i,
            value: i
          }, define.args[i]));
        }

        return /*#__PURE__*/React__default["default"].createElement("select", {
          className: Styles$4.input,
          type: "text",
          key: "select",
          value: val,
          onChange: function onChange(e) {
            cb(e.target.value);
          }
        }, args);
      }
    });
    program.addType('color', {
      name: '颜色',
      inputModule: function inputModule(val, cb) {
        return /*#__PURE__*/React__default["default"].createElement("input", {
          className: Styles$4.color,
          type: "color",
          key: "color",
          value: val,
          onChange: function onChange(e) {
            cb(e.target.value);
          }
        });
      }
    });
    program.addType('map:string', {
      name: '映射表（字符串）',
      inputModule: function inputModule() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var cb = arguments.length > 1 ? arguments[1] : undefined;
        var list = [];

        var addOne = function addOne(key, value) {
          list.push( /*#__PURE__*/React__default["default"].createElement("div", {
            key: key
          }, /*#__PURE__*/React__default["default"].createElement("input", {
            className: Styles$4.input,
            value: key,
            onChange: function onChange(e) {
              val[e.target.value] = value;
              cb(val);
            }
          }), /*#__PURE__*/React__default["default"].createElement("input", {
            className: Styles$4.input,
            value: value,
            onChange: function onChange(e) {
              val[key] = e.target.value;
              cb(val);
            }
          }), /*#__PURE__*/React__default["default"].createElement("button", {
            onClick: function onClick() {
              delete val[key];
              cb(val);
            }
          }, "x")));
        };

        for (var i in val) {
          addOne(i, val[i]);
        }

        return /*#__PURE__*/React__default["default"].createElement("div", {
          key: "map:text"
        }, list, /*#__PURE__*/React__default["default"].createElement("button", {
          key: "add-button",
          onClick: function onClick() {
            // 添加项
            var id = 1;

            while (val['t' + id] !== undefined) {
              id++;
            }

            console.log(id);
            val['t' + id] = '';
            cb(val);
          }
        }, "\u6DFB\u52A0"));
      }
    });
  };

  /** 蓝图任务 */


  var BluePrintWorker = /*#__PURE__*/function () {
    /**
     * @param {BluePrintNode} node
     */
    function BluePrintWorker(node) {
      _classCallCheck__default["default"](this, BluePrintWorker);

      _defineProperty__default["default"](this, "program", void 0);

      _defineProperty__default["default"](this, "entryNode", void 0);

      _defineProperty__default["default"](this, "running", false);

      _defineProperty__default["default"](this, "outputs", {});

      // 记录数据
      this.entryNode = node;
      this.program = node.program;
    }
    /** @type {Program} 要运行的蓝图程序 */


    _createClass__default["default"](BluePrintWorker, [{
      key: "run",
      value:
      /**
       * 运行一次任务
       * @param {RunProps} props 运行参数
       * @returns
       */
      function () {
        var _run = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
          var _this = this;

          var props,
              nodeList,
              i,
              node,
              args,
              dispose,
              output,
              _args = arguments;
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  props = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

                  if (!this.running) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return", console.warn('上一次任务正在运行中'));

                case 3:
                  // 进入运行状态
                  this.running = true;
                  /** 节点运行队列 */

                  nodeList = this.tidyLevel(); // 循环运行每个节点

                  i = 0;

                case 6:
                  if (!(i < nodeList.length)) {
                    _context.next = 30;
                    break;
                  }

                  node = nodeList[i]; // 构造参数

                  args = node.buildArgs(function (uid, key) {
                    /** 获取的输出数据 */
                    var output = _this.outputs[uid]; // 如果没有对应输出数据则返回空

                    if (output == null) return; // 判断是否为默认输出

                    if (_this.program.nodesMap[uid].define.outputs[key]["default"]) return output;
                    return output[key];
                  }); // 日志截取

                  dispose = node.hooks.add('node-log', function (e) {
                    return props.onLog && props.onLog(e);
                  });
                  _context.prev = 10;
                  // 触发运行回调
                  props.onNodeRun && props.onNodeRun({
                    node: node
                  }); // 运行节点

                  output = node.run(args); // 异步兼容

                  if (!(output instanceof Promise)) {
                    _context.next = 17;
                    break;
                  }

                  _context.next = 16;
                  return output;

                case 16:
                  output = _context.sent;

                case 17:
                  // 触发结束回调
                  props.onNodeEnd && props.onNodeEnd({
                    node: node,
                    output: output
                  });
                  _context.next = 25;
                  break;

                case 20:
                  _context.prev = 20;
                  _context.t0 = _context["catch"](10);
                  dispose();
                  this.running = false;
                  throw _context.t0;

                case 25:
                  dispose(); // 更新输出

                  this.outputs[node.uid] = output;

                case 27:
                  i++;
                  _context.next = 6;
                  break;

                case 30:
                  this.running = false;
                  return _context.abrupt("return", this.outputs[this.entryNode.uid]);

                case 32:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[10, 20]]);
        }));

        function run() {
          return _run.apply(this, arguments);
        }

        return run;
      }()
      /** 整理每个节点的层级 */

    }, {
      key: "tidyLevel",
      value: function tidyLevel() {
        var _this2 = this;

        /** @type {{[key:string]:{node:BluePrintNode,level:number}}} 节点uid映射表 */
        var nodeMap = {};
        /**
         * 整理一个节点的层级数据
         * @param {BluePrintNode} node 当前要整理的节点
         * @param {number} level 当前节点的层级
         * @param {BluePrintNode[]} runStack 当前追溯的运行栈
         */

        var tidyOne = function tidyOne(node, level) {
          var runStack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          // 如果节点在运行栈中已存在则结束整理
          if (runStack.includes(node)) return;
          /** 继续追溯 */

          var nextTidy = function nextTidy() {
            // 向前追溯
            for (var i in node.attrs.links) {
              var link = node.attrs.links[i]; // 数组类型依赖

              if (Array.isArray(link)) {
                link.forEach(function (l) {
                  tidyOne(_this2.program.nodesMap[l.uid], level + 1, [].concat(_toConsumableArray__default["default"](runStack), [node]));
                });
              } else {
                // 直接追溯
                tidyOne(_this2.program.nodesMap[link.uid], level + 1, [].concat(_toConsumableArray__default["default"](runStack), [node]));
              }
            }
          }; // 如果节点已经加入到表中


          if (nodeMap[node.uid] != null) {
            // 层级提升
            nodeMap[node.uid].level = Math.max(nodeMap[node.uid].level, level); // 继续追溯

            nextTidy();
            return;
          } // 添加节点


          nodeMap[node.uid] = {
            node: node,
            level: level
          }; // 继续追溯

          nextTidy();
        }; // 从当前节点计算关联层级


        tidyOne(this.entryNode, 0);
        /** @type {{node:BluePrintNode,level:number}[]} 节点的执行顺序表 */

        var nodeList = [];

        for (var i in nodeMap) {
          nodeList.push(nodeMap[i]);
        } // 根据层级排序


        nodeList = nodeList.sort(function (a, b) {
          return b.level - a.level;
        });
        return nodeList.map(function (node) {
          return node.node;
        });
      }
    }]);

    return BluePrintWorker;
  }();

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * 子程序插件，为当前程序加入可以创建子程序的功能
   * @param {Program} program 要运行插件的程序
   */

  var PluginChildProgram = function PluginChildProgram(program) {
    program.addModule('child-program', ChildProgram);
  };
  /** 子程序节点逻辑 */

  var ChildProgram = /*#__PURE__*/function (_BluePrintNode) {
    _inherits__default["default"](ChildProgram, _BluePrintNode);

    var _super = _createSuper(ChildProgram);

    /**
     * @param {Program} program 节点所属的程序
     * @param {*} saveData 之前保存的数据
     */
    function ChildProgram(program, saveData, config) {
      var _this;

      _classCallCheck__default["default"](this, ChildProgram);

      // 运行父类构造函数
      _this = _super.call(this, program, saveData);
      /** 构造子程序的配置 */

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "childProgram", void 0);

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "programConfig", void 0);

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "define", _this.$define({
        name: '子程序',
        inputs: {},
        outputs: {}
      }));

      var cfg = config;

      if (cfg == null) {
        cfg = {
          plugins: [].concat(_toConsumableArray__default["default"](_this.program.config.plugins), [PluginChildProgramBaseFunction])
        };
      } // 构造子图的配置


      _this.childProgram = new Program(cfg); // 如果有保存记录

      if (saveData && saveData.CPSave) {
        _this.childProgram.load(saveData.CPSave);
      } // 节点渲染扩展


      _this.hooks.add('node-render', function (_ref) {
        var expand = _ref.expand,
            state = _ref.state;
        expand.push( /*#__PURE__*/React__default["default"].createElement("button", {
          key: "child-program-button",
          onClick: function onClick() {
            state.map.container.pushProgram(_this.childProgram);
          }
        }, "\u7F16\u8F91\u7A0B\u5E8F"));
      }); // 保存扩展


      _this.hooks.add('node-save', function (_ref2) {
        var saveData = _ref2.saveData;
        saveData.CPSave = _this.childProgram.save();
      }); // 初始化时更新输入输出


      _this.loadChildDefine();

      _this.childProgram.hooks.add('map-add-node', _this.loadChildDefine.bind(_assertThisInitialized__default["default"](_this)));

      _this.childProgram.hooks.add('map-remove-node', _this.loadChildDefine.bind(_assertThisInitialized__default["default"](_this)));

      return _this;
    }
    /** @type {Program} 运行在子节点中的程序 */


    _createClass__default["default"](ChildProgram, [{
      key: "run",
      value:
      /** 运行一次程序 */
      function () {
        var _run = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(props) {
          var outputs, inputs, worker, re;
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  outputs = this.childProgram.nodes.filter(function (node) {
                    return node.type === 'child-program-output';
                  });
                  inputs = this.childProgram.nodes.filter(function (node) {
                    return node.type === 'child-program-input';
                  });
                  inputs.forEach(function (node) {
                    node.inputData = props[node.uid];
                  });
                  worker = new BluePrintWorker(outputs[0]);
                  _context.next = 6;
                  return worker.run();

                case 6:
                  re = {};
                  outputs.forEach(function (node) {
                    re[node.uid] = node.outputData;
                  });
                  console.log(props, re);
                  return _context.abrupt("return", re);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function run(_x) {
          return _run.apply(this, arguments);
        }

        return run;
      }()
      /** 根据当前的图情况重新生成定义 */

    }, {
      key: "loadChildDefine",
      value: function loadChildDefine() {
        var inputDefine = {};
        var outputDefine = {};
        this.childProgram.nodes.forEach(function (node) {
          if (node.type === 'child-program-input') {
            inputDefine[node.uid] = {
              name: node.attrs.forms.name,
              type: null
            };
          }

          if (node.type === 'child-program-output') {
            outputDefine[node.uid] = {
              name: node.attrs.forms.name,
              type: null
            };
          }
        });
        this.define.inputs = inputDefine;
        this.define.outputs = outputDefine;
        this.setDefine(this.define);
      }
    }]);

    return ChildProgram;
  }(BluePrintNode);
  /**
   * 子程序中常用的功能
   * @param {Program} program 要增加功能的蓝图子程序
   */

  _defineProperty__default["default"](ChildProgram, "menu", '基础/子程序');

  var PluginChildProgramBaseFunction = function PluginChildProgramBaseFunction(program) {
    program.hooks.add('map-contextmenu', function (_ref3) {
      var menuData = _ref3.menuData,
          state = _ref3.state;
      menuData.push(['返回上层', function () {
        state.container.popProgram();
      }]);
    });
    program.addModule('child-program-input', ChildProgramInput);
    program.addModule('child-program-output', ChildProgramOutput);
  };
  /** 子程序输入 */


  var ChildProgramInput = /*#__PURE__*/function (_BluePrintNode2) {
    _inherits__default["default"](ChildProgramInput, _BluePrintNode2);

    var _super2 = _createSuper(ChildProgramInput);

    function ChildProgramInput() {
      var _this2;

      _classCallCheck__default["default"](this, ChildProgramInput);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2 = _super2.call.apply(_super2, [this].concat(args));

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this2), "inputData", void 0);

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this2), "define", _this2.$define({
        name: '子程序输入',
        inputs: {
          'name': {
            name: '输入名称',
            "default": '无名输入',
            type: 'string'
          }
        },
        outputs: {
          'in': {
            "default": true,
            type: null,
            name: '输入内容'
          }
        }
      }));

      return _this2;
    }

    _createClass__default["default"](ChildProgramInput, [{
      key: "run",
      value: function run() {
        return this.inputData;
      }
    }]);

    return ChildProgramInput;
  }(BluePrintNode);
  /** 子程序输出 */


  _defineProperty__default["default"](ChildProgramInput, "menu", '子程序/输入');

  var ChildProgramOutput = /*#__PURE__*/function (_BluePrintNode3) {
    _inherits__default["default"](ChildProgramOutput, _BluePrintNode3);

    var _super3 = _createSuper(ChildProgramOutput);

    function ChildProgramOutput() {
      var _this3;

      _classCallCheck__default["default"](this, ChildProgramOutput);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this3 = _super3.call.apply(_super3, [this].concat(args));

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this3), "outputData", void 0);

      _defineProperty__default["default"](_assertThisInitialized__default["default"](_this3), "define", _this3.$define({
        name: '子程序输出',
        inputs: {
          'name': {
            name: '输出名称',
            "default": '无名输出',
            type: 'string'
          },
          'out': {
            type: null,
            name: '输出内容'
          }
        }
      }));

      return _this3;
    }

    _createClass__default["default"](ChildProgramOutput, [{
      key: "run",
      value: function run(props) {
        this.outputData = props.out;
      }
    }]);

    return ChildProgramOutput;
  }(BluePrintNode);

  _defineProperty__default["default"](ChildProgramOutput, "menu", '子程序/输出');

  /**
   * 判断一个节点是否是另一个节点的子节点
   * @param {HTMLElement} par 要判断的父节点
   * @param {HTMLElement} child 要判断的子节点
   * @returns {boolean}
   */
  var isChild = function isChild(par, child) {
    var now = child;

    while (now && now.parentNode && now.parentNode != null) {
      if (now === par || now.parentNode === par) {
        return true;
      }

      now = now.parentNode;
    }

    return false;
  };

  var css_248z$3 = ".contextmenu_Menu__MOms6 {\n  user-select: none;\n  position: fixed;\n  background-color: #181818;\n  border: 1px solid #353535;\n  box-shadow: 0px 0px 0px 1px #181818;\n  border-radius: 4px;\n}\n.contextmenu_Menu__MOms6 > .contextmenu_text__we06n {\n  padding: 1px 5px;\n  color: #777;\n}\n.contextmenu_Menu__MOms6 > .contextmenu_item__u2JvK {\n  padding: 1px 15px;\n  font-size: 10px;\n  color: #f4f4f4;\n  margin: 1px;\n  border-radius: 4px;\n}\n.contextmenu_Menu__MOms6 > .contextmenu_item__u2JvK:hover {\n  background-color: #4772B3;\n}\n";
  var Styles$3 = {"Menu":"contextmenu_Menu__MOms6","text":"contextmenu_text__we06n","item":"contextmenu_item__u2JvK"};
  styleInject(css_248z$3);

  var _class$3, _descriptor$3, _descriptor2$3, _descriptor3$2, _descriptor4$2;

  var useContextMenuConfig = /*#__PURE__*/function () {
    function useContextMenuConfig() {
      _classCallCheck__default["default"](this, useContextMenuConfig);

      _defineProperty__default["default"](this, "ref", void 0);
    }

    _createClass__default["default"](useContextMenuConfig, [{
      key: "menuData",
      value:
      /** 菜单数据，返回要创建的菜单的数据 */
      function () {
        var _menuData = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function menuData() {
          return _menuData.apply(this, arguments);
        }

        return menuData;
      }()
    }]);

    return useContextMenuConfig;
  }();
  /**
   * 绑定右键菜单
   * @param {useContextMenuConfig} cfg hooks参数
   */


  var useContextMenu = function useContextMenu(cfg) {
    // 初始化菜单
    React.useEffect(function () {
      var config = new useContextMenuConfig();

      for (var i in cfg) {
        config[i] = cfg[i];
      }
      /** 按下起点 */


      var sp = null; // 事件侦听

      config.ref.current.addEventListener('mousedown', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(e) {
          return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  sp = {
                    x: e.x,
                    y: e.y
                  };

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()); // 事件侦听

      config.ref.current.addEventListener('mouseup', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(e) {
          var menuData;
          return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(sp == null)) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt("return");

                case 2:
                  if (!(sp.x !== e.x || sp.y !== e.y)) {
                    _context3.next = 5;
                    break;
                  }

                  sp = null;
                  return _context3.abrupt("return");

                case 5:
                  sp = null;
                  lastEvent = e;
                  _context3.next = 9;
                  return initMenu();

                case 9:
                  e.preventDefault();
                  _context3.next = 12;
                  return config.menuData();

                case 12:
                  menuData = _context3.sent;
                  globalState.x = e.x;
                  globalState.y = e.y;
                  globalState.menus = menuData;
                  globalState.subState = null;

                case 17:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    }, []);
  }; // =======================菜单组件的实现===========================

  /** @type {ContextMenuState} 全局公用菜单状态 */

  var globalState;
  /** @type {HTMLElement} 全局公用容器 */

  var globalDiv;
  /** @type {MouseEvent} 最后的右键点击事件 */

  var lastEvent;
  /** 初始化菜单 */

  var initMenu = function initMenu() {
    if (globalState != null) return;
    return new Promise(function (next) {
      /** 全局公用菜单容器 */
      globalDiv = document.createElement('div');

      globalDiv.oncontextmenu = function (e) {
        e.preventDefault();
      };

      document.body.appendChild(globalDiv); // 初始化全局状态

      globalState = new ContextMenuState(); // 渲染全局菜单

      ReactDOM__default["default"].render( /*#__PURE__*/React__default["default"].createElement(ContextMenu, {
        state: globalState
      }), globalDiv, next);
    });
  };
  /** 菜单组件 */


  var ContextMenu = function ContextMenu(props) {
    /** @type {ContextMenuState} 当前菜单的状态 */
    var state = props.state;
    var ref = React.useRef(); // 全局点击侦听

    React.useEffect(function () {
      // 仅根组件侦听
      if (state !== globalState) return; // 点击其他位置关闭菜单

      var click = function click(e) {
        if (!isChild(globalDiv, e.target)) {
          state.menus = null;
        }
      };

      document.addEventListener('click', click); // 释放功能

      return function () {
        document.removeEventListener('click', click);
      };
    });
    return mobxReact.useObserver(function () {
      // 没内容不显示
      if (state.menus == null || state.menus.length === 0) {
        return /*#__PURE__*/React__default["default"].createElement("div", null);
      }
      /** 样式 */


      var style = {
        left: state.x + 'px',
        top: state.y + 'px'
      }; // 处理选项

      var items = state.menus.map(function (item, index) {
        // 如果是字符串
        if (typeof item === 'string') {
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: Styles$3.text,
            key: index
          }, item);
        } // 非数组过滤


        if (!Array.isArray(item)) return; // 如果是回调选项

        if (item.length < 2 || typeof item[1] === 'function') {
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: Styles$3.item,
            key: index,
            onClick: item.length > 1 ? function () {
              globalState.menus = null;
              item[1]({
                event: lastEvent
              });
            } : null,
            onMouseOver: function onMouseOver(e) {
              state.subState = null;
            }
          }, item[0]);
        } // 如果是子选项


        if (Array.isArray(item[1])) {
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: Styles$3.item,
            key: index,
            onMouseOver: function onMouseOver(e) {
              var subState = new ContextMenuState();
              subState.x = state.x + ref.current.offsetWidth;
              subState.y = state.y + e.target.offsetTop;
              subState.menus = item[1];
              state.subState = subState;
            }
          }, item[0]);
        }
      }); // 子菜单生成

      var subMenu = null;

      if (state.subState) {
        subMenu = /*#__PURE__*/React__default["default"].createElement(ContextMenu, {
          state: state.subState
        });
      }

      if (state === globalState) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: ref,
          style: style,
          className: Styles$3.Menu
        }, items, subMenu);
      } else {
        return /*#__PURE__*/ReactDOM__default["default"].createPortal( /*#__PURE__*/React__default["default"].createElement("div", {
          ref: ref,
          style: style,
          className: Styles$3.Menu
        }, items, subMenu), globalDiv);
      }
    });
  };
  /** 右键菜单状态 */


  var ContextMenuState = (_class$3 = /*#__PURE__*/_createClass__default["default"](function ContextMenuState() {
    _classCallCheck__default["default"](this, ContextMenuState);

    _initializerDefineProperty__default["default"](this, "x", _descriptor$3, this);

    _initializerDefineProperty__default["default"](this, "y", _descriptor2$3, this);

    _initializerDefineProperty__default["default"](this, "menus", _descriptor3$2, this);

    _initializerDefineProperty__default["default"](this, "subState", _descriptor4$2, this);

    mobx.makeObservable(this);
  }
  /** 菜单位置 */
  ), (_descriptor$3 = _applyDecoratedDescriptor__default["default"](_class$3.prototype, "x", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return 0;
    }
  }), _descriptor2$3 = _applyDecoratedDescriptor__default["default"](_class$3.prototype, "y", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return 0;
    }
  }), _descriptor3$2 = _applyDecoratedDescriptor__default["default"](_class$3.prototype, "menus", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor4$2 = _applyDecoratedDescriptor__default["default"](_class$3.prototype, "subState", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class$3);

  var MouseDragArgs = /*#__PURE__*/_createClass__default["default"](function MouseDragArgs() {
    _classCallCheck__default["default"](this, MouseDragArgs);

    _defineProperty__default["default"](this, "position", null);

    _defineProperty__default["default"](this, "onmousedown", null);

    _defineProperty__default["default"](this, "onmousemove", null);

    _defineProperty__default["default"](this, "onmouseup", null);

    _defineProperty__default["default"](this, "callback", null);

    _defineProperty__default["default"](this, "reverse", false);

    _defineProperty__default["default"](this, "scale", 1);

    _defineProperty__default["default"](this, "button", 0);

    _defineProperty__default["default"](this, "ref", null);
  });
  /**
   * 添加一个鼠标拖动功能
   * @param {MouseDragArgs} cfg 功能参数
   */


  var useMouseDrag = function useMouseDrag() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ref = cfg.ref || React.useRef(); // 绑定事件

    React.useEffect(function () {
      /** 当前功能配置 */
      var config = new MouseDragArgs();

      for (var i in cfg) {
        config[i] = cfg[i];
      }
      /** 当前的状态是否按下 */


      var isd = false;
      var lx, ly; // 鼠标按下

      ref.current.addEventListener('mousedown', function (e) {
        // 限制按键
        if (e.button !== config.button) return;
        isd = true;
        lx = e.x;
        ly = e.y;

        if (config.onmousedown) {
          config.onmousedown(e);
        }
      }); // 鼠标移动

      var mousemove = function mousemove(e) {
        if (!isd) return;
        var cx = (e.x - lx) * config.scale;
        var cy = (e.y - ly) * config.scale; // 如果逆转

        if (config.reverse) {
          cx = -cx;
          cy = -cy;
        }
        /** 如果直接赋值 */


        if (config.position) {
          config.position.x += cx;
          config.position.y += cy;
        } // 如果回调函数处理


        if (config.callback) {
          config.callback({
            x: cx,
            y: cy
          });
        }

        if (config.onmousemove) {
          config.onmousemove(e);
        }

        lx = e.x;
        ly = e.y;
      };

      document.addEventListener('mousemove', mousemove); // 鼠标放开

      var mouseup = function mouseup(e) {
        if (!isd) return;
        isd = false;

        if (config.onmouseup) {
          config.onmouseup(e);
        }
      };

      document.addEventListener('mouseup', mouseup); // 析构处理

      return function () {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      };
    }, []);
    return ref;
  };
  /**
   * 侦听全局事件
   * @param {keyof DocumentEventMap} event 要侦听的事件
   * @param {(e:MouseEvent|KeyboardEvent)=>{}} callback 回调函数
   * @param {HTMLElement} target 要侦听的目标
   */

  var useDomEvent = function useDomEvent(event, callback) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
    React.useEffect(function () {
      if (target.current) target = target.current;
      target.addEventListener(event, callback);
      return function () {
        target.removeEventListener(event, callback);
      };
    }, []);
  };

  var _class$2, _descriptor$2, _descriptor2$2;
  /** 容器的 */

  var StoreContainer = (_class$2 = /*#__PURE__*/function () {
    /**
     * @param {Program} program 要初始化使用的程序
     */
    function StoreContainer(program) {
      _classCallCheck__default["default"](this, StoreContainer);

      _initializerDefineProperty__default["default"](this, "activeMap", _descriptor$2, this);

      _initializerDefineProperty__default["default"](this, "mapStack", _descriptor2$2, this);

      mobx.makeObservable(this);
      this.mapStack.push(new StoreMap(program, this));
      this.activeMap = this.mapStack[0];
    }
    /** @type {StoreMap} 当前使用的图状态 */


    _createClass__default["default"](StoreContainer, [{
      key: "pushProgram",
      value:
      /**
       * 向容器的栈中推入新的程序
       * @param {*} program 要推入的程序
       */
      function pushProgram(program) {
        this.mapStack.push(new StoreMap(program, this));
        this.activeMap = this.mapStack[this.mapStack.length - 1];
      }
      /**
       * 从程序的栈中取出程序
       */

    }, {
      key: "popProgram",
      value: function popProgram() {
        if (this.mapStack.length > 1) {
          this.mapStack.splice(this.mapStack.length - 1, 1);
        }

        this.activeMap = this.mapStack[this.mapStack.length - 1];
      }
    }]);

    return StoreContainer;
  }(), (_descriptor$2 = _applyDecoratedDescriptor__default["default"](_class$2.prototype, "activeMap", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2$2 = _applyDecoratedDescriptor__default["default"](_class$2.prototype, "mapStack", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return [];
    }
  }), _applyDecoratedDescriptor__default["default"](_class$2.prototype, "pushProgram", [mobx.action], Object.getOwnPropertyDescriptor(_class$2.prototype, "pushProgram"), _class$2.prototype), _applyDecoratedDescriptor__default["default"](_class$2.prototype, "popProgram", [mobx.action], Object.getOwnPropertyDescriptor(_class$2.prototype, "popProgram"), _class$2.prototype)), _class$2);

  var _class$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6$1, _descriptor7$1, _descriptor8$1, _descriptor9$1, _class3, _descriptor10$1, _descriptor11, _descriptor12, _class5, _descriptor13, _descriptor14;
  /** 单个节点的状态 */

  var StoreNode = (_class$1 = /*#__PURE__*/function () {
    /**
     * @param {BluePrintNode} node
     * @param {StoreMap} map
     */
    function StoreNode(node, map) {
      var _this = this;

      _classCallCheck__default["default"](this, StoreNode);

      _defineProperty__default["default"](this, "map", void 0);

      _defineProperty__default["default"](this, "uid", '');

      _initializerDefineProperty__default["default"](this, "isSelect", _descriptor$1, this);

      _initializerDefineProperty__default["default"](this, "x", _descriptor2$1, this);

      _initializerDefineProperty__default["default"](this, "y", _descriptor3$1, this);

      _initializerDefineProperty__default["default"](this, "isClose", _descriptor4$1, this);

      _initializerDefineProperty__default["default"](this, "define", _descriptor5$1, this);

      _initializerDefineProperty__default["default"](this, "node", _descriptor6$1, this);

      _initializerDefineProperty__default["default"](this, "inputs", _descriptor7$1, this);

      _initializerDefineProperty__default["default"](this, "outputs", _descriptor8$1, this);

      _initializerDefineProperty__default["default"](this, "color", _descriptor9$1, this);

      this.map = map;
      this.node = node;
      this.uid = node.uid;
      this.x = node.attrs.x || 0;
      this.y = node.attrs.y || 0;
      this.define = node.define;
      this.isClose = node.attrs.isClose;
      mobx.makeObservable(this); // 初始化处理

      this.updateDefine(); // 关联处理

      var updateLink = function updateLink(e) {
        if (e && e.key) {
          _this.inputs[e.key].updateLinks();
        } else {
          for (var i in _this.inputs) {
            _this.inputs[i].updateLinks();
          }
        }
      };

      node.hooks.add('node-set-link', updateLink);
      node.hooks.add('node-delete-link', updateLink); // 更新定义处理

      node.hooks.add('node-update-define', function () {
        _this.updateDefine();

        updateLink();
      });
    }
    /** @type {StoreMap} 节点所属的图 */


    _createClass__default["default"](StoreNode, [{
      key: "updateDefine",
      value:
      /** 更新定义 */
      function updateDefine() {
        this.define = this.node.define;
        this.color = this.define.color;
        this.inputs = {};

        for (var i in this.define.inputs) {
          this.inputs[i] = new StoreInput(this, i);
        }

        this.outputs = {};

        for (var i in this.define.outputs) {
          this.outputs[i] = new StoreOutput(this, i);
        }
      }
      /** 获取关联数据集 */

    }, {
      key: "getLinks",
      value: function getLinks() {
        var re = [];

        for (var i in this.inputs) {
          re.push(this.inputs[i].links);
        }

        return re;
      }
      /**
       * 设置是否收起
       * @param {boolean} close 是否收起
       */

    }, {
      key: "setClose",
      value: function setClose(close) {
        this.node.attrs.isClose = this.isClose = close;
      }
    }]);

    return StoreNode;
  }(), (_descriptor$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "isSelect", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor2$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "x", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return 0;
    }
  }), _descriptor3$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "y", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return 0;
    }
  }), _descriptor4$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "isClose", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor5$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "define", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor6$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "node", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "inputs", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor8$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "outputs", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor9$1 = _applyDecoratedDescriptor__default["default"](_class$1.prototype, "color", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return '#17487a';
    }
  }), _applyDecoratedDescriptor__default["default"](_class$1.prototype, "updateDefine", [mobx.action], Object.getOwnPropertyDescriptor(_class$1.prototype, "updateDefine"), _class$1.prototype)), _class$1);
  /** 输入状态 */

  var StoreInput = (_class3 = /*#__PURE__*/function () {
    /**
     * @param {StoreNode} node 输入所属的节点
     * @param {string} index 输入的下标
     */
    function StoreInput(node, index) {
      _classCallCheck__default["default"](this, StoreInput);

      _defineProperty__default["default"](this, "index", '');

      _defineProperty__default["default"](this, "node", void 0);

      _initializerDefineProperty__default["default"](this, "define", _descriptor10$1, this);

      _initializerDefineProperty__default["default"](this, "pos", _descriptor11, this);

      _initializerDefineProperty__default["default"](this, "links", _descriptor12, this);

      mobx.makeObservable(this);
      this.index = index;
      this.node = node;
      this.define = node.define.inputs[index] || {};
      this.updateLinks();
    }
    /** 下标 */


    _createClass__default["default"](StoreInput, [{
      key: "linkToActionPointer",
      value:
      /**
       * 让当前节点主动连接正在操作的连接点
       */
      function linkToActionPointer() {
        var pointer = this.node.map.actionPointer; // 如果没有正在操作的连接点则跳过

        if (pointer == null || pointer.type !== 'output') return; // 如果无效关联则跳过

        if (!PointerCanLink(pointer.node.define.outputs[pointer.key], this.define)) return; // 增加关联

        this.node.node.addLink(this.index, {
          uid: pointer.node.uid,
          key: pointer.key
        }); // 增加关联
        // this.node.node.attrs.links[this.index] = { uid: pointer.node.uid, key: pointer.key };
      }
      /** 当前的关联项集合 */

    }, {
      key: "updateLinks",
      value:
      /** 同步当前输入的关联项 */
      function updateLinks() {
        var _this2 = this;

        var re = [];
        this.node.node.links(this.index).forEach(function (out, index) {
          re.push({
            /** 起点获取方法 */
            ps: function ps() {
              var node = _this2.node.map.nodes.find(function (node) {
                return node.uid === out.uid;
              });

              if (node == null) return null;
              return node.outputs[out.key].pos;
            },

            /** 终点位置 */
            pe: function pe() {
              return _this2.pos;
            },

            /** 唯一key */
            key: _this2.node.uid + ':' + _this2.index + ':' + out.uid + ':' + out.key,

            /** 删除关联的处理方法 */
            "delete": function _delete() {
              _this2.node.node.deleteLink(_this2.index, index); // TODO:暂时使用这种方案刷新


              _this2.pos.x += 0.00001 * (Math.random() - 0.5);
            }
          });
        });
        this.links = re;
      }
    }]);

    return StoreInput;
  }(), (_descriptor10$1 = _applyDecoratedDescriptor__default["default"](_class3.prototype, "define", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor11 = _applyDecoratedDescriptor__default["default"](_class3.prototype, "pos", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {
        x: 0,
        y: 0
      };
    }
  }), _applyDecoratedDescriptor__default["default"](_class3.prototype, "linkToActionPointer", [mobx.action], Object.getOwnPropertyDescriptor(_class3.prototype, "linkToActionPointer"), _class3.prototype), _descriptor12 = _applyDecoratedDescriptor__default["default"](_class3.prototype, "links", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return [];
    }
  })), _class3);
  /** 输出状态 */

  var StoreOutput = (_class5 = /*#__PURE__*/_createClass__default["default"](
  /**
   * @param {StoreNode} node 输出所属的节点
   * @param {string} index 输出的下标
   */
  function StoreOutput(node, index) {
    _classCallCheck__default["default"](this, StoreOutput);

    _defineProperty__default["default"](this, "index", '');

    _defineProperty__default["default"](this, "node", void 0);

    _initializerDefineProperty__default["default"](this, "define", _descriptor13, this);

    _initializerDefineProperty__default["default"](this, "pos", _descriptor14, this);

    mobx.makeObservable(this);
    this.index = index;
    this.node = node;
    this.define = node.define.outputs[index] || {};
  }
  /** 下标 */
  ), (_descriptor13 = _applyDecoratedDescriptor__default["default"](_class5.prototype, "define", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor14 = _applyDecoratedDescriptor__default["default"](_class5.prototype, "pos", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {
        x: 0,
        y: 0
      };
    }
  })), _class5);

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
  /** 一个拓扑图的状态 */

  var StoreMap = (_class = /*#__PURE__*/function () {
    /**
     * @param {Program} program
     * @param {StoreContainer} container
     */
    function StoreMap(program, container) {
      var _this = this;

      _classCallCheck__default["default"](this, StoreMap);

      _initializerDefineProperty__default["default"](this, "refOrigin", _descriptor, this);

      _initializerDefineProperty__default["default"](this, "viewSize", _descriptor2, this);

      _initializerDefineProperty__default["default"](this, "viewOrigin", _descriptor3, this);

      _initializerDefineProperty__default["default"](this, "mousePosition", _descriptor4, this);

      _initializerDefineProperty__default["default"](this, "container", _descriptor5, this);

      _initializerDefineProperty__default["default"](this, "nodes", _descriptor6, this);

      _initializerDefineProperty__default["default"](this, "program", _descriptor7, this);

      _initializerDefineProperty__default["default"](this, "position", _descriptor8, this);

      _initializerDefineProperty__default["default"](this, "scale", _descriptor9, this);

      _initializerDefineProperty__default["default"](this, "actionPointer", _descriptor10, this);

      this.program = program;
      this.container = container;
      mobx.makeObservable(this); // 缩放限制

      mobx.intercept(this, 'scale', function (e) {
        var val = e.newValue;
        val = Number(val);

        if (Number.isNaN(val)) {
          val = 1;
        }

        if (val < 0.4) {
          val = 0.4;
        }

        if (val > 2.5) {
          val = 2.5;
        }

        e.newValue = val;
        return e;
      }); // ======初始化数据======
      // 节点

      for (var i in program.nodes) {
        this.nodes.push(new StoreNode(program.nodes[i], this));
      } // 节点变化侦听


      program.hooks.add('map-add-node', function (e) {
        _this.nodes.push(new StoreNode(e.node, _this));
      }); // 节点变化侦听

      program.hooks.add('map-remove-node', function (e) {
        _this.nodes.splice(_this.nodes.findIndex(function (i) {
          return i.uid === e.node.uid;
        }), 1);
      });
    }
    /** @type {HTMLDivElement} 节点原点节点 */


    _createClass__default["default"](StoreMap, [{
      key: "mouse2view",
      value:
      /**
       * 屏幕坐标转换为视图坐标
       * @param {{x:number,y:number}} pos 要转换的屏幕坐标
       * @returns
       */
      function mouse2view(pos) {
        return {
          x: (pos.x - this.viewOrigin.x) / this.scale,
          y: (pos.y - this.viewOrigin.y) / this.scale
        };
      }
      /**
       * 获取指定真实节点在图中的视图坐标位置
       * @param {HTMLElement} dom 要获取坐标的节点
       */

    }, {
      key: "getDomViewPosition",
      value: function getDomViewPosition(dom) {
        var now = dom;
        var re = {
          x: 0,
          y: 0
        };

        while (now != null && now !== document) {
          re.x += now.offsetLeft;
          re.y += now.offsetTop;
          now = now.parentNode;

          if (now === this.refOrigin) {
            return re;
          }
        }

        return re;
      }
      /**
       * 进行选中处理的节点表
       * @param {StoreNode[]} nodes 要进行选中处理的节点表
       * @param {0|1|2} mode 选中模式 0 直接选择 1 反选 2 附加
       */

    }, {
      key: "selectNode",
      value: function selectNode(nodes) {
        var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // 循环处理所有节点
        this.nodes.forEach(function (node) {
          if (mode === 2) {
            // 附加
            if (nodes.includes(node)) {
              node.isSelect = true;
            }
          } else if (mode === 1) {
            // 反选
            if (nodes.includes(node)) {
              node.isSelect = !node.isSelect;
            }
          } else {
            // 直接选择
            if (nodes.includes(node)) {
              node.isSelect = true;
            } else {
              node.isSelect = false;
            }
          }
        });
      }
    }]);

    return StoreMap;
  }(), (_descriptor = _applyDecoratedDescriptor__default["default"](_class.prototype, "refOrigin", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor__default["default"](_class.prototype, "viewSize", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {
        width: 0,
        height: 0
      };
    }
  }), _descriptor3 = _applyDecoratedDescriptor__default["default"](_class.prototype, "viewOrigin", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {
        x: 0,
        y: 0
      };
    }
  }), _descriptor4 = _applyDecoratedDescriptor__default["default"](_class.prototype, "mousePosition", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {
        x: 0,
        y: 0
      };
    }
  }), _descriptor5 = _applyDecoratedDescriptor__default["default"](_class.prototype, "container", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor__default["default"](_class.prototype, "nodes", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor7 = _applyDecoratedDescriptor__default["default"](_class.prototype, "program", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor__default["default"](_class.prototype, "position", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {
        x: 0,
        y: 0
      };
    }
  }), _descriptor9 = _applyDecoratedDescriptor__default["default"](_class.prototype, "scale", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return 1;
    }
  }), _descriptor10 = _applyDecoratedDescriptor__default["default"](_class.prototype, "actionPointer", [mobx.observable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);

  /**
   * 启用图的右键菜单插件
   * @param {*} ref 图根节点指针
   * @param {StoreMap} state 蓝图程序实例
   */

  var usePluginMapMenu = function usePluginMapMenu(ref, state) {
    // 右键菜单功能
    useContextMenu({
      ref: ref,
      menuData: function () {
        var _menuData = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
          var createNodeMenu;
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  createNodeMenu = getCreateNodeMenu(state);
                  _context.next = 3;
                  return state.program.hooks.trigger('map-contextmenu', {
                    state: state,
                    program: state.program,
                    menuData: [['创建节点', createNodeMenu]]
                  });

                case 3:
                  return _context.abrupt("return", _context.sent.menuData);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function menuData() {
          return _menuData.apply(this, arguments);
        }

        return menuData;
      }()
    });
  };
  /**
   * 获取创建节点的菜单
   * @param {StoreMap} state
   */

  var getCreateNodeMenu = function getCreateNodeMenu(state) {
    var program = state.program;
    /** 菜单的映射表 */

    var menuMap = {}; // 循环写入映射表

    for (var i in program.modules) {
      var module = program.modules[i]; // 层级处理

      var menu = (module.menu || module.name).split('/');
      var menuItem = menuMap;
      menu.forEach(function (item, index) {
        if (index < menu.length - 1) {
          menuItem[item] = menuItem[item] || {};
          menuItem = menuItem[item];
        } else {
          // 回调方法
          menuItem[item] = createNodeCallback(module, state);
        }
      });
    }

    return mapToList(menuMap);
  };
  /** 将映射表转换为列表 */


  var mapToList = function mapToList(map) {
    var list = [];

    for (var i in map) {
      if (_typeof__default["default"](map[i]) === 'object') {
        list.push([i, mapToList(map[i])]);
      } else {
        list.push([i, map[i]]);
      }
    }

    return list;
  };
  /**
   * 创建节点回调
   * @param {*} Module
   * @param {StoreMap} state
   * @returns
   */


  var createNodeCallback = function createNodeCallback(Module, state) {
    return function (_ref) {
      var event = _ref.event;
      var node = new Module(state.program);
      var pos = state.mouse2view(event);
      node.attrs.x = pos.x;
      node.attrs.y = pos.y;
      state.program.addNode(node);
    };
  };

  /**
   * 编辑器情况下需要使用的扩展逻辑
   * @param {import("../../main").BluePrintProgram} program 蓝图程序实例
   */

  var PluginEditor = function PluginEditor(program) {
    // 拓扑图编辑器渲染扩展
    program.hooks.add('map-render', function (_ref) {
      _ref.ref;
          var state = _ref.state,
          refBG = _ref.refBG;
      // 绑定鼠标拖动功能
      useMouseDrag({
        callback: function callback(e) {
          state.position.x += e.x / state.scale;
          state.position.y += e.y / state.scale;
        },
        ref: refBG
      });
      useMouseDrag({
        button: 2,
        onmousedown: function onmousedown(e) {},
        onmousemove: function onmousemove(e) {},
        ref: refBG
      }); // 右键菜单功能

      usePluginMapMenu(refBG, state); // 鼠标滚轮功能

      useDomEvent('wheel', function (e) {
        if (e.deltaY > 0) {
          state.scale /= 1.08;
        } else {
          state.scale *= 1.08;
        }
      }, refBG);
    }); // 单个节点渲染功能扩展

    program.hooks.add('node-render', function (_ref2) {
      var refTitle = _ref2.refTitle,
          state = _ref2.state,
          render = _ref2.render;
      // 鼠标是否有拖动
      var mouseMoveEnd = false; // 绑定鼠标拖动功能

      useMouseDrag({
        onmousedown: function onmousedown(e) {
          mouseMoveEnd = false;
        },
        onmouseup: function onmouseup(e) {
          if (mouseMoveEnd === true) {
            return;
          }

          var mode = 0;

          if (e.ctrlKey) {
            mode = 1;
          }

          if (e.shiftKey) {
            mode = 2;
          }

          state.map.selectNode([state], mode);
        },
        callback: function callback(e) {
          mouseMoveEnd = true;
          var useNodes = state.map.nodes.filter(function (node) {
            return node.isSelect;
          });

          if (!useNodes.includes(state)) {
            useNodes = [state];
          }

          useNodes.forEach(function (node) {
            node.x += e.x / state.map.scale;
            node.y += e.y / state.map.scale;
            node.node.attrs.x = node.x;
            node.node.attrs.y = node.y;
          });
        },
        ref: refTitle
      }); // 绑定鼠标右键功能

      useContextMenu({
        ref: refTitle,
        menuData: function menuData() {
          var menuData = [['修改名称', function () {
            var name = prompt('请输入要修改的名称', state.node.getNodeName());
            state.node.attrs.name = name;
            render();
          }], ['删除节点', function () {
            if (state.isSelect) {
              for (var i = state.map.nodes.length - 1; i >= 0; i--) {
                if (state.map.nodes[i].isSelect) {
                  state.node.program.removeNode(state.map.nodes[i].node);
                }
              }
            } else {
              state.node.program.removeNode(state.node);
            }
          }]];
          state.node.hooks.trigger('node-contextmenu', {
            node: state.node,
            menuData: menuData
          });
          return menuData;
        }
      });
    });
  };
  /**
   * 编辑器下组件内输入参数扩展
   * @param {Program} program 蓝图程序实例
   */

  var PluginEditorInnerInput = function PluginEditorInnerInput(program) {
    program.hooks.add('node-render-input', function (_ref3) {
      var state = _ref3.state,
          node = _ref3.node,
          expand = _ref3.expand,
          render = _ref3.render;
      // 多输入不支持内联输入参数
      if (state.define.many === true) return; // 获取类型

      var type = node.program.types[state.define.type]; // 非空判断

      if (type == null) return; // 如果类型包含输入组件则渲染输入组件

      if (type.inputModule) {
        expand.push(type.inputModule(node.attrs.forms[state.index], function (val) {
          node.attrs.forms[state.index] = val;
          node.hooks.trigger('node-forms-update', {
            node: node,
            key: state.index,
            value: val
          });
          render({});
        }, state.define));
      }
    });
  };

  var css_248z$2 = ".map-top-menu_Menu__0qbH8 {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  height: 32px;\n  background-color: #3f3f3f;\n  border-bottom: 1px solid #000;\n  display: flex;\n}\n.map-top-menu_Menu__0qbH8 > .map-top-menu_Stack__dxPx5 {\n  flex: 1;\n}\n.map-top-menu_Menu__0qbH8 > .map-top-menu_Buttons__uswrs {\n  padding: 0px 1px;\n}\n.map-top-menu_Menu__0qbH8 > .map-top-menu_Buttons__uswrs > button {\n  height: 24px;\n  margin: 4px;\n  min-width: 25px;\n  background-color: #555;\n  border: 1px solid #000;\n  color: #fff;\n  cursor: pointer;\n  border-radius: 3px;\n}\n";
  var Styles$2 = {"Menu":"map-top-menu_Menu__0qbH8","Stack":"map-top-menu_Stack__dxPx5","Buttons":"map-top-menu_Buttons__uswrs"};
  styleInject(css_248z$2);

  /**
   * 编辑器下组件内输入参数扩展
   * @param {import("../../main").Program} program 蓝图程序实例
   */

  var PluginTopMenu = function PluginTopMenu(program) {
    program.hooks.add('map-render', function (_ref) {
      var expand = _ref.expand,
          state = _ref.state;
      expand.push( /*#__PURE__*/React__default["default"].createElement(Menu, {
        key: "map-top-menu",
        state: state
      }));
    });
  };
  /**
   * 顶部菜单组件
   * @param {{state:StoreMap}} props
   * @returns
   */

  var Menu = function Menu(props) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: Styles$2.Menu
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: Styles$2.Types
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: Styles$2.Stack
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: Styles$2.Buttons
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: function onClick(e) {
        props.state.scale /= 1.08;
      }
    }, "-"), /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: function onClick(e) {
        props.state.scale *= 1.08;
      }
    }, "+")));
  };

  /** 单个拓扑图的上下文 */

  var MapContext = /*#__PURE__*/React__default["default"].createContext({
    /** @type {StoreMap} 整个图的状态 */
    state: null
  });
  /** 单个节点的上下文 */

  var NodeContext = /*#__PURE__*/React__default["default"].createContext({
    /** @type {StoreNode} 单个节点的状态 */
    state: null
  });

  var css_248z$1 = ".ui-node_Node__HEg2f {\n  position: absolute;\n  background-color: #000;\n  border: 1px solid #fff;\n  font-size: 12px;\n  min-width: 120px;\n  border-radius: 4px;\n  border: 1px solid #000;\n  box-shadow: 0px 2px 4px 1px #000;\n}\n.ui-node_Node__HEg2f.ui-node_isSelect__MS0rP {\n  border-color: orange;\n}\n.ui-node_Node__HEg2f > .ui-node_title__ukFgS {\n  background-color: #17487a;\n  border-bottom: 1px solid #101010;\n  color: #ddd;\n  height: 24px;\n  line-height: 24px;\n  overflow: hidden;\n  border-radius: 4px 4px 0px 0px;\n}\n.ui-node_Node__HEg2f > .ui-node_title__ukFgS > .ui-node_switch__-bJn0 {\n  display: inline-block;\n  width: 20px;\n  text-align: center;\n}\n.ui-node_Node__HEg2f > .ui-node_group__fvZPw {\n  position: relative;\n  padding: 3px 0px;\n  background-color: #353535;\n}\n.ui-node_Input__CI9Vb {\n  color: #ddd;\n  position: relative;\n  padding-left: 10px;\n  padding-right: 10px;\n  margin: 2px 0px;\n  min-height: 20px;\n}\n.ui-node_Input__CI9Vb > .ui-node_pointer__QTe5J {\n  width: 12px;\n  height: 12px;\n  background-color: #555555;\n  border: 1px solid #000;\n  border-radius: 100%;\n  position: absolute;\n  left: -6px;\n  top: 3px;\n  cursor: pointer;\n}\n.ui-node_Input__CI9Vb > .ui-node_pointer__QTe5J:hover {\n  border: 1px solid orange;\n}\n.ui-node_Input__CI9Vb > .ui-node_pointer__QTe5J.ui-node_active__3zehd {\n  background-color: orange;\n}\n.ui-node_Input__CI9Vb > .ui-node_pointer__QTe5J.ui-node_hidden__OZHjJ {\n  display: none;\n}\n.ui-node_Output__S05DI {\n  color: #ddd;\n  position: relative;\n  padding-left: 10px;\n  margin: 2px 0px;\n  min-height: 20px;\n  text-align: right;\n  padding-right: 10px;\n  padding-left: 0px;\n}\n.ui-node_Output__S05DI > .ui-node_pointer__QTe5J {\n  width: 12px;\n  height: 12px;\n  background-color: #555555;\n  border: 1px solid #000;\n  border-radius: 100%;\n  position: absolute;\n  left: -6px;\n  top: 3px;\n  cursor: pointer;\n}\n.ui-node_Output__S05DI > .ui-node_pointer__QTe5J:hover {\n  border: 1px solid orange;\n}\n.ui-node_Output__S05DI > .ui-node_pointer__QTe5J.ui-node_active__3zehd {\n  background-color: orange;\n}\n.ui-node_Output__S05DI > .ui-node_pointer__QTe5J.ui-node_hidden__OZHjJ {\n  display: none;\n}\n.ui-node_Output__S05DI > .ui-node_pointer__QTe5J {\n  left: auto;\n  right: -6px;\n}\n";
  var Styles$1 = {"Node":"ui-node_Node__HEg2f","isSelect":"ui-node_isSelect__MS0rP","title":"ui-node_title__ukFgS","switch":"ui-node_switch__-bJn0","group":"ui-node_group__fvZPw","Input":"ui-node_Input__CI9Vb","pointer":"ui-node_pointer__QTe5J","active":"ui-node_active__3zehd","hidden":"ui-node_hidden__OZHjJ","Output":"ui-node_Output__S05DI"};
  styleInject(css_248z$1);

  /**
   * 单个节点组件
   */

  var UINode = /*#__PURE__*/React.memo(function (
  /** @type {{node:StoreNode}} */
  props) {
    // ref初始化
    var ref = React.useRef();
    var refTitle = React.useRef();

    var _useState = React.useState(),
        _useState2 = _slicedToArray__default["default"](_useState, 2),
        _render = _useState2[1];
    /** 当前节点的状态机 */


    var state = props.node;
    /** 节点的额外渲染内容 */

    var expand = []; // 输入节点收起渲染

    var inputs = state.inputs;
    React.useEffect(function () {
      if (state.isClose) {
        for (var key in inputs) {
          inputs[key].pos.x = state.x;
          inputs[key].pos.y = state.y + 12;
        }
      }
    }); // 触发节点渲染

    state.node.hooks.triggerSync('node-render', {
      state: state,
      ref: ref,
      refTitle: refTitle,
      node: state.node,
      expand: expand,
      render: function render() {
        _render({});
      }
    });
    return mobxReact.useObserver(function () {
      /** 节点样式 */
      var style = {
        left: state.x + 'px',
        top: state.y + 'px',
        zIndex: state.isClose ? 0 : 1
      }; // 选中的面板层级增加

      if (state.isSelect) {
        style.zIndex += 2;
      } // 触发节点渲染Observer


      state.node.hooks.triggerSync('node-render-observer', {
        state: state,
        ref: ref,
        refTitle: refTitle,
        node: state.node,
        expand: expand,
        render: function render() {
          _render({});
        }
      }); // 输入节点

      var inputDoms = [];

      if (!state.isClose) {
        for (var key in inputs) {
          inputDoms.push( /*#__PURE__*/React__default["default"].createElement(Input, {
            store: inputs[key],
            key: key
          }));
        }
      } // 输出节点


      var outputs = state.outputs;
      var outputDoms = [];

      for (var key in outputs) {
        outputs[key];
        outputDoms.push( /*#__PURE__*/React__default["default"].createElement(Output, {
          store: outputs[key],
          key: key
        }));
      }

      var classList = [Styles$1.Node];

      if (state.isSelect) {
        classList.push(Styles$1.isSelect);
      }

      return /*#__PURE__*/React__default["default"].createElement(NodeContext.Provider, {
        value: {
          state: state
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        style: style,
        ref: ref,
        className: classList.join(' ')
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        ref: refTitle,
        style: {
          backgroundColor: state.color
        },
        className: Styles$1.title
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1["switch"],
        onClick: function onClick() {
          state.setClose(!state.isClose);
        }
      }, state.isClose ? '+' : '-'), state.node.getNodeName()), /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1.group
      }, expand, inputDoms, outputDoms)));
    });
  });
  /**
   * 输入组件
   * @param {{store:StoreInput}} props
   * @returns
   */

  var Input = function Input(props) {
    /** 全局状态 */
    var state = React.useContext(MapContext).state;
    var store = props.store;

    var _useState3 = React.useState(),
        _useState4 = _slicedToArray__default["default"](_useState3, 2),
        render = _useState4[1];

    var refPointer = React.useRef();
    var ref = React.useRef();
    /** 额外渲染内容 */

    var expand = []; // 触发节点渲染

    store.node.node.hooks.triggerSync('node-render-input', {
      state: store,
      ref: ref,
      refPointer: refPointer,
      expand: expand,
      node: store.node.node,
      render: render
    }); // 更新连接点位置

    React.useEffect(function () {
      var pos = state.getDomViewPosition(refPointer.current);
      pos.x += 6;
      pos.y += 6;
      store.pos.x = pos.x;
      store.pos.y = pos.y;
    });
    return mobxReact.useObserver(function () {
      [state.viewSize.width, state.viewSize.height];
      /** 连接点样式 */

      var pointerClass = [Styles$1.pointer];

      if (state.actionPointer && state.actionPointer.type === 'output') {
        var output = state.actionPointer.node.define.outputs[state.actionPointer.key];

        if (output && PointerCanLink(output, store.define)) {
          pointerClass.push(Styles$1.active);
        }
      }

      if (store.define.disable_link) {
        pointerClass.push(Styles$1.hidden);
      }

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1.Input
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        ref: refPointer,
        className: pointerClass.join(' '),
        onMouseUp: function onMouseUp(e) {
          store.linkToActionPointer();
        }
      }), /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1.group
      }, store.define.name), /*#__PURE__*/React__default["default"].createElement("div", null, expand));
    });
  };
  /**
   * 输出组件
   * @param {{store:StoreOutput,index:string}} props
   * @returns
   */


  var Output = function Output(props) {
    /** 全局状态 */
    var state = React.useContext(MapContext).state;
    var node = React.useContext(NodeContext).state;
    var store = props.store;
    var refPointer = React.useRef(); // 更新连接点位置

    React.useEffect(function () {
      var pos = state.getDomViewPosition(refPointer.current);
      pos.x += 6;
      pos.y += 6;
      store.pos.x = pos.x;
      store.pos.y = pos.y;
    });
    return mobxReact.useObserver(function () {
      [state.viewSize.width, state.viewSize.height];
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1.Output
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1.pointer,
        ref: refPointer,
        onMouseDown: function onMouseDown(e) {
          // 设置活动的连接点
          state.actionPointer = {
            type: 'output',
            node: node,
            key: store.index,
            pos: store.pos
          };
        }
      }), /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles$1.group
      }, store.define.name));
    });
  };

  var css_248z = ".ui-map_Map__dzNDK {\n  user-select: none;\n  width: 100%;\n  height: 100%;\n  background-color: #1d1d1d;\n  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 3.5%, rgba(0, 0, 0, 0) 3.5%), linear-gradient(rgba(255, 255, 255, 0.1) 3.5%, rgba(0, 0, 0, 0) 3.5%);\n  background-size: 40px 40px;\n  position: relative;\n  overflow: hidden;\n}\n.ui-map_Map__dzNDK * {\n  box-sizing: border-box;\n}\n.ui-map_Map__dzNDK > .ui-map_bg__yT5Oa {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  height: 100%;\n  width: 100%;\n}\n.ui-map_Map__dzNDK > .ui-map_nodes__wVazn {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 0;\n}\n.ui-map_Link__ud8XQ {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  left: 0px;\n  top: 0px;\n}\n.ui-map_Link__ud8XQ > svg {\n  width: 100%;\n  height: 100%;\n}\n.ui-map_Link__ud8XQ > svg > g {\n  transform: translate3d(50%, 50%, 0px);\n}\n.ui-map_Link__ud8XQ > svg > g > g > path {\n  fill: none;\n}\n.ui-map_Link__ud8XQ > svg > g > g > path.ui-map_line__jmoIs {\n  stroke: orange;\n  stroke-width: 3px;\n}\n.ui-map_Link__ud8XQ > svg > g > g > path.ui-map_linebg__CFMDV {\n  pointer-events: all;\n  stroke: #000;\n  stroke-width: 6px;\n}\n";
  var Styles = {"Map":"ui-map_Map__dzNDK","bg":"ui-map_bg__yT5Oa","nodes":"ui-map_nodes__wVazn","Link":"ui-map_Link__ud8XQ","line":"ui-map_line__jmoIs","linebg":"ui-map_linebg__CFMDV"};
  styleInject(css_248z);

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  mobx.configure({
    enforceActions: false
  });
  /**
   * 逻辑图编辑组件
   * @param {{store:StoreMap}} props
   * @returns {}
   */

  var UIMap = function UIMap(props) {
    /** 视图的状态 */
    var state = props.store;
    /** 根节点的ref */

    var ref = React.useRef();
    var refBG = React.useRef();
    var refNodes = React.useRef();
    /** 扩展渲染的节点 */

    var expand = [];

    var _useState = React.useState({
      state: state
    }),
        _useState2 = _slicedToArray__default["default"](_useState, 1),
        mapData = _useState2[0]; // 触发渲染钩子


    state.program.hooks.triggerSync('map-render', {
      ref: ref,
      state: state,
      refBG: refBG,
      refNodes: refNodes,
      expand: expand
    }); // 记录原点坐标

    React.useEffect(function () {
      state.refOrigin = refNodes.current;
      var rect = refNodes.current.getBoundingClientRect();
      state.viewOrigin.x = rect.left * state.scale;
      state.viewOrigin.y = rect.top * state.scale;
      state.viewSize.width = ref.current.offsetWidth;
      state.viewSize.height = ref.current.offsetHeight;
    }); // 全局鼠标放开处理

    useDomEvent('mouseup', function (e) {
      state.actionPointer = null;
    }); // 全局鼠标移动

    useDomEvent('mousemove', function (e) {
      state.mousePosition = state.mouse2view(e);
    }); // 侦听尺寸变化

    ahooks.useSize(ref);
    return mobxReact.useObserver(function () {
      /** 节点列表 */
      var nodes = state.nodes.map(function (node) {
        return /*#__PURE__*/React__default["default"].createElement(UINode, {
          node: node,
          key: node.uid
        });
      });
      return /*#__PURE__*/React__default["default"].createElement(MapContext.Provider, {
        value: mapData
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        ref: ref,
        onContextMenu: function onContextMenu(e) {
          e.preventDefault();
        },
        style: {
          backgroundPosition: "".concat(state.position.x * state.scale + state.viewSize.width / 2, "px ").concat(state.position.y * state.scale + state.viewSize.height / 2, "px"),
          backgroundSize: "".concat(40 * state.scale, "px ").concat(40 * state.scale, "px")
        },
        className: Styles.Map
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        ref: refBG,
        className: Styles.bg
      }), /*#__PURE__*/React__default["default"].createElement(UILinks, null), /*#__PURE__*/React__default["default"].createElement("div", {
        ref: refNodes,
        style: {
          marginLeft: state.position.x + 'px',
          marginTop: state.position.y + 'px',
          zoom: state.scale
        },
        className: Styles.nodes
      }, nodes), expand));
    });
  };
  /** 关联线组件 */

  var UILinks = /*#__PURE__*/React.memo(function () {
    var state = React.useContext(MapContext).state;
    return mobxReact.useObserver(function () {
      // 关联内容
      var lines = state.nodes.map(function (node) {
        return node.getLinks();
      }).flat(5).map(function (link) {
        return /*#__PURE__*/React__default["default"].createElement(Line, {
          key: link.key,
          link: link
        });
      }); // 加入当前关联操作

      if (state.actionPointer) {
        lines.push( /*#__PURE__*/React__default["default"].createElement(Line, {
          key: "actionPointer",
          ps: state.actionPointer.pos,
          pe: state.mousePosition
        }));
      }

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: Styles.Link
      }, /*#__PURE__*/React__default["default"].createElement("svg", null, /*#__PURE__*/React__default["default"].createElement("g", {
        style: {
          transform: "translate3d(".concat(state.viewSize.width / 2, "px,").concat(state.viewSize.height / 2, "px,0px)")
        }
      }, /*#__PURE__*/React__default["default"].createElement("g", {
        style: {
          transform: "translate3d(".concat(state.position.x * state.scale, "px,").concat(state.position.y * state.scale, "px,0px)")
        }
      }, lines))));
    });
  });
  /**
   * 单根关联线渲染
   * @param {{link:*}} props 关联线参数
   * @returns
   */

  var Line = /*#__PURE__*/React.memo(mobxReact.observer(function (props) {
    /** 获取图状态 */
    var state = React.useContext(MapContext).state;
    /** 交互用ref */

    var ref = React.useRef(); // 右键菜单功能

    useContextMenu({
      ref: ref,
      menuData: function () {
        var _menuData = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", [['删除关联', props.link["delete"]]]);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function menuData() {
          return _menuData.apply(this, arguments);
        }

        return menuData;
      }()
    });
    state.viewSize.width;
    state.viewSize.height;
    if (props.link.ps() == null) return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null);

    var p1 = _objectSpread({}, props.link.ps());

    var p2 = _objectSpread({}, props.link.pe());

    p1.x *= state.scale;
    p1.y *= state.scale;
    p2.x *= state.scale;
    p2.y *= state.scale;
    var c = {
      x: (p2.x + p1.x) / 2,
      y: (p2.y + p1.y) / 2
    };
    /** 曲线偏移量 */

    var offset = 40 * state.scale;
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("path", {
      ref: ref,
      className: Styles.linebg,
      d: 'M' + p1.x + ',' + p1.y + ' Q' + (p1.x + offset) + ',' + p1.y + ',' + c.x + ',' + c.y + ' T' + p2.x + ',' + p2.y
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      className: Styles.line,
      d: 'M' + p1.x + ',' + p1.y + ' Q' + (p1.x + offset) + ',' + p1.y + ',' + c.x + ',' + c.y + ' T' + p2.x + ',' + p2.y
    }));
  }));

  /** 蓝图编辑器容器 */

  var UIContainer = /*#__PURE__*/React.memo(function (props) {
    var state = mobxReact.useLocalObservable(function () {
      return new StoreContainer(props.program);
    });
    return mobxReact.useObserver(function () {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React__default["default"].createElement(UIMap, {
        key: state.activeMap.program.uid,
        store: state.activeMap
      }));
    });
  });

  exports.BluePrintContainer = UIContainer;
  exports.BluePrintNode = BluePrintNode;
  exports.BluePrintProgram = Program;
  exports.BluePrintWorker = BluePrintWorker;
  exports.PluginBase = PluginBase;
  exports.PluginChildProgram = PluginChildProgram;
  exports.PluginEditor = PluginEditor;
  exports.PluginEditorInnerInput = PluginEditorInnerInput;
  exports.PluginTopMenu = PluginTopMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
