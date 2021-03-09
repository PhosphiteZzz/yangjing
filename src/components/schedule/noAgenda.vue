<template>
  <div class="noAgenda">
    <div class="image">
      <div class="image-bg"></div>
      <div class="image-text">暂无日程</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  lang="less" scoped>
.noAgenda {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .image {
    position: relative;
    .image-bg {
      width: 421px;
      height: 282px;
      background: url("~@/assets/icon/yj_img_ssk.png") center center no-repeat;
    }
    .image-text {
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