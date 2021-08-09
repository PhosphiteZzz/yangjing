<template>
  <div class="invitdetails">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title">
          <router-link :to="{ path: '/index/personal/infor' }"
            >用户中心></router-link
          >
        </div>
        <div class="title">
          <router-link :to="{ path: '/index/personal/invitation' }"
            >邀请招标></router-link
          >
        </div>
        <div class="title-current">
          邀请招标详情
        </div>
      </div>
      <div class="details-title">
        <div class="details-table" v-if="Object.keys(noticeForm).length > 0">
          <div>
            <div class="table-title">采购公告</div>
            <div class="table-cont" v-text="noticeForm.title"></div>
          </div>
          <div>
            <div class="table-title">发布时间</div>
            <div class="table-cont" v-text="noticeForm.createTime"></div>
          </div>
          <div>
            <div class="table-title">交易信息分类</div>
            <div
              class="table-cont"
              v-text="typeFormat(noticeForm.tradeType)"
            ></div>
          </div>
          <div>
            <div class="table-title">报价截止时间</div>
            <div class="table-cont" v-text="noticeForm.sendEndTime"></div>
          </div>
        </div>
        <!-- 没有数据 -->
        <div>
          <nocontent v-if="(Object.keys(noticeForm).length = 0)"></nocontent>
        </div>
        <!-- 提交报价 -->
        <section class="details-buy" v-if="Object.keys(noticeForm).length > 0">
          <button @click="handleSubmit">
            {{ noticeForm.quoteMoney ? "修改报价" : "提交报价" }}
          </button>
        </section>
      </div>
      <!-- 文章内容 -->
      <div class="details-text details-cont ql-container" v-if="noticeArticle">
        <div v-html="noticeArticle" class="ql-editor"></div>
      </div>
    </div>
    <!-- 报价弹窗 -->
    <submit-quote
      v-if="submitVisible"
      :quote="quote"
      @close="handleClose"
      @success="handleSuccess"
    ></submit-quote>
  </div>
</template>
<script>
import { getDicts } from "@/api/index.js";
import { invitationDetail } from "@/api/personal.js";
import nocontent from "@/components/common/nocontent.vue";
import submitQuote from "@/components/personal/submitQuote.vue";
export default {
  data() {
    return {
      noticeForm: {},
      noticeArticle: null,
      config: "trade_type",
      tradeOptions: [],
      submitVisible: false,
      quote: {}
    };
  },
  components: {
    nocontent,
    submitQuote
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length <= 0) {
      this.$message({
        type: "error",
        center: true,
        message: "地址发生变化，回到上一页！"
      });
      this.routerLeave();
      return;
    }
    console.log(query);
    getDicts(this.config).then(res => {
      this.tradeOptions = res.data;
      this.getDetails(query);
    });
  },
  mounted() {},
  methods: {
    handleSuccess() {
      this.submitVisible = false;
      this.getDetails(this.$route.query);
    },
    handleClose() {
      this.submitVisible = false;
    },
    // 字典翻译
    typeFormat(type) {
      return this.selectDictLabel(this.tradeOptions, type);
    },
    routerLeave() {
      this.$router.push({
        path: "/index/personal/invitation"
      });
    },
    /** 获取详情 */
    getDetails(query) {
      let params = {
        id: query.noticeId
      };
      invitationDetail(params).then(result => {
        if (result.code === 200) {
          this.noticeForm = result.data;
          this.noticeForm.quoteMoney = result.quoteMoney;
          // this.noticeArticle = result.;
          this.noticeArticle = result.data.content;
        }
      });
    },
    handleSubmit() {
      if (Object.keys(this.noticeForm).length <= 0) {
        this.$message({
          type: "error",
          center: true,
          message: "数据丢失，请返回列表重新进入！"
        });
        return;
      }
      this.quote = {
        noticeId: this.noticeForm.id,
        quoteMoney: this.noticeForm.quoteMoney,
        proName: this.noticeForm.project.proName
      };
      this.submitVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.invitdetails {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 56px;
}
.details-title {
  height: auto;
  background-color: @white;
  padding: 29px 40px 25px;
  .details-table {
    margin-top: 30px;
    border-top: 1px solid @border-less;
    > div {
      display: flex;
      line-height: 20px;
      border: 1px solid @border-less;
      border-top: none;
    }
    .table-title {
      width: 363px;
      border-right: 1px solid @border-less;
      background-color: #fffbf7;
      color: @theme;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .table-cont {
      padding: 15px 56px;
      flex: 1;
    }
    .red {
      color: #f31212;
    }
  }
  .details-buy {
    display: flex;
    justify-content: center;
    button {
      border: none;
      width: 120px;
      height: 50px;
      background: #cf6945;
      border-radius: 4px;
      font-size: 18px;
      color: @white;
      line-height: 50px;
      margin: 20px 0 25px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.details-text {
  padding: 36px 40px;
  margin-top: 20px;
  background: @white;
  .ql-editor {
    border: 1px solid @border-less;
  }
}
</style>
