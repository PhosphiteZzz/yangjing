<template>
  <div class="recent">
    <div class="list-top">
      <div class="list-top-title">近期项目</div>
      <div class="list-top-btn">
        <span :class="{ active: week === -1 }" @click="changeWeek(-1)"
          >上周</span
        >
        <span :class="{ active: week === 0 }" @click="changeWeek(0)">本周</span>
        <span :class="{ active: week === 1 }" @click="changeWeek(1)">下周</span>
      </div>
    </div>
    <template v-if="currentList.length">
      <div class="list-table">
        <div class="table">
          <div class="header">
            <p>日期</p>
            <p>项目名称</p>
            <p>项目类型</p>
            <p>开标地点</p>
          </div>
          <div class="item" v-for="(item, index) in currentList" :key="index">
            <p v-text="item.sendEndTime"></p>
            <p v-text="item.proName" :title="item.proName"></p>
            <p
              v-text="typeFormat(item.tradeType)"
              :title="typeFormat(item.tradeType)"
            ></p>
            <p v-text="item.room" :title="item.room"></p>
          </div>
        </div>
      </div>
      <div class="list-bot-foot">
        <el-pagination
          :page-size="page.pageSize"
          :current-page.sync="page.pageNum"
          :total="total"
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </template>
    <template v-else>
      <no-agenda />
    </template>
  </div>
</template>
<script>
import { getScheduleByWeek, getDicts } from "@/api/index.js";
import NoAgenda from "./noAgenda.vue";
import noAgenda from "./noAgenda.vue";

export default {
  components: { noAgenda },
  component: {
    NoAgenda
  },
  data() {
    return {
      week: 0,
      type: "trade_type",
      tradeOptions: [],
      currentList: [],
      total: 0,
      page: {
        pageSize: 7,
        pageNum: 1
      }
    };
  },
  methods: {
    // 字典翻译
    typeFormat(type) {
      return this.selectDictLabel(this.tradeOptions, type);
    },
    changeWeek(type) {
      this.week = type;
      this.handleAction();
    },
    /** 请求方法 */
    handleAction() {
      getScheduleByWeek(this.week).then(result => {
        this.total = result.total;
        this.currentList = result.rows;
      });
    },

    /** page改变时会触发 */
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.handleAction();
    }
  },
  created() {
    this.handleAction();
    getDicts(this.type).then(result => {
      this.tradeOptions = result.data;
    });
  }
};
</script>
<style lang="less" scoped>
.recent {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: @white;
  padding: 0 14px;
  .list-top {
    &-btn {
      span {
        display: inline-block;
        width: 102px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: #ccc;
        border-radius: 4px;
        font-size: 14px;
        margin-right: 6px;
        color: #ffffff;
        cursor: pointer;
      }
      .active {
        background: @theme;
      }
    }
  }
  .list-table {
    flex: 1;
    padding-top: 10px;
    max-height: 528px;
    overflow-y: auto;
    .table {
      border: 1px solid @border-less;

      .header,
      .item {
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #fffbf7;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid @border-less;
        color: @theme;
        p {
          text-align: center;
          border-right: 1px solid @border-less;
          &:nth-of-type(1) {
            width: 160px;
          }
          &:nth-of-type(2) {
            flex: 1;
            max-width: 356px;
            .overflow();
          }
          &:nth-of-type(3) {
            width: 99px;
          }
          &:nth-of-type(4) {
            width: 274px;
            border: none;
          }
        }
      }
      .item {
        height: 49px;
        line-height: 49px;
        background: transparent;
        color: @font;
        font-weight: initial;
        p {
          .overflow();
          max-width: 630px;
        }
        &:nth-last-of-type(1) {
          border-bottom: none;
        }
      }
    }
  }

  .list-table-page {
    height: 95px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
