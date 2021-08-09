<template>
  <div class="index">
    <header>
      <div class="title-box">
        <!-- logo -->
        <div class="title-box-logo">
          <img
            :src="require('@/assets/bg/logo.png')"
            title="洋井集团电子采购平台"
            alt="洋井集团电子采购平台"
            @click="routerJump"
          />
        </div>
        <!-- 导航栏 -->
        <div class="title-box-nav">
          <div
            class="router-item"
            v-for="(item, index) in routerList"
            :key="index"
          >
            <router-link :to="item.path" v-text="item.name"></router-link>
          </div>
          <!-- 个人中心 -->
          <div
            class="title-box-personal"
            v-if="showPersonal"
            @click="handlePersonClick"
            @mouseover="handleSelect(true)"
          >
            <span class="icon"></span>
            <div>
              欢迎，<span class="user" :title="user">{{ user }}</span>
              <div class="select" v-show="showSelect" v-blank="handleClose">
                <div @click="handleClose">
                  <span @click.stop="personalInfo">用户中心</span>
                </div>
                <div @click="handleClose">
                  <span @click.stop="personalEditPwd">修改密码</span>
                </div>
                <div class="quit" @click.stop="quit">退出</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="title-box-search" @click="openSearch"></div>
      </div>
      <!-- 搜索栏 -->
      <div
        :class="['title-search', { 'animated fadeInDown': showSearch }]"
        v-show="showSearch"
      >
        <div class="searchBox">
          <el-input
            class="search-input"
            v-model="searchValue"
            placeholder="请输入您要搜索的关键词"
            :maxlength="50"
            @keyup.enter.native="handleSearch"
          >
            <i
              slot="suffix"
              v-show="searchValue"
              class="animated fadeIn"
              @click="handleClear"
            ></i>
          </el-input>
          <el-select
            v-model="searchSelect"
            placeholder="请选择"
            :popper-append-to-body="false"
            class="search-select"
          >
            <el-option
              v-for="item in searchOptions"
              :key="item.value"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </div>

        <span class="search-icon" @click="handleSearch"></span>
        <span class="close-icon" @click="closeSearch"></span>
      </div>
    </header>
    <section>
      <router-view></router-view>
    </section>
    <!-- 底部链接 -->
    <div class="footer">
      <custom-link></custom-link>
      <custom-footer></custom-footer>
    </div>
  </div>
</template>
<script>
/**
 * 主体内容 index
 * @author li_xiangjian
 */
