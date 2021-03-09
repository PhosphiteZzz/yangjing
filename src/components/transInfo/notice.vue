<template>
  <div class="notice">
    <div class="list-bot" v-if="annonList.length > 0">
      <div class="list-bot-title">
        <div>采购公告</div>
        <div>发布时间</div>
      </div>
      <div class="list-bot-list">
        <div
          class="content-item"
          v-for="(item, index) in annonList"
          @click="enterDetails(item.id)"
          :key="index"
        >
          <div class="icon"></div>
          <div class="title" v-text="item.title"></div>
          <div class="time" v-text="timeTransFor(item.createTime)"></div>
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
import { getTradeInfo } from "@/api/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      total: 0,
      annonList: [],
      page: {
        title: "",
        type: "notice",
        tradeType: "0",
        pageNum: 1,
        pageSize: 7
      }
    };
  },
  computed: {
    ...mapState("transInfo", ["searchTitle"])
  },
  watch: {
    $route: {
      handler(value) {
        if (Object.keys(value.query).length > 0) {
          this.page.tradeType = value.query.tradeType;
          this.page.pageNum = 1;
          this.searchAction();
        }
      },
      deep: true
    },
    searchTitle: {
      handler(result) {
        this.page.pageNum = 1;
        this.page.title = result;
        this.searchAction();
      }
    }
  },
  methods: {
    /** 查询 */
    handleSearch() {
      this.searchAction();
    },
    /** 进入详情 */
    enterDetails(id) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: id,
          fLeave: "交易信息",
          index: 0
        }
      });
    },
    /** 格式化时间格式 */
    timeFormatter(time) {
      return time.split(" ")[0];
    },
    /** 查询方法 */
    searchAction() {
      //主体信息
      getTradeInfo(this.page).then(result => {
        this.annonList = result.rows;
        this.total = result.total;
      });
    },
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.searchAction();
    }
  },
  created() {
    let result = this.$route.query;
    this.page.tradeType = result.tradeType;
    this.page.title = result.record;
    this.searchAction();
  }
};
</script>
<style lang="less" scoped>
.notice {
  background: @white;
  height: calc(100% - 72px);
  .list-bot {
    height: 100% !important;
  }
  .common-item {
    .title {
      max-width: 552px;
    }
  }
}
</style>
