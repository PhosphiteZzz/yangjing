<template>
  <div class="search">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">首页></div>
        <div class="title-current">搜索内容</div>
      </div>
      <section v-if="list.length > 0">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="enterDetails(item.id)"
        >
          <div class="title" v-text="item.title"></div>
          <div
            class="footer"
            v-text="'浏览人数：' + item.lookNum"
            v-if="searchType === 0"
          ></div>
          <div class="time" v-text="item.createTime"></div>
        </div>
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page.pageNum"
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </section>
      <section v-else>
        <no-result></no-result>
      </section>
    </div>
  </div>
</template>
<script>
import { searchIndex } from "@/api/index.js";
export default {
  data() {
    return {
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
    };
  },
  watch: {
    $route: {
      handler(value) {
        this.page.pageNum = 1;
        this.searchAction();
      },
      deep: true,
    },
  },
  methods: {
    enterDetails(id) {
      if (this.searchType === 0) {
        this.newsDetails(id);
        return;
      }
      this.noticeDetails(id);
    },
    newsDetails(id) {
      this.$router.push({
        path: "/index/details/",
        query: {
          id: id,
          fLeave: "行业新闻",
        },
      });
    },
    noticeDetails(id) {
      let index = this.searchType === 1 ? 0 : this.searchType === 2 ? 1 : 2;
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: id,
          fLeave: "交易信息",
          index: index,
        },
      });
    },
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.searchAction();
    },
    searchAction() {
      let query = this.$route.query;
      let params = Object.assign(query, this.page);
      this.searchType = Number(query.searchType);
      searchIndex(params).then((result) => {
        this.list = result.rows;
        this.total = result.total;
      });
    },
  },
  created() {
    this.searchAction();
  },
};
</script>
<style lang="less" scoped>
.search {
  background: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 30px;
}
section {
  height: 925px;
  padding: 21px 39px;
  background-color: @white;
  .item {
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid @border-less;
    .title {
      padding-top: 30px;
      padding-bottom: 39px;
      font-size: 16px;
      font-weight: 400;
      max-width: 960px;
      .overflow();
    }
    .content {
      width: 790px;
      .overflow();
      padding-top: 19px;
      font-size: 14px;
      color: #666666;
    }
    .footer {
      padding-bottom: 49px;
      font-size: 14px;
      color: #999999;
    }
    .time {
      position: absolute;
      color: #999999;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .pagination {
    height: 154px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /deep/.el-pagination {
      width: 550px;
    }
  }
}
</style>