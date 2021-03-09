<template>
  <div class="nocontent">
    <div class="img">
      <div class="img-bg"></div>
      <div class="img-text">没有相关数据</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.nocontent {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  .img {
    position: relative;
    .img-bg {
      width: 421px;
      height: 282px;
      background: url("~@/assets/icon/yj_img_ssk.png") center center no-repeat;
    }
    &-text {
      width: 100%;
      text-align: center;
      position: absolute;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: @theme;
      bottom: 19px;
    }
  }
}
</style>