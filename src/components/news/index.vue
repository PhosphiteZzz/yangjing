<template>
  <div class="news">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title-current">行业新闻</div>
      </div>
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top"><span class="icon"></span>行业新闻</div>
          <div class="menu-bot">
            <el-menu default-active="1-1">
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{ path: '/index/news/info' }"
                    >行业新闻</router-link
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
export default {};
</script>
<style lang="less" scoped>
.news {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .content-cont {
    height: auto;
  }
}
</style>