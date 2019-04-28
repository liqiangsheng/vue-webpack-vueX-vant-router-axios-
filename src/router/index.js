import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/pages/home/home'], resolve); //首页
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
//使用钩子函数对路由进行权限跳转  有登陆接口有token才打开
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('token');
//   if ( to.path === '/'||to.path === '/login') {
//     next();
//   } else {
//      if(!role){
//        next('/login');
//      }else {
//        next();
//      }
//   }
// })

export default router;
