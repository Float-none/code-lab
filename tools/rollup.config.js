
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import {terser} from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';

module.exports = {
  input:'./src/index.js',
  // input: path.join(),
  output: [
    {
      // 打包文件夹
      file: './dist/index.js',
      format: 'umd',
      name: 'hcUtiles',
      plugins:[]
    },
    {
      // 打包文件夹
      file: './es/index.js',
      format: 'esm',  // CommonJS，适用于 Node 和 Browserify/Webpack
      name: 'hcModuleUtiles',
      globals: 'hcUtiles',
    },
],
  plugins: [
    eslint(),
    resolve(),
    inject({
      Promise: ['es6-promise', 'Promise']
    }),
    json({compact:true,preferConst:true}),
    babel({
        exclude: '/node_modules/',
        babelHelpers: 'bundled'
      }),
    terser(), // 进行压缩
  ]
}