<template>
  <div id="transInfo">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title">
          <router-link
            :to="{
              path: '/index/transInfo/all',
              query: {
                record: title
              }
            }"
            >交易信息></router-link
          >
        </div>
        <div class="title no-cursor" v-if="prevName">{{ prevName }}></div>
        <div class="title-current">{{ name }}</div>
      </div>
      <!-- 列表 -->
      <div class="content-cont">
        <div class="cont-menu">
          <div class="menu-top">
            <span class="icon"></span
            ><router-link
              :to="{
                path: '/index/transInfo/all',
                query: {
                  record: title
                }
              }"
              >交易信息</router-link
            >
          </div>
          <div class="menu-bot">
            <el-menu
              :default-openeds="openeds"
              :default-active="actives"
              v-if="openeds.length > 0"
              unique-opened
            >
              <el-submenu
                v-for="(item, idx) in menuList"
                :index="`${idx + 1}`"
                :key="idx"
              >
                <template slot="title">
                  <span v-text="item.dictLabel"></span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="`${idx + 1}-1`">
                    <router-link
                      :to="{
                        path: '/index/transInfo/notice',
                        query: {
                          tradeType: item.dictValue,
                          record: title
                        }
                      }"
                      >采购公告</router-link
                    >
                  </el-menu-item>
                  <el-menu-item :index="`${idx + 1}-2`">
                    <router-link
                      :to="{
                        path: '/index/transInfo/clarify',
                        query: {
                          tradeType: item.dictValue,
                          record: title
                        }
                      }"
                      >澄清答疑</router-link
                    >
                  </el-menu-item>
                  <el-menu-item :index="`${idx + 1}-3`">
                    <router-link
                      :to="{
                        path: '/index/transInfo/result',
                        query: {
                          tradeType: item.dictValue,
                          record: title
                        }
                      }"
                      >成交结果公示</router-link
                    >
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </div>
        <div class="cont-list">
          <div class="list-top">
            <div class="list-top-title">{{ conName }}</div>
            <div class="list-top-search" v-blank="handleClose">
              <el-input
                v-model.trim="title"
                placeholder="请输入关键字"
                @focus="handleFocus"
                :maxlength="50"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-close"
                  @click.stop="clearTitle"
                  v-show="title.length > 0"
                ></i>
              </el-input>
              <div class="history" v-show="showHistory">
                <div
                  v-for="(item, index) in hisList"
                  :key="index"
                  v-text="item"
                  @click.stop="selectHistory(item)"
                ></div>
              </div>
              <span class="icon" @click="handleSearch"></span>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 交易信息 transInfo
 * @author li_xiangjian
 */
