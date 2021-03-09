/*
 *二次封装axios
 */
import axios from "axios";
import router from "@/router/index.js";
import { Message, Loading } from "element-ui";
import { removeToken, removeUser } from "@/utils/auth.js";
// qs就相当于转换数据格式的第三方库
import qs from "qs";
import { Encrypt, Decrypt } from "@/api/aes";

let loading = null; //定义loading变量

//开始 加载loading
let startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)"
  });
};
//结束 取消loading加载
let endLoading = () => {
  loading.close();
};

let needLoadingRequestCount = 0; //声明一个变量

let showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    //当等于0时证明第一次请求 这时开启loading
    startLoading();
  }
  needLoadingRequestCount++; //全局变量值++
};

let tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return; //小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount--; //正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {
    //等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading();
  }
};

/*
    根据环境变量区分接口的默认地址
*/
// switch (process.env.NODE_ENV) {
//   // 生产环境
//   case "production":
//     axios.defaults.baseURL = "http://192.168.0.101:8888";
//     // axios.defaults.baseURL = "https://bid.hongaodata.com/api";
//     break;
//   // 测试环境
//   case "test":
//     axios.defaults.baseURL = "http://192.168.20.12:8080";
//     break;
//   // 默认开发环境
//   default:
//     axios.defaults.baseURL = "http://192.168.0.111:9090";
//   // axios.defaults.baseURL = "https://bid.hongaodata.com/api";
// }

/*
    设置超时时间和跨域是否允许携带凭证
*/
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式 （看服务器要求什么格式）
 x-www-form-urlencoded
 如果服务器需要josn格式  那么就不需要转换了
//  */
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
// // post请求
// axios.defaults.transformRequst = (data) => qs.stringify(data);

/*
 * 设置请求拦截器
 * TOKEN检验 :  接收服务器返回的token， 存储到vuex/本地存储中，
 * 每一次向服务器发送请求，我们应该把token带上
 */
axios.interceptors.request.use(
  config => {
    showFullScreenLoading();
    // config.headers.Content-Type = 'application/json;charset=UTF-8'
    // 对请求数据进行aes加密
    // config.data = Encrypt(JSON.stringify(config.data))
    // 携带上token
    let token = sessionStorage.getItem("token");
    if (token) {
      // 请求头里塞token
      token && (config.headers["Authorization"] = token);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/*
 *响应拦截器
 */
/* axios.defaults.validateStatus = status => {
    // 自定义响应成功的HTTP状态码
    return /^(2|3)\d{2}$/.test(status);
}; */
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    // 对响应进行aes解密
    // response.data = JSON.parse(Decrypt(response.data))
    if (response.data.code === 401) {
      Message({
        type: "error",
        message: "页面长时间未操作，需要重新登录!",
        center: true
      });
      removeToken();
      removeUser();
      router.push({
        path: "/login"
      });
      return;
    }
    if (response.data.code === 500) {
      Message({
        type: "error",
        message: response.data.msg,
        center: true
      });
    }
    return response.data;
  },
  error => {
    let { response } = error;
    if (response) {
      // => 服务器最起码返回结果了
      switch (response.status) {
        case 401: //当前请求需要用户验证(一般未登录)
          break;
        case 403: //服务器已经理解请求，但是拒绝执行 (一般token过期了)
          break;
        case 404: //找不到页面
          break;
      }
    } else {
      // 服务器连结果都没返回
      if (!window.navigator.onLine) {
        // 断网处理：可以跳转到断网页面
        return;
      }
      //   服务器崩了
      return Promise.reject(error);
    }
  }
);

export default axios;
