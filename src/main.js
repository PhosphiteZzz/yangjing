import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@/assets/styles/reset.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import webSocket from "@/utils/websocket.js";
import "@/assets/styles/common.less";
import $ from "jquery";
import deepClone from "@/utils/deepClone.js";
import constant from "@/utils/common.js";
import scroll, { vueSeamlessScroll } from "vue-seamless-scroll";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import utils from "@/utils/utils.js";
import * as echarts from "echarts";
import customLink from "@/components/common/link.vue";
import customFooter from "@/components/common/footer.vue";
import noResult from "@/components/common/nodata.vue";
import { getToken, setToken, removeToken } from "@/utils/auth.js";
import "@/assets/styles/animate.css";
import directives from "@/utils/directives.js";
import { Message } from "element-ui";
import { checkLogin } from "@/api/login.js";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import './rem'

Vue.use(scroll);
Vue.use(ElementUI);
Vue.use(deepClone);
Vue.use(constant);
Vue.use(directives);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: "data-source"
  }
});
Vue.prototype.$echarts = echarts;
Vue.prototype.selectDictLabel = utils.selectDictLabel;
Vue.prototype.timeTransFor = utils.timeTransFor;
Vue.prototype.downloadFiles = utils.downloadFiles;
Vue.prototype.$webSocket = webSocket;
Vue.use(VueAwesomeSwiper);

Vue.component("custom-link", customLink);
Vue.component("custom-footer", customFooter);
Vue.component("no-result", noResult);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (
    to.fullPath === "/login/index" ||
    to.fullPath === "/examine" ||
    to.fullPath === "/login/forget"
  ) {
    next();
    NProgress.done();
  } else if (to.fullPath === "/index/home") {
    routerDeal(to, from, next);
  } else {
    if (to.matched.some(m => m.meta.require)) {
      if (getToken()) {
        checkLogin().then(result => {
          if (!result.isLogin) {
            Message({
              type: "warning",
              message: "长时间未操作，登录信息已失效！",
              center: true
              //duration: 2000
            });
            removeToken();
            location.reload();
          }
          routerDeal(to, from, next);
        });
      } else {
        Message({
          type: "error",
          message: "需要登录之后才能继续操作！",
          center: true
          //duration: 2000
        });
        next({ path: "/login", query: { redirect: to.fullPath } });
        NProgress.done();
      }
    } else {
      routerDeal(to, from, next);
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

function routerDeal(to, from, next) {
  if (Object.keys(from.query).length === 0) {
    //判断路由来源是否有query，处理不是目的跳转的情况
    next();
    NProgress.done();
  } else {
    let redirect = from.query.redirect; //如果来源路由有query
    if (redirect && redirect.indexOf(to.path) !== -1) {
      //这行是解决next无限循环的问题
      next();
    } else {
      next({ path: redirect }); //跳转到目的路由
    }
    NProgress.done();
  }
}
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
