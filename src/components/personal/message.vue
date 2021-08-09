<template>
  <div class="message">
    <div class="list-top">
      <div class="list-top-title">消息通知</div>
      <div class="list-top-search">
        <el-input
          v-model.trim="page.targetTitle"
          placeholder="请输入关键字"
          :maxlength="50"
        ></el-input>
        <span class="icon" @click="handleSearch"></span>
      </div>
    </div>
    <div class="list-bot" v-if="messageList.length > 0">
      <div class="list-bot-list">
        <div
          :class="['pro-item', { active: selectIdx === index }]"
          v-for="(item, index) in messageList"
          :key="index"
          @click="handleClick(index)"
        >
          <div class="pro-item-cont">
            <h3 :title="item.content">
              <span class="icon"></span>{{ item.content }}
            </h3>
            <p @click="openDetails(item)" :title="item.targetTitle">
              {{ item.targetTitle }}
            </p>
          </div>
          <div class="pro-item-time">{{ item.createTime }}</div>
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
    <!-- 回复框 -->
    <reply-modal
      v-if="replyViews"
      @close="closeReply"
      :replyId="replyId"
    ></reply-modal>
  </div>
</template>
<script>
import { getMessageList } from "@/api/personal.js";
import ReplyModal from "./replyModal.vue";

export default {
  data() {
    return {
      selectIdx: null,
      messageList: [],
      replyViews: false,
      replyId: -1,
      total: 0,
      page: {
        targetTitle: "",
        pageNum: 1,
        pageSize: 5
      }
    };
  },
  components: {
    ReplyModal
  },
  methods: {
    /** 查询 */
    handleSearch() {
      this.searchAction();
    },
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.searchAction();
    },
    handleClick(index) {
      this.selectIdx = index;
    },
    searchAction() {
      getMessageList(this.page).then(result => {
        this.messageList = result.rows;
        this.total = result.total;
      });
    },
    closeReply() {
      this.replyViews = false;
    },
    /** 打开消息通知详情 */
    openDetails(item) {
      let type = {
        explanation: this.explanationFn,
        tender_hit: this.tenderHitFn,
        question: this.questionFn,
        open_notice: this.openNoticeFn
      };
      if(!type[item.targetType]){
        return;
      }
      type[item.targetType](item);
    },
    /** 答复 */
    questionFn(item) {
      this.replyId = item.targetId;
      this.replyViews = true;
    },
    /** 成交结果公示 */
    tenderHitFn(item) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: item.targetId,
          fLeave: "交易信息",
          index: 2
        }
      });
    },
    /** 采购公告公示 */
    openNoticeFn(item) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: item.targetId,
          fLeave: "交易信息",
          index: 0
        }
      });
    },
    /** 澄清答疑 */
    explanationFn(item) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: item.targetId,
          fLeave: "交易信息",
          index: 1
        }
      });
    }
  },
  created() {
    this.searchAction();
  }
};
</script>
<style lang="less" scoped>
.message {
  height: 100%;
  padding: 0 24px 0 14px;
  background: @white;
  .list-bot {
    border-top: 1px solid @border-less;
    &-list {
      .pro-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: @white;
        height: 99px;
        margin-top: 14px;
        margin-bottom: 14px;
        padding-right: 30px;
        margin-left: 23px;
        padding-left: 15px;
        border-radius: 6px;
        &-cont {
          display: flex;
          flex-direction: column;
          justify-content: center;
          h3 {
            font-size: 16px;
            font-weight: 400;
            position: relative;
            color: #333333;
            word-wrap: break-word;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; 
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            .icon {
              position: absolute;
              left: -36px;
              top: 0;
              display: inline-block;
              width: 12px;
              height: 12px;
              background: @border-less;
              border-radius: 50%;
            }
          }
          p {
            padding-top: 19px;
            font-size: 14px;
            font-weight: 400;
            color: @theme;
            max-width: 650px;
            cursor: pointer;
            .overflow();
          }
        }
        &-time {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          min-width: 130px;
        }
      }
      .active {
        background: #f8f8f8;
        .pro-item-cont {
          h3 {
            .icon {
              background: @theme;
            }
          }
        }
      }
    }
  }
}
</style>
