<template>
  <div class="subinfor">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title no-cursor">供应商管理></div>
        <div class="title-current">供应商</div>
      </div>
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top"><span class="icon"></span>供应商管理</div>
          <div class="menu-bot">
            <el-menu default-active="1-1">
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{ path: '/index/subinfor/supplier' }"
                    >供应商</router-link
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
    return {};
  }
};
</script>
<style lang="less" scoped>
.subinfor {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .content-cont {
    height: auto;
  }
}
</style>