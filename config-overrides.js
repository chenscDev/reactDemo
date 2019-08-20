// import themeColor from './themeColor';
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const themeColor = require('./themeColor')
console.log(themeColor)

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeColor,
   }),
);