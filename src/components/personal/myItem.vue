<template>
  <div class="info">
    <div class="list-top">
      <div class="list-top-title">我的项目</div>
      <div class="list-top-search">
        <el-input
          v-model.trim="page.proName"
          placeholder="请输入项目名称"
          :maxlength="50"
        ></el-input>
        <span class="icon" @click="handleSearch"></span>
      </div>
    </div>
    <div class="list-bot" v-if="mainList.length > 0">
      <div class="list-bot-list">
        <div class="table">
          <div class="header">
            <p>项目公告名称</p>
            <p>采购公告</p>
            <p>项目类型</p>
            <p>采购形式</p>
            <p>购买时间</p>
            <p>操作</p>
          </div>
          <div class="item" v-for="item in mainList" :key="item.id">
            <div v-text="item.proName" :title="item.proName"></div>
            <div v-text="item.noticeTitle" :title="item.noticeTitle"></div>
            <div
              v-text="typeFormat(item.tradeType)"
              :title="typeFormat(item.tradeType)"
            ></div>
            <div
              v-text="bidFormat(item.bidType)"
              :title="bidFormat(item.bidType)"
            ></div>
            <div
              class="item-time"
              v-text="item.createTime"
              :title="item.createTime"
            ></div>
            <div>
              <span @click="downLoad(item.noticeId)">下载招标文件</span>
              <span @click="enterDetails(item.noticeId)">详情</span>
            </div>
          </div>
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
import { getMyItem } from "@/api/personal.js";
import { getDicts, downloadFiles } from "@/api/index.js";
export default {
  data() {
    return {
      total: 0,
      type: "trade_type,bid_type",
      tradeOptions: [],
      bidOptions: [],
      mainList: [],
      page: {
        proName: "",
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
        path: "/index/transdetails",
        query: {
          noticeId: id,
          fLeave: "交易信息",
          index: 0
        }
      });
    },
    /** 下载标书 */
    downLoad(id) {
      downloadFiles(id).then(result => {
        if (result.code === 200) {
          this.downloadFiles(result.msg);
        }
      });
    },
    // 字典翻译
    typeFormat(type) {
      return this.selectDictLabel(this.tradeOptions, type);
    },
    bidFormat(type) {
      return this.selectDictLabel(this.bidOptions, type);
    },
    /** 查询方法 */
    searchAction() {
      //主体信息
      getMyItem(this.page).then(result => {
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
    getDicts(this.type).then(result => {
      this.tradeOptions = result.data.trade_type;
      this.bidOptions = result.data.bid_type;
      this.searchAction();
    });
  }
};
</script>
<style lang="less" scoped>
.info {
  height: 100%;
  padding: 0 24px 0 14px;
  background: @white;
  .table {
    border: 1px solid @border-less;
    .header {
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
          width: 214px;
        }
        &:nth-of-type(2) {
          flex: 1;
        }
        &:nth-of-type(3) {
          padding: 0 13px;
        }
        &:nth-of-type(4) {
          width: 92px;
        }
        &:nth-of-type(5) {
          width: 102px;
        }
        &:nth-of-type(6) {
          width: 152px;
          border: none;
        }
      }
    }
    .item {
      display: flex;
      background: transparent;
      color: @font;
      font-weight: initial;
      border-bottom: 1px solid @border-less;
      &:nth-last-child(1) {
        border: none;
      }
      > div {
        text-align: center;
        border-right: 1px solid @border-less;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        word-break: break-all;
        &:nth-of-type(1) {
          width: 214px;
        }
        &:nth-of-type(2) {
          flex: 1;
        }
        &:nth-of-type(3) {
          padding: 0 13px;
        }
        &:nth-of-type(4) {
          width: 92px;
        }
        &:nth-of-type(5) {
          width: 102px;
          word-break: normal;
        }
        &:nth-of-type(6) {
          width: 152px;
          justify-content: space-around;
          border: none;
          span {
            cursor: pointer;
            color: @theme;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
