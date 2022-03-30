var ReactDOM = require('react-dom');
const { Program, UIMap, PluginEditor } = require('../main');
const { PluginBase } = require('../plugins/plugin-base');
const { PluginEditorInnerInput } = require('../ui/hooks/plugin-main');
var Styles = require('./samples.less');

var div = document.createElement('div');
div.className = Styles.App;
document.body.appendChild(div);

var program = new Program({ plugins: [PluginBase, PluginEditor, PluginEditorInnerInput] });
ReactDOM.render(<UIMap program={program} />, div);
