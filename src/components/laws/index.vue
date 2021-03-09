<template>
  <div class="laws">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title no-cursor">法律法规></div>
        <div class="title-current">{{ name }}</div>
      </div>
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top"><span class="icon"></span>法律法规</div>
          <div class="menu-bot">
            <el-menu default-active="1-1">
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{ path: '/index/laws/law' }"
                    >法律法规</router-link
                  >
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link :to="{ path: '/index/laws/manage' }"
                    >管理制度</router-link
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
        this.name = this.$route.name.slice(0, 4);
      },
    },
  },
  created() {
    this.name = this.$route.name.slice(0, 4);
  },
};
</script>
<style lang="less" scoped>
.laws {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .content-cont {
    height: auto;
  }
}
</style>