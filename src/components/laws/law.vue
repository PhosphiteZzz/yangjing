<template>
  <div class="law">
    <div class="list-top">
      <div class="list-top-title">法律法规</div>
      <div class="list-top-search">
        <el-input
          v-model.trim="page.title"
          placeholder="请输入关键字"
          :maxlength="50"
        ></el-input>
        <span class="icon" @click="handleSearch"></span>
      </div>
    </div>
    <div class="list-bot" v-if="mainList.length > 0">
      <div class="list-bot-title">
        <div>标题</div>
        <div>发布时间</div>
      </div>
      <div class="list-bot-list">
        <div
          class="content-item"
          v-for="(item, index) in mainList"
          @click="enterDetails(item.id)"
          :key="index"
        >
          <div class="icon"></div>
          <div class="title" v-text="item.title" :title="item.title"></div>
          <div
            class="time"
            v-text="timeTransFor(item.createTime)"
            :title="timeTransFor(item.createTime)"
          ></div>
        </div>
      </div>
      <div class="list-bot-foot">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page.pageNum"
          :page-size="page.pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div v-else class="list-bot">
      <no-result></no-result>
    </div>
  </div>
</template>
<script>
import { getMoreInfo } from "@/api/index.js";
export default {
  data() {
    return {
      total: 0,
      mainList: [],
      config: "law",
      page: {
        title: "",
        pageNum: 1,
        pageSize: 7
      }
    };
  },
  methods: {
    /** 查询 */
    handleSearch() {
      this.searchAction();
    },
    /** 进入详情 */
    enterDetails(id) {
      this.$router.push({
        path: "/index/details/",
        query: {
          id: id,
          fLeave: "法律法规",
          tLeave: "法律法规"
        }
      });
    },
    /** 查询方法 */
    searchAction() {
      //主体信息
      getMoreInfo(this.config, this.page).then(result => {
        this.mainList = result.rows;
        this.total = result.total;
      });
    },
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.searchAction();
    }
  },
  created() {
    this.searchAction();
  }
};
</script>
<style lang="less" scoped>
.law {
  height: 100%;
  padding: 0 24px 0 14px;
  background: @white;
  .list-bot {
    background: @white;
  }
}
</style>
