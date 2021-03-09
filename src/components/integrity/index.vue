<template>
  <div class="integrity">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title no-cursor">诚信信息></div>
        <div class="title-current">{{ name }}</div>
      </div>
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top"><span class="icon"></span>诚信信息</div>
          <div class="menu-bot">
            <el-menu default-active="1-1">
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{ path: '/index/integrity/illegal' }"
                    >违法违规</router-link
                  >
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link :to="{ path: '/index/integrity/blacklist' }"
                    >黑名单</router-link
                  >
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </div>
        </div>
        <div class="cont-list">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  watch: {
    $route: {
      handler(value) {
        this.name = this.$route.name;
      },
    },
  },
  created() {
    this.name = this.$route.name;
  },
};
</script>
<style lang="less" scoped>
.integrity {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .content-cont {
    height: auto;
  }
}
</style>