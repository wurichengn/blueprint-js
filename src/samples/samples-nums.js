var ReactDOM = require('react-dom');
const { BluePrintWorker } = require('../core/worker');
const { Program, UIMap, PluginEditor } = require('../main');
const { PluginBase } = require('../plugins/plugin-base');
const { PluginChildProgram } = require('../plugins/plugin-child-program');
const { PluginEditorInnerInput } = require('../ui/hooks/plugin-main');
const { PluginTopMenu } = require('../ui/hooks/plugin-top-menu');
const { UIContainer } = require('../ui/ui-container');
const { PluginReactTest } = require('./sample-plugin-react');
var Styles = require('./samples.less');

var panleDiv = document.createElement('div');
panleDiv.style['height'] = '50%';
document.body.appendChild(panleDiv);

var div = document.createElement('div');
div.style['height'] = '50%';
div.className = Styles.App;
document.body.appendChild(div);

var program = new Program({ plugins: [PluginBase, PluginEditor, PluginChildProgram, PluginTopMenu, PluginEditorInnerInput, PluginReactTest] });

/** 扩展节点右键菜单 */
program.hooks.add('node-contextmenu', ({ node, menuData }) => {
  menuData.push(['运行节点', async() => {
    var worker = new BluePrintWorker(node);
    var Module = await worker.run();
    console.log(Module);
    window.testData = Module;
    ReactDOM.render(<Module />, panleDiv);
  }]);
});

/** 扩展程序右键菜单 */
program.hooks.add('map-contextmenu', ({ program, menuData }) => {
  menuData.push(['保存结构', async() => {
    var data = program.save();
    console.log(data);
    localStorage['map-save'] = JSON.stringify(data);
  }]);
});

// 是否有已经保存的结果
if (localStorage['map-save']) {
  try {
    program.load(JSON.parse(localStorage['map-save']));
  } catch (e) {
    console.error(e);
  }
}

ReactDOM.render(<UIContainer program={program} />, div);
