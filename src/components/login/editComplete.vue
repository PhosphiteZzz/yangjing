<template>
  <div class="edit">
    <div class="head">
      <span class="title">修改完成</span>
    </div>
    <div class="cont">
      <step :index="stepIdx"></step>
      <div class="cont-complete">
        <div class="cont-complete-suc"></div>
        <div class="cont-complete-text">
          密码修改成功，<span @click="login"
            >返回登录<i>({{ time }})</i></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import step from "./components/step";

export default {
  data() {
    return {
      stepIdx: 2,
      time: 3,
      timer: null,
    };
  },
  components: {
    step,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!to.params.stepIdx) {
        vm.$router.push("/login");
        return;
      }
      vm.stepIdx = to.params.stepIdx;
      vm.returnLogin();
    });
  },
  methods: {
    login() {
      clearInterval(this.timer);
      this.$router.push("/login");
    },
    returnLogin() {
      this.timer = setInterval(() => {
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.login();
          return;
        }
        this.time--;
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.edit {
  width: 1070px;
  height: 585px;
  background: @white;
  .head {
    height: 76px;
    line-height: 76px;
    border: 1px solid @border-less;
    span {
      display: inline-block;
    }
    .title {
      font-size: 26px;
      text-indent: 26px;
    }
  }
  .cont {
    height: calc(~"100% - 76px");
    padding: 40px 67px;
    &-complete {
      height: calc(~"100% - 54px");
      padding-top: 59px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-suc {
        width: 151px;
        height: 192px;
        background: url("~@/assets/icon/yj_icon_success.png") center center
          no-repeat;
      }
      &-text {
        margin-top: 44px;
        font-size: 20px;
        span {
          display: inline-block;
          color: @theme;
          cursor: pointer;
        }
        i {
          font-style: normal;
        }
      }
    }
  }
}
</style>
