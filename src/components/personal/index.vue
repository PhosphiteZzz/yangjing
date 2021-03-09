<template>
  <div class="personal">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title no-cursor">用户中心></div>
        <div class="title-current">{{ name }}</div>
      </div>
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top"><span class="icon"></span>用户中心</div>
          <div class="menu-bot">
            <el-menu default-active="1-1">
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{ path: '/index/personal/infor' }"
                    >信息管理</router-link
                  >
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link :to="{ path: '/index/personal/myItem' }"
                    >我的项目</router-link
                  >
                </el-menu-item>
                <el-menu-item index="1-3"
                  ><router-link :to="{ path: '/index/personal/editPwd' }"
                    >修改密码</router-link
                  ></el-menu-item
                >
                <el-menu-item index="1-4"
                  ><router-link :to="{ path: '/index/personal/message' }"
                    >消息通知</router-link
                  ></el-menu-item
                >
                <el-menu-item index="1-5"
                  ><router-link :to="{ path: '/index/personal/question' }"
                    >提问投诉</router-link
                  ></el-menu-item
                >
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
      form: {},
      type: true
    };
  },
  watch: {
    $route: {
      handler(value) {
        this.name = this.$route.name.slice(0, 4);
      }
    }
  },
  methods: {
    /** 修改个人资料 */
    handleEdit() {
      this.type = false;
    },
    /** 返回 */
    cancel() {
      this.type = true;
    }
  },
  created() {
    this.name = this.$route.name.slice(0, 4);
  }
};
</script>
<style lang="less" scoped>
.personal {
  padding-top: 20px;
  background-color: #f8f8f8;
  padding-bottom: 41px;
  /deep/.el-form-item__label {
    text-align: left;
  }
  .content-cont {
    height: auto;
    .cont-menu {
      .menu-top {
        .icon {
          background: url("~@/assets/icon/usercenter.png") center center
            no-repeat;
        }
      }
    }
  }
}
</style>
