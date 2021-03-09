<template>
  <footer class="link">
    <div class="main-width">
      <div>
        <span>友情链接</span>
        <a href="http://zb.fygroup.com/" target="_blank"
          >徐圩新区非招标采购电子实施平台</a
        >
        <a href="http://spzx.lyg.gov.cn/TPFront/" target="_blank"
          >连云港市公共资源交易网</a
        >
        <a href="http://czj.lyg.gov.cn/lygzfcg/" target="_blank">政府采购网</a>
        <a href="http://www.jszb.com.cn/jszb/" target="_blank"
          >江苏省建设工程招标网</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.link {
  background: rgba(51, 51, 51, 0.6);
  height: 77px;
  .main-width {
    line-height: 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    span {
      color: @white;
    }
    a {
      color: @white;
      border-left: 1px solid @white;
      &:nth-of-type(1) {
        border: none;
      }
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