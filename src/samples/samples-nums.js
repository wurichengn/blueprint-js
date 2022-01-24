var ReactDOM = require('react-dom');
const { Program, UIMap, PluginEditor } = require('../main');
const { PluginBase } = require('../plugins/plugin-base');
var Styles = require('./samples.less');

var div = document.createElement('div');
div.className = Styles.App;
document.body.appendChild(div);

var program = new Program({ plugins: [PluginBase, PluginEditor] });
ReactDOM.render(<UIMap program={program} />, div);
