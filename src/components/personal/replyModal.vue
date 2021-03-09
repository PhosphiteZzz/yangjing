<template>
  <el-dialog
    title="查看回复"
    :visible.sync="visible"
    width="512px"
    append-to-body
    @close="close"
  >
    <div class="title">
      <span></span>
      您的问题
    </div>
    <div class="question" v-text="replyData.question"></div>
    <div class="reply">
      <div class="reply-title">
        <span></span>
        管理员回复
      </div>
      <div class="reply-content" v-text="replyData.answer"></div>
    </div>
    <div class="btn">
      <div class="button" @click="close">返回</div>
    </div>
  </el-dialog>
</template>
<script>
import { getMessageDetails } from "@/api/personal.js";
export default {
  data() {
    return {
      form: {
        type: "",
      },
      replyData: {},
      visible: false,
    };
  },
  created() {
    getMessageDetails(this.replyId).then((result) => {
      if (result.code === 200) {
        this.replyData = {
          question: result.data.question,
          answer: result.data.answer,
        };
        this.visible = true;
      }
    });
  },
  props: {
    replyId: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background: url("~@/assets/icon/yj_icon_wt.png") center center no-repeat;
  }
}
.question {
  font-size: 14px;
  padding-top: 23px;
  padding-bottom: 30px;
  padding-left: 10px;
  color: #666666;
}
.reply {
  height: 116px;
  background: #f8f8f8;
  opacity: 0.88;
  border-radius: 6px;
  padding: 9px 11px;
  &-title {
    display: flex;
    align-items: center;
    color: #666666;
    span {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background: url("~@/assets/icon/yj_icon_gly.png") center center no-repeat;
    }
  }
  &-content {
    height: calc(~"100% - 16px");
    padding: 22px 0;
    color: #333333;
  }
}
.btn {
  display: flex;
  justify-content: center;
  .button {
    width: 120px;
    height: 36px;
    background: @theme;
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    color: @white;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>