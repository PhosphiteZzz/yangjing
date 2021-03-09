<template>
  <div class="alipay">
    <div class="main-width">
      <div class="alipay-title">
        <div class="title-left">
          <div>请您及时付款，以便订单尽快处理！</div>
          <div class="price">应付金额:<span>300元</span></div>
        </div>
        <div class="title-right">订单号：254652558656655954785554545</div>
      </div>
      <div class="alipay-cont">
        <div class="way">
          <div class="way-top">支付方式：支付宝支付</div>
          <div class="way-bot">
            <div class="scan"></div>
            <div class="text">请使用支付宝扫一扫<br />扫描二维码支付</div>
          </div>
          <div></div>
        </div>
        <div class="code"></div>
        <div class="phone"></div>
      </div>
      <div class="alipay-footer">
        <div>
          请您在提交订单后<span>10分钟内</span>完成支付，否则订单会自动取消
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderCode } from "@/api/index.js";
export default {
  data() {
    return {};
  },
  methods: {
    getCode(query) {
      let { noticeId, payType } = query;
      let params = {
        noticeId: Number(noticeId),
        payType: Number(payType),
      };
      getOrderCode(params).then((result) => {});
    },
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length <= 0) {
      this.$message({
        message: "获取订单状态异常，请返回重新操作！",
        center: true,
        duration: 2000,
        type: "error",
      });
      return;
    }
    this.getCode(query);
  },
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