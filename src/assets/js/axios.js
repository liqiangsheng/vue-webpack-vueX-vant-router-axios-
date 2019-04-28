/*
* 还有问题的，有接口才调试 这个页面不一定要
* **/
import axios from 'axios'
let token =JSON.parse(sessionStorage.getItem('token')); //token
import router from '../../router/index' //路由
import {Dialog} from '../../../static/js/vant.main'
Vue.use(Dialog);
// 创建axios实例
const service = axios.create({
  timeout: 60000 ,                 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(config => {
  console.log(config,'config11111111')
  if(router.history.current.fullPath!='/login'){
    // config.baseURL = baseHttp.BASE_URL; // api的base_url
    if(token){ //有token所有的设置上token
      config.headers = { 'Content-Type':'application/json; charset=utf-8', 'Authorization':"bearer "+token};
    }else{ //登陆的，token没有那就清楚所有的本地存储，刷新页面自动跳到登陆页面
      config.headers = { 'Content-Type':'application/json; charset=utf-8' };
    }
  }else{
    // config.baseURL =baseHttp.LOGIN_URL; // api的base_url
    config.headers = { 'Content-Type':'application/json; charset=utf-8' };
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});
// respone拦截器
service.interceptors.response.use(
  //response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  response =>{
    const res = response.data;
    // console.log( response.data,' response.data')
    if(res.status.toString() !== '200'){
      Dialog.alert({
        message:res.message,
        title:res.status
      });
      //return Promise.reject('error');
      return response;
    }else{
      return response;
    }
  },
  error => {
    let config = error.config;
    console.log(error,2222222222222)
    if(error.response.status === 401 && error.response.data.code === '1000009'){ //token过期
      console.log(config)
      Dialog.alert({
        message:res.message,
        title:res.status
      });
      setTimeout(()=>{
        //这里还要清楚token
        window.reload();
      },3000)

    }else if(error.response.status === 404){
      Dialog.alert({
        message:res.message,
        title:res.status
      });
    } else{
      //如果是500报错
      let message = "请求超时";
      if(error.response) {
        const res = error.response.data;
        if(res.message!==null && res.message !== "") {
          message = res.message;
        }
      }
      Dialog.alert({
        message:'请求超时',
        title:res.status
      });

    }

    return {status: false, data: { status: false}};
    //return Promise.reject(error);
  }
);
//service.defaults.headers.common['Authorization'] = "bearer "+ Cookies.get('ACCESS_TOKEN');
export default service;

