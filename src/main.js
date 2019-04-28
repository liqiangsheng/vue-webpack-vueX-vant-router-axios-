// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// console.log(Vue)
// import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/rem'
Vue.config.productionTip = false
// 上线记得注释掉 调试用
let vConsole = new VConsole() // 初始化
Vue.use(vConsole)
//导航栏url截取参数
import {UrlSearch} from  "./assets/js/common"
Vue.prototype.$parameters= new UrlSearch(); //方法实力化

import { mutations } from "@/vuex/mutations"
import { state } from "@/vuex/state";
import { actions } from "@/vuex/actions";
Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
  actions
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
