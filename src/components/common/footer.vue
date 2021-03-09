<template>
  <footer class="address">
    <div class="address-top main-width">
      <div class="address-top-logo"></div>
      <div class="address-top-connect">
        <div class="connect-title">联系我们<span>/ CONTACT US</span></div>
        <div class="connect-contact">
          <span>电话：0518-82256216</span><span>邮箱：public@lygshjd.com</span>
        </div>
        <div class="connect-contact">
          <span> 集团地址：江苏省连云港市徐圩新区苏海路安全环保管理中心</span>
        </div>
      </div>
      <div class="address-top-consult">
        <div class="connect-title">
          技术咨询<span>/ Technical consultation</span>
        </div>
        <div class="connect-contact">
          <span>技术支持：中电鸿信信息科技有限公司</span>
        </div>
        <div class="connect-contact">
          <span>电话：13357868100（仅接受技术咨询）</span>
          <span>推荐使用谷歌浏览器</span>
        </div>
      </div>
    </div>
    <div class="address-bot">
      <div>版权所有：Copyright©2020 江苏洋井石化集团有限公司</div>
      <div>苏ICP备17021428号-1</div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.address {
  background-color: @font;
  height: 253px;
  &-top {
    height: 79%;
    display: flex;
    align-items: center;
    &-logo {
      width: 240px;
      height: 70px;
      background: url("~@/assets/icon/logo2.png");
      margin-right: 70px;
    }
    &-connect,
    &-consult {
      width: 380px;
      color: @white;
      margin-right: 70px;
      .connect-title {
        line-height: 18px;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 18px;
        span {
          display: inline-block;
          padding-left: 10px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.3);
          line-height: 18px;
        }
      }
      .connect-contact {
        color: #cccccc;
        line-height: 26px;
        display: flex;
        justify-content: space-between;
      }
    }
    &-consult {
      width: 410px;
      margin: 0;
    }
  }
  &-bot {
    border-top: 1px solid #666666;
    display: flex;
    font-size: 14px;
    height: 21%;
    justify-content: center;
    align-items: center;
    color: #cccccc;
    line-height: 14px;
    div {
      &:nth-of-type(1) {
        padding-right: 30px;
        border-right: 1px solid #666666;
      }
      &:nth-of-type(2) {
        padding-left: 30px;
      }
    }
  }
}
</style>