import queryString from "querystring";
import router from "@/router/index.js";
import { getToken, removeToken, getUser, removeUser } from "@/utils/auth.js";
export default {
  data() {
    return {
      routerList: [],
      selected: 0,
      value: "",
      searchValue: "",
      searchSelect: 0,
      showSearch: false,
      showPersonal: true,
      showSelect: false,
      user: getUser(),
      searchOptions: [
        {
          dictValue: 0,
          dictLabel: "行业新闻"
        },
        {
          dictValue: 1,
          dictLabel: "采购公告"
        },
        {
          dictValue: 2,
          dictLabel: "澄清答疑"
        },
        {
          dictValue: 3,
          dictLabel: "中标公示"
        }
      ]
    };
  },
  methods: {
    /** 用户中心跳转 */
    personalInfo() {
      this.$router.push({
        path: "/index/personal/infor"
      });
      this.handleClose();
    },
    /** 修改密码跳转 */
    personalEditPwd() {
      this.$router.push({
        path: "/index/personal/editPwd"
      });
      this.handleClose();
    },
    routerJump() {
      this.$router.push({
        path: "/"
      });
    },
    /** 清空搜索框 */
    handleClear() {
      this.searchValue = null;
    },
    /**  */
    handlePersonClick() {
      this.$router.push({
        path: "/index/personal"
      });
    },
    /** 搜索 */
    handleSearch() {
      this.$router.push({
        path: "/index/search",
        query: {
          searchType: this.searchSelect,
          searchText: this.searchValue
        }
      });
    },
    /** 打开搜索框 */
    openSearch() {
      if (this.showSearch) {
        this.showSearch = false;
        return;
      }
      this.showSearch = true;
    },
    /** 关闭搜索框 */
    closeSearch() {
      this.showSearch = false;
    },
    /**
     * 获取路由菜单
     */
    getRouteList() {
      let routers = router.options.routes;
      let routerList = [];
      let list = routers.filter(item => {
        return item.path === "/index";
      });
      list.forEach(item => {
        routerList = item.children;
      });
      this.routerList = routerList.filter(item => {
        return item.alias === "nav";
      });
    },
    /** 展示用户下拉 */
    handleSelect(type) {
      this.showSelect = type;
    },
    /** 判断是否登录 */
    loginStatus() {
      let token = getToken();
      let user = getUser();
      //如果token或者user被清掉了，就不展示用户中心，并且删掉token或user
      if (!token || !user) {
        this.showPersonal = false;
        removeToken();
        removeUser();
      }
    },
    /** 点击空白关闭下拉 */
    handleClose() {
      this.showSelect = false;
    },
    /** 退出 */
    quit() {
      removeToken();
      removeUser();
      this.handleClose();
      this.showPersonal = false;
      this.$message({
        type: "success",
        message: "您已成功退出登录！",
        //duration: 2000,
        center: true
      });
      //如果在用户中心退出，直接跳到首页
      if (this.$route.fullPath.indexOf("personal") !== -1) {
        this.$router.replace({
          path: "/index"
        });
      }
    }
  },
  created() {
    this.getRouteList();
    this.loginStatus();
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  min-width: 1440px;
  header {
    height: 520px;
    min-width: 1200px;
    background: url("~@/assets/bg/yj_banner.png") top center no-repeat;
    background-size: 100% 100%;
    position: relative;
    .title-box {
      height: 100px;
      background: rgba(255, 255, 255, 0.6);
      display: flex;
      position: relative;
      &-logo {
        width: 570px;
        position: relative;
        img {
          position: absolute;
          cursor: pointer;
          left: 31px;
          top: 20px;
        }
      }
      &-nav {
        flex: 1;
        .router-item {
          float: left;
          padding: 0 21px;
          height: 100%;
          line-height: 100px;
          text-align: center;
          font-size: 16px;
          color: @white;
          cursor: pointer;
          &:last-child {
            background: none;
          }
          &:hover {
            a {
              color: @theme;
            }
          }
          > a {
            display: inline-block;
            color: @font;
            font-size: 18px;
            width: 100%;
            height: 100%;
            font-family: Microsoft YaHei;
            font-weight: 500;
          }
          .active-router {
            color: @theme;
          }
          &:nth-last-child(1) {
            padding-right: 0;
          }
        }
      }
      &-search {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 39px;
        top: 40px;
        cursor: pointer;
        background: url("~@/assets/icon/yj_icon_ss.png") center center no-repeat;
        background-size: 100% 100%;
      }
      &-personal {
        position: absolute;
        display: flex;
        right: 110px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        align-items: center;
        > div {
          position: relative;
          .select {
            position: absolute;
            top: 25px;
            width: 170px;
            height: 142px;
            background: #ffffff;
            box-shadow: 0px 4px 5px 0px rgba(175, 175, 175, 0.3);
            opacity: 0.7;
            border-radius: 6px;
            > div {
              height: 47px;
              line-height: 47px;
              text-align: center;
              span {
                display: inline-block;
                width: 100%;
                height: 100%;
              }
            }
            .quit {
              border-top: 1px solid @border-less;
            }
          }
        }
        .icon {
          width: 14px;
          height: 14px;
          display: inline-block;
          background: url("~@/assets/icon/yj_icon_yhjs.png") center center
            no-repeat;
          margin-right: 10px;
        }
        .user {
          display: inline-block;
          vertical-align: top;
          width: 140px;
          .overflow();
          height: 14px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: @font;
        }
      }
    }
    .title-search {
      height: 90px;
      background: rgba(51, 51, 51, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      animation-duration: 0.5s;
      position: relative;
      .searchBox {
        position: relative;
      }
      .search-input {
        width: 700px;
        background-color: transparent;
        border: 1px solid @white;
        border-radius: 28px;
        /deep/.el-input__suffix {
          &:nth-of-type(1) {
            width: 21px;
            height: 21px;
            position: absolute;
            top: 50%;
            right: 29%;
            transform: translateY(-50%);
          }
          .el-input__suffix-inner {
            display: inline-block;
            width: 21px;
            height: 21px;
            i {
              &:nth-of-type(1) {
                display: inline-block;
                width: 21px;
                height: 21px;
                cursor: pointer;
                background: url("~@/assets/icon/yj_icon_gbnr.png") center center
                  no-repeat;
              }
            }
          }
        }

        /deep/.el-input__inner {
          height: 55px;
          text-indent: 30px;
          font-size: 16px;
          max-width: 478px;
          line-height: 55px;
          color: @white;
          background-color: transparent;
          border: none;
          &::-webkit-input-placeholder {
            color: @white;
          }
          &::-moz-placeholder {
            color: @white;
          }
          &::-ms-input-placeholder {
            color: @white;
          }
        }
      }
      .search-select {
        position: absolute;
        width: 110px;
        right: 14.3%;
        top: 50%;
        transform: translateY(-50%);
        /deep/.el-input__inner {
          text-align: center;
          color: @white;
          border: none;
          background: transparent;
          &::-webkit-input-placeholder {
            color: @white;
          }
          &::-moz-placeholder {
            color: @white;
          }
          &::-ms-input-placeholder {
            color: @white;
          }
        }
        /deep/.el-select-dropdown {
          border: none;
          background-color: rgba(51, 51, 51, 0.5);
          .el-select-dropdown__list {
            padding: 0;
          }
          .el-select-dropdown__item {
            color: @white;
            &:hover {
              background-color: rgba(51, 51, 51, 0.5);
            }
          }
          .hover {
            background-color: rgba(51, 51, 51, 0.5);
          }
          .popper__arrow {
            display: none;
          }
        }
      }
      .search-icon {
        position: relative;
        z-index: 10;
        width: 21px;
        height: 21px;
        margin-left: -61px;
        cursor: pointer;
        background: url("~@/assets/icon/yj_icon_ss2.png") center center
          no-repeat;
      }
      .empty-icon {
        width: 21px;
        height: 21px;
        margin-left: -161px;
        cursor: pointer;
        background: url("~@/assets/icon/yj_icon_gbnr.png") center center
          no-repeat;
      }
      .close-icon {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 35px;
        top: 50%;
        cursor: pointer;
        background: url("~@/assets/icon/yj_icon_gbss.png") center center
          no-repeat;
        transform: translateY(-50%);
      }
    }
  }
  .footer {
    height: 330px;
  }
}
</style>
