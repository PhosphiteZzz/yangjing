<template>
  <el-dialog
    :title="quoteText"
    :visible.sync="visible"
    width="512px"
    :close-on-click-modal="false"
    append-to-body
    @close="close"
  >
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <el-form-item :label="quoteText + '：'" prop="quote">
        <el-input
          style="width:268px"
          :disabled="!isShow"
          v-model.trim="form.quote"
          placeholder="请输入报价（万元）"
          :maxlength="15"
        ></el-input>
        <span style="display:inline-block; margin-left:7px;font-weight:bold;"
          >万元</span
        >
      </el-form-item>
    </el-form>
    <div class="btn" slot="footer" v-if="isShow">
      <div class="button submit" @click="submit">提交</div>
      <div class="button cancel" @click="close">取消</div>
    </div>
  </el-dialog>
</template>
<script>
import { quoteRequest } from "@/api/personal.js";
export default {
  data() {
    return {
      visible: false,
      quoteText: "",
      form: {
        quote: null
      },
      isShow: true,
      rules: {
        quote: [
          { required: true, message: "请输入报价（万元）", trigger: "blur" },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: "请输入正整数或保留两位小数！"
          }
        ]
      }
    };
  },
  props: {
    quote: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (Number(this.form.quote) <= 0) {
            this.$message({
              type: "warning",
              center: true,
              message: "报价金额必须大于0！"
            });
            return;
          }
          let params = {
            noticeId: this.quote.noticeId,
            [`quote${this.quote.type + 1}`]: this.form.quote
          };
          //二次报价
          if (this.quote.type) {
            this.$confirm(
              `二次报价价格为<span style="color:red;font-size:18px;font-weight:bold">${this.form.quote}万元</span>，是否确认？`,
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                dangerouslyUseHTMLString: true
              }
            ).then(() => {
              quoteRequest(params).then(result => {
                if (result.code === 200) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: this.quote.quote
                      ? "修改报价成功！"
                      : "提交报价成功！"
                  });
                  this.$emit("success");
                }
              });
            });
            return;
          }
          //一次报价
          quoteRequest(params).then(result => {
            if (result.code === 200) {
              this.$message({
                type: "success",
                center: true,
                message: this.quote.quote ? "修改报价成功！" : "提交报价成功！"
              });
              this.$emit("success");
            }
          });
        }
      });
    }
  },
  mounted() {
    this.form.quote = this.quote.price;
    this.quoteText = this.quote.type ? "二次报价" : "一次报价";
    if (this.quote.type && this.quote.price) {
      this.isShow = false;
    }
    this.visible = true;
  }
};
</script>
<style lang="less" scoped>
.btn {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  .button {
    width: 120px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    &:nth-last-child(1) {
      margin-left: 30px;
    }
  }
  .submit {
    background-color: @theme;
    color: @white;
  }
  .cancel {
    border: 1px solid #bbbbbb;
  }
}
</style>
