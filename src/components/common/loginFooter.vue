<template>
  <footer class="footer">
    <div class="top">
      <div class="main-width">
        <div class="link">
          <span>友情链接</span>
          <a href="http://zb.fygroup.com/" target="_blank"
            >徐圩新区非招标采购电子实施平台</a
          >
          <a href="http://spzx.lyg.gov.cn/TPFront/" target="_blank"
            >连云港市公共资源交易网</a
          >
          <a href="http://czj.lyg.gov.cn/lygzfcg/" target="_blank"
            >政府采购网</a
          >
          <a href="http://www.jszb.com.cn/jszb/" target="_blank"
            >江苏省建设工程招标网</a
          >
        </div>
      </div>
    </div>
    <div class="bot">
      <p>
        <span>电话：0518-82256886</span><span>邮箱：public@lygshjd.com</span
        ><span>集团地址：江苏省连云港市徐圩新区苏海路安全环保管理中心</span>
      </p>
      <p>
        <span>版权所有：Copyright©2019江苏洋井石化集团有限公司</span
        ><span>苏ICP备17021428号-1</span>
      </p>
    </div>
  </footer>
</template>
<style lang="less" scoped>
.footer {
  height: calc(~"100% - 817px");
  .top {
    border-bottom: 1px solid @border-less;
    height: 30%;
    .main-width {
      height: 100%;
    }
  }
  .bot {
    text-align: center;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      color: #666666;
      font-size: 14px;
      margin: 10px 0;
      span {
        display: inline-block;
        padding: 0 18px;
        border-right: 1px solid #666666;
        &:nth-last-of-type(1) {
          border: none;
        }
      }
    }
  }
  .link {
    line-height: 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    span {
      color: #666666;
    }
    a {
      color: #666666;
      border-left: 1px solid #666666;
      &:nth-of-type(1) {
        border: none;
        padding-left: 59px;
        padding-right: 43px;
      }
      &:nth-of-type(2) {
        padding-left: 43px;
        padding-right: 58px;
      }
      &:nth-of-type(3) {
        padding-left: 58px;
        padding-right: 74px;
      }
      &:nth-of-type(4) {
        padding-left: 74px;
      }
    }
  }
}
</style>
