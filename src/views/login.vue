<template>
  <div class="login">
    <div class="logo">
      <img
        :src="require('@/assets/bg/logo.png')"
        alt="洋井集团电子采购平台"
        @click="routerJump"
      />
      <div class="action" v-if="showAction">
        <span><router-link to="/login/index">登录</router-link></span>
        <span
          ><router-link :to="{ path: '/login/index', query: { type: 1 } }"
            >注册</router-link
          ></span
        >
      </div>
    </div>
    <section class="content">
      <router-view></router-view>
    </section>
    <loginFooter></loginFooter>
  </div>
</template>
<script>
/**
 * 登录 login
 * @author li_xiangjian
 */
import loginFooter from "@/components/common/loginFooter.vue";
import { removeToken, removeUser } from "@/utils/auth.js";

export default {
  data() {
    return {
      showAction: false
    };
  },
  components: {
    loginFooter
  },
  watch: {
    $route: {
      handler(value) {
        if (value.path !== "/login/index") {
          this.showAction = true;
          return;
        }
        this.showAction = false;
      }
    }
  },
  created() {
    if (this.$route.path !== "/login/index") {
      this.showAction = true;
      return;
    }
    this.showAction = false;
  },
  beforeRouteEnter(to, from, next) {
    removeToken();
    removeUser();
    next();
  },
  methods: {
    routerJump() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  min-height: 920px;
  .logo {
    min-width: 1200px;
    height: 99px;
    background: @white;
    box-shadow: 0px 1px 12px 0px rgba(153, 153, 153, 0.3);
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    z-index: 100;
    img {
      margin-left: 31px;
      cursor: pointer;
    }
    .action {
      padding-right: 20px;
      span {
        cursor: pointer;
        letter-spacing: 2px;
        display: inline-block;
        width: 73px;
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        a {
          color: @theme;
        }
        &:nth-of-type(1) {
          border-right: 1px solid @border;
        }
      }
    }
  }
  .content {
    min-width: 1200px;
    height: 718px;
    position: relative;
    background: url("~@/assets/bg/yj_bg_dlbg.png") center center no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-link {
      position: absolute;
      bottom: 0;
      width: 100%;
      .link {
        width: 100%;
      }
    }
  }
}
</style>
