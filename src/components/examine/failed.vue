<template>
  <div class="failed">
    <div class="main-width">
      <div class="check-logo">
        <img :src="require('@/assets/icon/yj_img_no.png')" alt="审核状态" />
      </div>
      <div class="check-status">很抱歉，申报审核失败</div>
      <div class="check-text">
        原因：
        <div class="check-text-cont" :title="data.remark || '无'">
          {{ data.remark || "无" }}
        </div>
      </div>
      <div class="check-btn" @click="reEditData">重新编辑资料</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.data = to.params;
    });
  },
  methods: {
    /** 重新编辑资料 */
    reEditData() {
      this.$router.push({
        name: "资质填写",
        params: {
          type: "edit",
          data: this.data
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.failed {
  margin-bottom: 25px;
  margin-top: 33px;

  .main-width {
    background: @white;
    height: 595px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .check-status {
      margin-top: 52px;
      font-size: 28px;
      color: #e1591d;
    }
    .check-text {
      width: 40%;
      color: @grey;
      text-align: center;
      margin-top: 28px;
      font-size: 16px;
      &-cont {
        padding-top: 5px;
        word-wrap: break-word;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /*设置p元素最大4行，父元素需填写宽度才明显*/
        text-overflow: ellipsis;
        overflow: hidden;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        /*因为代码环境的关系-webkit-box-orient被过滤掉了 autoprefixer 这个关键字可以免除被过滤的动作*/
      }
    }
    .check-btn {
      width: 329px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      background: #ac8458;
      border-radius: 25px;
      color: @white;
      margin-top: 60px;
    }
  }
}
</style>
