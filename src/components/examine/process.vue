<template>
  <div class="process">
    <div class="main-width">
      <div class="check-logo">
        <img :src="require('@/assets/icon/yj_img_shz.png')" alt="审核状态" />
      </div>
      <div class="check-status">正在审核中</div>
      <div class="check-text">
        恭喜，资料提交成功，我们将会在<span>1个工作日</span>内审核完成，请您及时关注
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.process {
  margin-top: 33px;
  margin-bottom: 25px;
  height: 595px;
  .main-width {
    background: @white;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .check-status {
      margin-top: 52px;
      font-size: 28px;
      color: #ffc404;
    }
    .check-text {
      color: @grey;
      margin-top: 28px;
      font-size: 16px;
      span {
        color: #ffc404;
      }
    }
  }
}
</style>