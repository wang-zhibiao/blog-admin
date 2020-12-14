module.exports = {
  title: '基础后台模板',
  showSettings: true,//是否在右侧显示设置面板
  sidebarLogo: true,//是否在边栏中显示logo
  supportPinyinSearch: true,//是否在headerSearch中支持拼音搜索
  tagsView: true,//是否显示路由显示标签
  /**
   * @type {string | array} 'production' | ['production', 'development']
   *@description需要显示err日志组件。
   *默认仅在生产环境中使用
   *如果您还想在开发人员中使用它，则可以通过['production'，'development']
   */
  errorLog: 'production'
}
