import { BluePrintNode } from '../core/node';
import { Program } from '../core/program';
import Styles from './plugin-base.less';
import React from 'react';

/**
 * 基础功能
 * @param {Program} program 要运行插件的程序
 */
export var PluginBase = function(program) {
  // ============类型定义============
  program.addType('number', { name: '数值', inputModule: (val, cb) => {
    return <input className={Styles.input} type='number' key='number' value={val} onChange={e => { cb(Number(e.target.value)); }} />;
  } });

  program.addType('string', { name: '字符串', inputModule: (val, cb) => {
    return <input className={Styles.input} type='text' key='string' value={val} onChange={e => { cb(e.target.value); }} />;
  } });

  program.addType('select', { name: '选项', inputModule: (val, cb, define) => {
    var args = [];
    for (var i in define.args) {
      args.push(<option key={i} value={i}>{define.args[i]}</option>);
    }
    return <select className={Styles.input} type='text' key='select' value={val} onChange={e => { cb(e.target.value); }}>{args}</select>;
  } });

  program.addType('color', { name: '颜色', inputModule: (val, cb) => {
    return <input className={Styles.color} type='color' key='color' value={val} onChange={e => { cb(e.target.value); }} />;
  } });

  program.addType('map:string', { name: '映射表（字符串）', inputModule: (val = {}, cb) => {
    var list = [];
    var addOne = (key, value) => {
      list.push(<div key={key}>
        <input className={Styles.input} value={key} onChange={e => { val[e.target.value] = value; cb(val); }} />
        <input className={Styles.input} value={value} onChange={e => { val[key] = e.target.value; cb(val); }} />
        <button onClick={() => { delete val[key]; cb(val); }}>x</button>
      </div>);
    };
    for (var i in val) {
      addOne(i, val[i]);
    }
    return <div key='map:text'>
      {list}
      <button key='add-button' onClick={() => {
        // 添加项
        var id = 1;
        while (val['t' + id] !== undefined) { id++; }
        console.log(id);
        val['t' + id] = '';
        cb(val);
      }}>添加</button>
    </div>;
  } });
};