import { getDicts, getNoticeList } from "@/api/index.js";
import { mapMutations } from "vuex";
import { getHistory, setHistory, removeHistory } from "@/utils/auth.js";
export default {
  data() {
    return {
      name: "",
      prevName: "",
      conName: "",
      title: "",
      actives: "",
      openeds: [],
      hisList: [],
      type: "trade_type",
      showHistory: false,
      menuList: [],
      menuPath: ["notice", "clarify", "result"]
    };
  },
  watch: {
    $route: {
      handler(value) {
        this.name = this.$route.name;
        this.prevName = this.selectDictLabel(
          this.menuList,
          this.$route.query.tradeType
        );
        this.changeNameByRoute();
      }
    }
  },
  created() {
    // this.title = this.$route.query.record;
    this.handleClear();
    this.changeNameByRoute();
    this.getDict();
    this.routeActive(this.$route);
  },
  methods: {
    ...mapMutations("transInfo", ["setTitle"]),
    /** sousuo */
    handleSearch() {
      setHistory(this.title);
      this.setTitle(this.title);
    },
    /** 清空搜索条件 */
    handleClear() {
      let newQuery = JSON.parse(JSON.stringify(this.$route.query));
      if (newQuery.record) {
        newQuery.record = "";
        this.$router.replace({ query: newQuery });
      }
    },
    /** 清空搜索 */
    clearTitle() {
      this.title = "";
    },
    /** 输入框获取焦点 */
    handleFocus() {
      if (getHistory()) {
        this.hisList = getHistory().split(",");
        this.showHistory = true;
      }
    },
    /** 输入框失去焦点 */
    handleClose() {
      this.showHistory = false;
    },
    /** 选择历史记录 */
    selectHistory(item) {
      this.title = item;
      this.handleClose();
    },
    /** 获取字典 */
    getDict() {
      getDicts(this.type).then(result => {
        this.menuList = result.data;
        this.prevName = this.selectDictLabel(
          this.menuList,
          this.$route.query.tradeType
        );
        this.name = this.$route.name;
      });
    },
    /** 路由高亮判断 */
    routeActive(route) {
      let query = route.query;
      if (query.tradeType) {
        this.openeds = query.tradeType === "0" ? ["1"] : ["2"];
        this.menuPath.forEach((item, index) => {
          if (route.path.indexOf(item) !== -1) {
            this.actives = `${Number(query.tradeType) + 1}-${index + 1}`;
          }
        });
        return;
      }
      this.openeds = ["1"];
      this.actives = "1-1";
    },
    /** 根据路由改变名称 */
    changeNameByRoute() {
      let route = this.$route;
      this.conName = route.name;
      if (route.path === "/index/transInfo/all") {
        this.conName = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.menu-top {
  a {
    color: @white;
  }
  .active-router {
    color: @white;
    a {
      color: @white;
    }
  }
}
.menu-bot {
  /deep/.el-menu {
    .is-opened {
      // span {
      //   font-weight: bold;
      // }
      .el-submenu__title {
        background-color: #f7f2ee;
      }
    }
  }
}
#transInfo {
  padding-top: 20px;
  background-color: #f8f8f8;
  padding-bottom: 41px;
  /deep/ .el-menu {
    // a {
    //   color: @font;
    // }
    .el-menu-item {
      a {
        text-indent: 17px;
        text-align: left;
      }
    }
    .is-active {
      .active-router {
        color: @theme;
        font-weight: bold;
        a {
          color: @theme;
        }
      }
    }
    .active-router {
      color: @font;
      font-weight: normal;
      a {
        color: @font;
      }
    }
  }

  .cont-list {
    background-color: @white;
    padding: 0 24px 0 14px;
    .list-top {
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-title {
        padding-left: 10px;
        border-left: 4px solid @theme;
        line-height: 18px;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
      &-search {
        display: flex;
        justify-content: center;
        position: relative;
        /deep/.el-input {
          .el-input__inner {
            border-radius: 0;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            border-right: 0;
            padding: 0 15px;
          }
          .el-input__suffix {
            font-size: 20px;
            cursor: pointer;
          }
        }
        .icon {
          display: inline-block;
          width: 67px;
          height: 40px;
          cursor: pointer;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background: @theme url("~@/assets/icon/yj_icon_ssb.png") center center
            no-repeat;
        }
        .history {
          position: absolute;
          left: 0;
          background: @white;
          top: 40px;
          min-width: 214px;
          height: 200px;
          border: 1px solid @border-less;
          overflow-y: auto;
          > div {
            cursor: pointer;
            color: @grey;
            padding: 0 15px;
            line-height: 36px;
            font-size: 14px;
          }
        }
      }
    }
    .list-bot {
      height: calc(100% - 72px);
      display: flex;
      flex-direction: column;
      &-title {
        color: @theme;
        font-size: 14px;
        font-weight: bold;
        padding: 0 28px 0 10px;
        height: 48px;
        line-height: 48px;
        background: #fffbf7;
      }
      &-list {
        flex: 1;
        .common-item {
          .title {
            max-width: 590px;
          }
        }
      }
      &-foot {
        height: 95px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /deep/.el-pagination {
          width: 550px;
        }
      }
    }
  }
}
</style>
