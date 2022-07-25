const PROJECT_NAME = require('../package.json')
  .name.replace(/-/g, '_')
  .toUpperCase();

module.exports = {
  // 项目名称
  projectName: PROJECT_NAME,
  // 项目标题
  title: '建筑碳排放计算系统',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  theme: 'blue',
};
