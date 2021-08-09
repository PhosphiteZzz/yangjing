<template>
  <div class="alipay">
    <div class="main-width">
      <div class="alipay-title">
        <div class="title-left">
          <div>请您及时付款，以便订单尽快处理！</div>
          <div class="price">
            应付金额:<span>{{ amount }}元</span>
          </div>
        </div>
        <div class="title-right">订单号：{{ orderNum }}</div>
      </div>
      <div class="alipay-cont">
        <div class="way">
          <div class="way-top">支付方式：支付宝支付</div>
          <div class="way-bot">
            <div class="scan"></div>
            <div class="text">请在打开的支付页面<br />扫描二维码支付</div>
          </div>
          <div></div>
        </div>
        <div class="code-complete" v-if="!status">
          <div class="icon"></div>
          <div class="text">
            已成功付款：<span>￥{{ amount }}</span>
          </div>
          <div class="sure btn" @click="returnDetails">确定</div>
          <div class="download btn" @click="downloadBidDoc">下载标书</div>
        </div>

        <div class="phone"></div>
      </div>
      <div class="alipay-footer">
        <div v-if="status">
          请您在提交订单后<span>10分钟内</span>完成支付，否则订单会自动取消
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, getCode } from "@/utils/auth.js";
import {
  getOrderCode,
  checkSocketStatus,
  checkAlipayStatus
} from "@/api/index.js";
export default {
  data() {
    return {
      amount: "",
      orderNum: "",
      timer: null,
      status: true,
      time: 30000,
      socket: null,
      tap: null,
      aliTimer: null,
      aliTime: 15000
    };
  },
  watch: {
    $route: {
      handler(result) {
        // this.init();log
        this.status = false;
      },
      deep: true
    }
  },
  methods: {
    getCode(query) {
      this.handleAlipay(query);
    },
    /** 进入采购公告 */
    enterNoExplantion(id) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          noticeId: id,
          fLeave: "交易信息",
          index: 0
        }
      });
    },
    /** 支付宝支付 */
    handleAlipay(query) {
      let { noticeId, payType } = query;
      let params = {
        noticeId,
        payType
      };
      if (!query.status || query.status !== "success") {
        this.tap = window.open();
      }
      getOrderCode(params).then(result => {
        if (result.code === 200) {
          this.status = true;
          this.amount = result.money;
          this.orderNum = result.orderNum;
          if (query.status && query.status === "success") {
            this.status = false;
            return;
          }
          this.checkAlipay(result.orderNum, noticeId);
          if (result.data) {
            const div = this.tap.document.createElement("div");
            div.innerHTML = result.data; // data就是接口返回的form 表单字符串
            this.tap.document.body.appendChild(div);
            this.tap.document.forms[0].submit();
            // this.tap.document.documentElement.style.height = "100%";
            // this.tap.document.querySelector("body").style.height = "100%";
            this.openSocket();
            this.setSocket();
            return;
          }
          this.changeStatus(noticeId);
          return;
        }
        this.enterNoExplantion(Number(noticeId));
      });
    },
    /** 确定返回 */
    returnDetails() {
      this.enterNoExplantion(Number(this.$route.query.noticeId));
    },
    /** 下载标书 */
    downloadBidDoc() {
      this.$router.push({
        path: "/index/personal/myItem"
      });
    },
    /** socket连接 */
    openSocket() {
      // m 供应商和专家， u 后台用户
      let userType = "m";
      let userId = getUserInfo().userId;
      // let socketUrl = `ws://192.168.0.101:8888/api/websocket/${userType}/${userId}/${getCode()}`;
      let socketUrl = `wss://zb.lygshjd.com/websocket/${userType}/${userId}/${getCode()}`;

      this.socket = new this.$webSocket({ ip: socketUrl });
      this.socket.onmessage = e => {
        if (e.action && e.action === "pay_success") {
          this.close();
          if (e.noticeId == this.$route.query.noticeId) {
            clearInterval(this.aliTimer);
            this.changeStatus(e.noticeId);
            this.$message({
              message: "支付成功！",
              center: true,
              //duration: 2000,
              type: "success"
            });
          }
          return;
        }
        this.$message({
          message: "支付失败，请刷新页面重试或者联系管理员！",
          center: true,
          //duration: 2000,
          type: "error"
        });
      };
    },
    changeStatus(noticeId) {
      //如果此时已经是支付成功状态就return
      if (this.$route.query.status) {
        return;
      }
      let query = $.extend(true, {}, this.$route.query);
      query.status = "success";
      query.noticeId = noticeId;

      this.$router.replace({
        path: "/index/alipay",
        query
      });
    },
    /** 重新连接socket */
    reConnectSocket() {
      this.socket.closeSocket();
    },
    /** 每30s请求一次长连接 */
    setSocket() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        let params = {
          userType: Number(getUserInfo().userType) === 0 ? "u" : "m",
          userId: getUserInfo().userId,
          randomCode: getCode()
        };
        checkSocketStatus(params).then(result => {
          if (result.code !== 200) return;
          !result.online ? this.reConnectSocket() : "";
        });
      }, this.time);
    },
    /** 定时查询交易状态 */
    checkAlipay(orderNum, noticeId) {
      this.aliTimer = setInterval(() => {
        checkAlipayStatus(orderNum).then(result => {
          if (result.tradeFinished) {
            this.close();
            clearInterval(this.aliTimer);
            this.changeStatus(noticeId);
          }
        });
      }, this.aliTime);
    },
    /** 关闭新窗口 */
    close() {
      if (this.tap) {
        this.tap.close();
      }
    },
    beforeunloadFn() {
      clearInterval(this.timer);
      clearInterval(this.aliTimer);
      this.close();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.aliTimer);
    this.close();
  },
  created() {
    window.addEventListener("beforeunload", e => this.beforeunloadFn(e));
    let query = this.$route.query;
    if (Object.keys(query).length <= 0) {
      this.$message({
        message: "获取订单状态异常，请返回重新操作！",
        center: true,
        //duration: 2000,
        type: "error"
      });
      return;
    }
    this.getCode(query);
  }
};
</script>
<style lang="less" scoped>
.alipay {
  padding: 20px 0 60px 0;
  background: #f8f8f8;
  .main-width {
    height: 600px;
    background: @white;
    padding-left: 31px;
    padding-right: 29px;
    .alipay-title {
      line-height: 77px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid @border-less;
      .title-left {
        display: flex;
        .price {
          padding-left: 28px;
          span {
            color: #ee1010;
          }
        }
      }
    }
    .alipay-cont {
      height: 445px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .way {
        width: 243px;
        &-top {
          text-indent: 24px;
          height: 43px;
          border: 1px solid @border-less;
          font-size: 18px;
          line-height: 43px;
          background: url("~@/assets/icon/yj_icon_zfb.png") right 10px center
            no-repeat;
        }
        &-bot {
          margin-top: 8px;
          background: #f8f8f8;
          height: 73px;
          display: flex;
          justify-content: center;
          align-items: center;
          .scan {
            width: 35px;
            height: 35px;
            background: url("~@/assets/icon/yj_icon_sys.png") center center
              no-repeat;
          }
          .text {
            padding-left: 15px;
            font-size: 16px;
            line-height: 18px;
          }
        }
      }
      .code {
        width: 360px;
        height: 360px;
        border: 1px solid @border-less;
      }
      .code-complete {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 360px;
        .icon {
          width: 151px;
          height: 192px;
          background: url("~@/assets/icon/yj_icon_success.png") center center
            no-repeat;
          background-size: 100% 100%;
        }
        .text {
          font-size: 16px;
          padding-top: 32px;
          span {
            color: #f3110c;
          }
        }
        .btn {
          width: 240px;
          height: 46px;
          line-height: 46px;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
        }
        .sure {
          margin-top: 30px;
          background: #4cbf00;
          color: @white;
        }
        .download {
          margin-top: 10px;
          border: 1px solid #4cbf00;
          color: #4cbf00;
        }
      }
      .phone {
        width: 267px;
        height: 359px;
        background: url("~@/assets/icon/yj_img_ts2.png") center center no-repeat;
      }
    }
    .alipay-footer {
      border-top: 1px solid @border-less;
      text-align: center;
      line-height: 76px;
      font-size: 16px;
      span {
        font-weight: 600;
        color: #f34e0c;
      }
    }
  }
}
</style>
