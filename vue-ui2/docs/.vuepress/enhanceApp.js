import HcttopUI from '../../src/index.js'
import "../../src/styles/index.scss"
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'; 

Vue.use(ElementUI, {
  locale,
  zIndex: 3000
});

export default ({
  Vue,
  // options,
  // router
}) => {
  Vue.use(HcttopUI)
}