<template>
  <div class="downcenter">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">首页></div>
        <div class="title no-cursor">下载中心></div>
        <div class="title-current">下载中心</div>
      </div>
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top"><span class="icon"></span>下载中心</div>
          <div class="menu-bot">
            <el-menu default-active="1-1">
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{ path: '/index/downcenter/down' }"
                    >下载中心</router-link
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
.downcenter {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .content-cont {
    height: auto;
  }
}
</style>