import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@v/login.vue"),
    children: [
      {
        path: "/login",
        redirect: "/login/index"
      },
      {
        path: "/login/index",
        name: "登录/注册",
        component: () => import("@c/login/index.vue")
      },
      {
        path: "/login/forget",
        name: "忘记密码",
        component: () => import("@c/login/forgetPwd.vue")
      },
      {
        path: "/login/edit",
        name: "修改密码",
        component: () => import("@c/login/editPwd.vue")
      },
      {
        path: "/login/complete",
        name: "修改完成",
        component: () => import("@c/login/editComplete.vue")
      }
    ]
  },
  {
    path: "/examine",
    name: "资质审核",
    component: () => import("@v/examine.vue"),
    children: [
      {
        path: "/examine",
        redirect: "/examine/write"
      },
      {
        path: "/examine/write",
        name: "资质填写",
        component: () => import("@c/examine/write.vue")
      },
      {
        path: "/examine/process",
        name: "资质审核中",
        component: () => import("@c/examine/process.vue")
      },
      {
        path: "/examine/failed",
        name: "资质审核失败",
        component: () => import("@c/examine/failed.vue")
      }
    ]
  },
  {
    path: "/index",
    name: "门户",
    component: () => import("@v/index.vue"),
    children: [
      {
        path: "/index",
        redirect: "/index/home"
      },
      {
        path: "/index/home",
        name: "首页",
        alias: "nav",
        component: () => import("@c/home/index.vue")
      },
      {
        path: "/index/news",
        name: "行业新闻",
        component: () => import("@c/news/index.vue"),
        children: [
          {
            path: "/index/news",
            redirect: "/index/news/info"
          },
          {
            path: "/index/news/info",
            name: "行业新闻菜单",
            component: () => import("@c/news/info.vue")
          }
        ]
      },
      {
        path: "/index/transInfo",
        name: "交易信息",
        alias: "nav",
        component: () => import("@c/transInfo/index.vue"),
        children: [
          {
            path: "/index/transInfo",
            redirect: "/index/transInfo/all"
          },
          {
            path: "/index/transInfo/all",
            name: "所有公告",
            component: () => import("@c/transInfo/all.vue")
          },
          {
            path: "/index/transInfo/notice",
            name: "采购公告",
            component: () => import("@c/transInfo/notice.vue")
          },
          {
            path: "/index/transInfo/clarify",
            name: "澄清答疑",
            component: () => import("@c/transInfo/clarify.vue")
          },
          {
            path: "/index/transInfo/result",
            name: "成交结果公示",
            component: () => import("@c/transInfo/result.vue")
          }
        ]
      },
      {
        path: "/index/subinfor",
        name: "供应商管理",
        alias: "nav",
        component: () => import("@c/subinfor/index.vue"),
        children: [
          {
            path: "/index/subinfor",
            redirect: "/index/subinfor/supplier"
          },
          {
            path: "/index/subinfor/supplier",
            name: "供应商",
            component: () => import("@c/subinfor/supplier.vue")
          }
        ]
      },
      {
        path: "/index/schedule",
        name: "项目日程",
        alias: "nav",
        component: () => import("@c/schedule/index.vue"),
        children: [
          {
            path: "/index/schedule",
            redirect: "/index/schedule/recent"
          },
          {
            path: "/index/schedule/recent",
            name: "近期项目",
            component: () => import("@c/schedule/recent.vue")
          },
          {
            path: "/index/schedule/calendar",
            name: "项目日历",
            component: () => import("@c/schedule/calendar.vue")
          }
        ]
      },
      {
        path: "/index/creditinfo",
        name: "信用信息",
        alias: "nav",
        component: () => import("@c/creditinfo/index.vue"),
        children: [
          {
            path: "/index/creditinfo",
            redirect: "/index/creditinfo/info"
          },
          {
            path: "/index/creditinfo/info",
            name: "信用信息菜单",
            component: () => import("@c/creditinfo/info.vue")
          }
        ]
      },
      {
        path: "/index/laws",
        name: "法律法规",
        alias: "nav",
        component: () => import("@c/laws/index.vue"),
        children: [
          {
            path: "/index/laws",
            redirect: "/index/laws/law"
          },
          {
            path: "/index/laws/law",
            name: "法律法规菜单",
            component: () => import("@c/laws/law.vue")
          },
          {
            path: "/index/laws/manage",
            name: "管理制度菜单",
            component: () => import("@c/laws/manage.vue")
          }
        ]
      },
      // {
      //   path: "/index/integrity",
      //   name: "诚信信息",
      //   alias: "nav",
      //   component: () => import("@c/integrity/index.vue"),
      //   children: [
      //     {
      //       path: "/index/integrity",
      //       redirect: "/index/integrity/illegal"
      //     },
      //     {
      //       path: "/index/integrity/illegal",
      //       name: "违法违规",
      //       component: () => import("@c/integrity/illegal.vue")
      //     },
      //     {
      //       path: "/index/integrity/blacklist",
      //       name: "黑名单",
      //       component: () => import("@c/integrity/blacklist.vue")
      //     }
      //   ]
      // },
      {
        path: "/index/downcenter",
        name: "下载中心",
        alias: "nav",
        component: () => import("@c/downcenter/index.vue"),
        children: [
          {
            path: "/index/downcenter",
            redirect: "/index/downcenter/down"
          },
          {
            path: "/index/downcenter/down",
            name: "下载中心菜单",
            component: () => import("@c/downcenter/down.vue")
          }
        ]
      },
      {
        path: "/index/aboutus",
        name: "关于我们",
        alias: "nav",
        component: () => import("@c/aboutus/index.vue")
      },
      {
        path: "/index/search",
        name: "搜索",
        component: () => import("@c/search/index.vue")
      },
      {
        path: "/index/details",
        name: "通用详情页",
        component: () => import("@c/details/index.vue")
      },
      {
        path: "/index/transdetails",
        name: "交易信息详情",
        component: () => import("@c/details/transdetails.vue")
      },
      {
        path: "/index/invitdetails",
        name: "邀请招标详情",
        component: () => import("@c/details/invitdetails.vue")
      },
      {
        path: "/index/alipay",
        name: "支付宝支付",
        component: () => import("@c/pay/alipay.vue"),
        meta: {
          require: true
        }
      },
      {
        path: "/index/wepay",
        name: "微信支付",
        component: () => import("@c/pay/wepay.vue"),
        meta: {
          require: true
        }
      },
      {
        path: "/index/personal",
        name: "个人中心",
        component: () => import("@c/personal/index.vue"),
        children: [
          {
            path: "/index/personal",
            redirect: "/index/personal/infor"
          },
          {
            path: "/index/personal/infor",
            name: "信息管理",
            component: () => import("@c/personal/inforManage.vue"),
            meta: {
              require: true
            }
          },
          {
            path: "/index/personal/myItem",
            name: "我的项目",
            component: () => import("@c/personal/myItem.vue"),
            meta: {
              require: true
            }
          },
          {
            path: "/index/personal/editPwd",
            name: "修改密码（个人中心）",
            component: () => import("@c/personal/editPwd.vue"),
            meta: {
              require: true
            }
          },
          {
            path: "/index/personal/message",
            name: "消息通知",
            component: () => import("@c/personal/message.vue"),
            meta: {
              require: true
            }
          },
          {
            path: "/index/personal/question",
            name: "提问投诉",
            component: () => import("@c/personal/question.vue"),
            meta: {
              require: true
            }
          }
        ],
        meta: {
          require: true
        }
      }
    ]
  }
];
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes,
  linkActiveClass: "active-router"
});

export default router;
