<template>
  <div class="wepay">
    <div class="main-width">
      <div class="wepay-title">
        <div class="title-left">
          <div>请您及时付款，以便订单尽快处理！</div>
          <div class="price">
            应付金额:<span>{{ amount }}元</span>
          </div>
        </div>
        <div class="title-right">订单号：{{ orderNum }}</div>
      </div>
      <div class="wepay-cont">
        <div class="way">
          <div class="way-top">支付方式：微信支付</div>
          <div class="way-bot" v-if="status">
            <div class="scan"></div>
            <div class="text">请使用微信扫一扫<br />扫描二维码支付</div>
          </div>
          <div></div>
        </div>
        <div class="code" v-if="status">
          <img :src="codeSrc" alt="支付二维码" v-if="codeSrc" />
        </div>
        <div class="code-complete" v-else>
          <div class="icon"></div>
          <div class="text">
            已成功付款：<span>￥{{ amount }}</span>
          </div>
          <div class="sure btn" @click="returnDetails">确定</div>
          <div class="download btn" @click="downloadBidDoc">下载标书</div>
        </div>
        <div class="phone"></div>
      </div>
      <div class="wepay-footer">
        <div v-if="status">
          请您在提交订单后<span>10分钟内</span>完成支付，否则订单会自动取消
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderCode, checkSocketStatus } from "@/api/index.js";
import { getUserInfo, getCode } from "@/utils/auth.js";
export default {
  data() {
    return {
      codeSrc: null,
      amount: "",
      orderNum: "",
      socket: null,
      status: true,
      timer: null,
      time: 30000
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
      let { noticeId, payType } = query;
      let params = {
        noticeId: Number(noticeId),
        payType: Number(payType)
      };
      getOrderCode(params).then(result => {
        if (result.code === 200) {
          this.status = true;
          this.amount = result.money;
          this.orderNum = result.orderNum;
          this.codeSrc = result.img;
          this.openSocket();
          this.setSocket();
          if (query.status && query.status === "success") {
            this.status = false;
          }
          return;
        }
        this.enterNoExplantion(Number(noticeId));
      });
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
    /** 重新连接socket */
    reConnectSocket() {
      this.socket.closeSocket();
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
          if (e.noticeId == this.$route.query.noticeId) {
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
    /** 确定返回 */
    returnDetails() {
      this.enterNoExplantion(Number(this.$route.query.noticeId));
    },
    changeStatus(noticeId) {
      let query = $.extend(true, {}, this.$route.query);
      query.status = "success";
      query.noticeId = noticeId;
      this.$router.replace({
        path: "/index/wepay",
        query
      });
    },
    /** 下载标书 */
    downloadBidDoc() {
      this.$router.push({
        path: "/index/personal/myItem"
      });
    },
    /** init */
    init() {
      let query = this.$route.query;
      if (!query.noticeId || !query.payType) {
        this.$message({
          message: "获取订单状态异常，请返回重新操作！",
          center: true,
          //duration: 2000,
          type: "error"
        });
        return;
      }
      this.getCode(query);
    },
    beforeunloadFn() {
      clearInterval(this.timer);
    }
  },
  created() {
    this.init();
    window.addEventListener("beforeunload", e => this.beforeunloadFn(e));
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.wepay {
  padding: 20px 0 60px 0;
  background: #f8f8f8;
  .main-width {
    height: 600px;
    background: @white;
    padding-left: 31px;
    padding-right: 29px;
    .wepay-title {
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
    .wepay-cont {
      height: 445px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .way {
        width: 243px;
        &-top {
          text-align: center;
          height: 43px;
          border: 1px solid @border-less;
          font-size: 18px;
          line-height: 43px;
          background: url("~@/assets/icon/yj_icon_wx.png") right 10px center
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
        img {
          width: 100%;
          height: 100%;
        }
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
        background: url("~@/assets/icon/yj_img_yj.png") center center no-repeat;
      }
    }
    .wepay-footer {
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
