var ReactDOM = require('react-dom');
const { BluePrintWorker } = require('../core/worker');
const { Program, UIMap, PluginEditor } = require('../main');
const { PluginBase } = require('../plugins/plugin-base');
const { PluginEditorInnerInput } = require('../ui/hooks/plugin-main');
const { PluginReactTest } = require('./sample-plugin-react');
var Styles = require('./samples.less');

var panleDiv = document.createElement('div');
panleDiv.style['height'] = '50%';
document.body.appendChild(panleDiv);

var div = document.createElement('div');
div.style['height'] = '50%';
div.className = Styles.App;
document.body.appendChild(div);

var program = new Program({ plugins: [PluginBase, PluginEditor, PluginEditorInnerInput, PluginReactTest] });

/** 扩展节点右键菜单 */
program.hooks.add('node-context-menu', ({ node, menu }) => {
  menu.push(['运行节点', async() => {
    var worker = new BluePrintWorker(node);
    var Module = await worker.run();
    console.log(Module);
    window.testData = Module;
    ReactDOM.render(<Module />, panleDiv);
  }]);
});

ReactDOM.render(<UIMap program={program} />, div);
