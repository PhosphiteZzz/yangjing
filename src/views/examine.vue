<template>
  <div class="login">
    <div class="logo">
      <img
        :src="require('@/assets/bg/logo.png')"
        title="洋井集团电子采购平台"
        alt="洋井集团电子采购平台"
        @click="routerJump"
      />
      <div class="bar">
        <div class="head">
          <img :src="require('@/assets/icon/yj_tx_yhmr.png')" alt="头像" />
          <span v-text="name"></span>
        </div>
        <div class="quit">
          <img :src="require('@/assets/icon/yj_icon_tc.png')" alt="退出" />
          <span @click="quitLogin">退出</span>
        </div>
      </div>
    </div>
    <section class="content">
      <router-view></router-view>
    </section>
    <div :class="['footer', { writeStyle: $route.path === '/examine/write' }]">
      <custom-link></custom-link>
      <custom-footer></custom-footer>
    </div>
  </div>
</template>
<script>
/**
 * 资质审核 examine
 * @author li_xiangjian
 */
export default {
  data() {
    return {
      name: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (Object.keys(to.params) <= 0) {
        next("/login");
        return;
      }
      vm.name = to.params.data.userName;
      if (to.params.code === -1) {
        vm.$router.push({
          name: "资质填写",
          params: {
            type: "add",
            data: to.params.data,
          },
        });
      }
      if (to.params.code === -2) {
        vm.$router.push({
          name: "资质审核中",
          params: to.params.data,
        });
      }
      if (to.params.code === -3) {
        vm.$router.push({
          name: "资质审核失败",
          params: to.params.data,
        });
      }
    });
  },
  methods: {
    quitLogin() {
      this.$router.push("/login");
    },
    routerJump() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  .logo {
    height: 99px;
    background: @white;
    position: relative;
    z-index: 100;
    box-shadow: 0px 1px 12px 0px rgba(153, 153, 153, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    > img {
      margin-left: 31px;
      cursor: pointer;
    }
    .bar {
      display: flex;
      align-items: center;
      margin-right: 39px;
      > div {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          display: inline-block;
          font-size: 16px;
          color: #666666;
          padding-left: 12px;
        }
      }
      .head {
        margin-right: 29px;
      }
    }
  }
  .content {
    // min-height: calc(~"100% - 99px - 330px ");
    // height: 653px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f4f4;
  }

  .footer {
    position: relative;
    bottom: 0;
    left: 0;
    height: calc(100% - 99px - 653px);
    .link {
      height: 23.33%;
    }

    .address {
      height: 76.66%;
      &-top {
        height: 80% !important;
      }
      &-bot {
        height: 20% !important;
      }
    }
  }
  .writeStyle {
    height: 330px;
  }
}
</style>