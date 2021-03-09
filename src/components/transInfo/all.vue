<template>
  <div class="all">
    <div class="list-bot" v-if="mainList.length > 0">
      <div class="list-bot-title">
        <div>采购公告</div>
        <div>发布时间</div>
      </div>
      <div class="list-bot-list">
        <div
          class="content-item"
          v-for="(item, index) in mainList"
          @click="enterDetails(item.id, item.type)"
          :key="index"
        >
          <div class="icon"></div>
          <div
            :class="[`n_${item.type}`]"
            v-text="`[${dict[item.type]}]`"
          ></div>
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
import { getTradeInfo } from "@/api/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      total: 0,
      mainList: [],
      page: {
        title: "",
        type: "",
        tradeType: "",
        pageNum: 1,
        pageSize: 7
      },
      dict: {
        notice: "采购公告",
        explanation: "澄清答疑",
        tender_hit: "成交结果公示"
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
    enterDetails(id, type) {
      let index = type === "tender_hit" ? "2" : type === "notice" ? "0" : "1";
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: id,
          fLeave: "交易信息",
          index
        }
      });
    },
    /** 查询方法 */
    searchAction() {
      //主体信息
      getTradeInfo(this.page).then(result => {
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
.all {
  background: @white;
  height: calc(100% - 72px);
  .list-bot {
    height: 100% !important;
    .list-bot-list {
      .content-item {
        .title {
          max-width: 700px;
        }
      }
    }
  }
}
.list-bot-list {
  .title {
    text-indent: 5px;
  }
}
</style>
