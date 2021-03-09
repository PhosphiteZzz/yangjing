<template>
  <div class="aboutus">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title no-cursor">关于我们></div>
        <div class="title-current">详情</div>
      </div>
      <div class="details-cont ql-container">
        <div v-html="main.content" class="ql-editor"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMoreInfo } from "@/api/index.js";
export default {
  data() {
    return {
      main: {},
      config: "about",
    };
  },
  methods: {
    searchAction() {
      //主体信息
      getMoreInfo(this.config, this.page).then((result) => {
        if (result.rows.length > 0) {
          this.main = result.rows[0];
        }
      });
    },
  },
  created() {
    this.searchAction();
  },
};
</script>
<style lang="less" scoped>
.aboutus {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .details-cont {
    min-height: 678px;
    padding: 38px 72px;
    border: 1px solid @border-less;
    background-color: @white;
    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 24px;
    }
  }
}
</style>