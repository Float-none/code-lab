// 导入组件，组件必须声明 name
import HcButton from './src'
// 为组件提供 install 安装方法，供按需引入
HcButton.install = function (Vue) {
  Vue.component(HcButton.name, HcButton)
}
// 导出组件
export default HcButton