<template>
  <div class="question">
    <div class="top">
      <div class="list-top">
        <div class="list-top-title">提问投诉</div>
        <div class="list-top-search">
          <el-input
            v-model.trim="page.proName"
            placeholder="请输入项目名称"
            :maxlength="50"
          ></el-input>
          <span class="icon" @click="handleSearch"></span>
        </div>
      </div>
      <div class="quest-tap">
        <div :class="['tap', { active: select === 0 }]" @click="tapChange(0)">
          <span class="icon quiz"></span>
          <span class="text">投诉提问</span>
        </div>
        <div :class="['tap', { active: select === 1 }]" @click="tapChange(1)">
          <span class="icon record"></span>
          <span class="text">提问记录</span>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="list-header">
        <p>项目名称</p>
        <p>采购公告</p>
        <p>项目类型</p>
        <p>项目状态</p>
        <p v-if="select">类型</p>
        <p>操作</p>
      </div>
      <div class="list-table">
        <div class="tr" v-for="(item, index) in record" :key="index">
          <p v-text="item.proName" :title="item.proName"></p>
          <p
            v-text="item.noticeTitle"
            v-if="!select"
            :title="item.noticeTitle"
          ></p>
          <p v-text="item.title" v-else :title="item.title"></p>
          <p
            v-text="typeFormat(item.tradeType)"
            :title="typeFormat(item.tradeType)"
          ></p>
          <p
            v-if="!select && item.notice"
            :class="handleStatus(item.notice.process)"
            v-text="item.notice.processName"
          ></p>
          <p
            v-else
            :class="handleStatus(item.process)"
            v-text="item.processName"
          ></p>
          <p v-if="select" v-text="item.type === '0' ? '提问' : '投诉'"></p>
          <p>
            <span class="button" @click="handleQuest(item)" v-if="!select"
              >提问投诉</span
            >
            <span
              :class="['button', { noAnswer: !item.answer }]"
              @click="handleReply(item, item.answer)"
              v-else
              >{{ item.answer ? "查看回复" : "未回复" }}</span
            >
          </p>
        </div>
      </div>
      <div class="list-pagination">
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
    <!-- 投诉提问框 -->
    <quest-modal @close="closeQuest" v-if="questViews" :ids="ids"></quest-modal>
    <!-- 回复框 -->
    <reply-modal
      v-if="replyViews"
      @close="closeReply"
      :replyId="replyId"
    ></reply-modal>
  </div>
</template>
<script>
import QuestModal from "./questModal.vue";
import ReplyModal from "./replyModal.vue";
import { getMyItem, getReplyList } from "@/api/personal.js";
import { getDicts } from "@/api/index.js";
export default {
  data() {
    return {
      select: 0,
      tradeOptions: [],
      questViews: false,
      replyViews: false,
      replyId: -1,
      questData: {},
      type: "trade_type",
      record: [],
      ids: {},
      total: 0,
      page: {
        proName: "",
        pageNum: 1,
        pageSize: 5
      }
    };
  },
  created() {
    getDicts(this.type).then(result => {
      this.tradeOptions = result.data;
      this.searchAction();
    });
  },
  components: {
    QuestModal,
    ReplyModal
  },
  methods: {
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.select === 0 ? this.searchAction() : this.replyAction();
    },
    searchAction() {
      getMyItem(this.page).then(result => {
        if (result.code === 200) {
          this.record = result.rows;
          this.total = result.total;
        }
      });
    },
    /** 搜索 */
    handleSearch() {
      this.page.pageNum = 1;
      this.select ? this.replyAction() : this.searchAction();
    },
    replyAction() {
      getReplyList(this.page).then(result => {
        if (result.code === 200) {
          this.record = result.rows;
          this.total = result.total;
        }
      });
    },
    /** 状态 */
    handleStatus(type) {
      let status =
        type === "0" ? "bidding" : type === "1" ? "process" : "ending";
      return status;
    },
    // 字典翻译
    typeFormat(type) {
      return this.selectDictLabel(this.tradeOptions, type);
    },
    /** 提问/投诉 */
    tapChange(type) {
      this.page.pageNum = 1;
      this.select = type;
      if (type === 0) {
        this.searchAction();
        return;
      }
      this.replyAction();
    },
    handleQuest(item) {
      this.ids = {
        noticeId: item.noticeId,
        projectId: item.projectId
      };
      this.questViews = true;
    },
    handleReply(item, type) {
      if (!type) {
        return;
      }
      this.replyId = item.id;
      this.replyViews = true;
    },
    closeQuest() {
      this.questViews = false;
    },
    closeReply() {
      this.replyViews = false;
    }
  }
};
</script>
<style lang="less" scoped>
.question {
  .top {
    padding: 0 22px 0 14px;
    background-color: @white;

    .quest-tap {
      border-top: 1px solid @border-less;
      display: flex;
      padding-left: 9px;
      .tap {
        width: 58px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 3px solid transparent;
        padding-top: 18px;
        cursor: pointer;
        &:nth-last-child(1) {
          margin-left: 42px;
        }
        .icon {
          display: inline-block;
          width: 46px;
          height: 46px;
        }
        .text {
          font-size: 14px;
          line-height: 34px;
          color: @theme;
        }
        .quiz {
          background: url("~@/assets/icon/yj_icon_tw.png") center center
            no-repeat;
        }
        .record {
          background: url("~@/assets/icon/yj_icon_jl.png") center center
            no-repeat;
        }
      }
      .active {
        border-color: @theme;
        .quiz {
          background: url("~@/assets/icon/yj_icon_tw_hover.png") center center
            no-repeat;
        }
        .record {
          background: url("~@/assets/icon/yj_icon_jl_hover.png") center center
            no-repeat;
        }
      }
    }
    .quest-list {
      height: 416px;
    }
  }
  .list {
    height: 416px;
    padding: 0 22px 0 14px;
    background: #ffffff;
    margin-top: 10px;
    padding-top: 26px;
    &-header {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      background-color: #f8f8f8;
      display: flex;
      text-align: center;
      justify-content: space-around;
      p {
        &:nth-of-type(1) {
          width: 166px;
        }
        &:nth-of-type(2) {
          flex: 1;
        }
        &:nth-of-type(3) {
          width: 150px;
        }
        &:nth-of-type(4) {
          width: 170px;
        }
        &:nth-of-type(5) {
          width: 100px;
        }
        &:nth-of-type(6) {
          width: 100px;
        }
      }
    }
    &-table {
      min-height: 250px;
      .tr {
        display: flex;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px dashed @border-less;
        justify-content: space-between;
        p {
          text-align: center;
          .overflow();
          &:nth-of-type(1) {
            width: 166px;
          }
          &:nth-of-type(2) {
            flex: 1;
            max-width: 297px;
            .overflow();
          }
          &:nth-of-type(3) {
            width: 150px;
          }
          &:nth-of-type(4) {
            width: 170px;
          }
          &:nth-of-type(5) {
            width: 100px;
          }
          &:nth-of-type(6) {
            width: 100px;
          }
        }
        .button {
          display: inline-block;
          width: 70px;
          height: 32px;
          background: #ac8458;
          border-radius: 16px;
          font-size: 12px;
          color: @white;
          line-height: 32px;
          cursor: pointer;
        }
        //进行中
        .process {
          color: @fontBlue;
        }
        //招标中
        .bidding {
          color: #1bdeea;
        }
        //已结束
        .ending {
          color: @grey;
        }
        .noAnswer {
          background: #cccccc;
        }
      }
    }
    &-pagination {
      height: calc(~"100% - 300px");
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
