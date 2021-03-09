<template>
  <div class="details">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title" v-if="fLeave" @click="routerLeave">
          {{ fLeave }}>
        </div>
        <div class="title" v-if="tLeave" @click="routerLeave">
          {{ tLeave }}>
        </div>
        <div class="title-current">详情</div>
      </div>
      <div class="news-cont ql-container">
        <h3 class="title">{{ title }}</h3>
        <div class="time">{{ createTime }}</div>
        <div v-html="content" class="ql-editor"></div>
        <div v-if="sysFiles.length > 0">
          <div class="down-title">附件：</div>
          <div
            class="down-files"
            v-for="(item, index) in sysFiles"
            :key="index"
          >
            <a
              :href="location.origin + '/api' + item.path"
              :download="item.filename"
              target="_blank"
              >{{ item.filename }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetails } from "@/api/index.js";
export default {
  data() {
    return {
      id: "",
      fLeave: "",
      tLeave: "",
      content: "",
      title: "",
      location: location,
      sysFiles: [],
      createTime: ""
    };
  },
  methods: {
    routerLeave() {
      this.$router.go(-1);
    }
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length <= 0) {
      this.$message({
        type: "error",
        duration: 2000,
        center: true,
        message: "地址发生变化，回到上一层！"
      });
      this.routerLeave();
      return;
    }
    this.fLeave = query.fLeave;
    this.tLeave = query.tLeave;
    getDetails(query.id).then(result => {
      this.content = result.data.content;
      this.title = result.data.title;
      this.createTime = result.data.createTime;
      if (result.data.sysFiles) {
        this.sysFiles = result.data.sysFiles;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.details {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 41px;
  .news-cont {
    min-height: 678px;
    padding: 38px 72px;
    border: 1px solid @border-less;
    background-color: @white;
    h3 {
      font-size: 26px;
      color: @font;
      text-align: center;
      margin: 0;
      word-break: break-all;
    }
    .ql-editor {
      line-height: 30px;
      padding-left: 0;
      padding-right: 0;
    }
    .time {
      color: #777;
      text-align: center;
      font-size: 16px;
      margin-top: 10px;
      font-weight: 300;
    }
    .down-title {
      margin-top: 30px;
      font-size: 14px;
      line-height: 30px;
    }
    .down-files {
      line-height: 24px;
      a {
        cursor: pointer;
        color: #ac8458;
        text-decoration: underline;
      }
    }
  }
}
</style>
