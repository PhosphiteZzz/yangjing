<template>
  <el-dialog
    title="提问投诉"
    :visible.sync="visible"
    width="512px"
    :close-on-click-modal="false"
    append-to-body
    @close="close"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="60px">
      <el-form-item label="类型:" prop="type">
        <el-select v-model="form.type" placeholder="提问/投诉">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容:" prop="question">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          :maxlength="180"
          show-word-limit
          v-model.trim="form.question"
        >
        </el-input
      ></el-form-item>
      <div class="btn">
        <div class="button submit" @click="submit">提交</div>
        <div class="button cancel" @click="close">取消</div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { getQuestionList } from "@/api/personal.js";
export default {
  data() {
    return {
      form: {
        type: "",
        question: ""
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        question: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      visible: false,
      options: [
        {
          value: "0",
          label: "提问"
        },
        {
          value: "1",
          label: "投诉"
        }
      ]
    };
  },
  props: {
    ids: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.visible = true;
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = Object.assign(this.form, this.ids);
          getQuestionList(params).then(result => {
            if (result.code === 200) {
              this.$message({
                message: result.msg,
                center: true,
                duration: 2000,
                type: "success"
              });
              this.close();
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.el-select {
  width: 100%;
}
/deep/.el-form-item {
  margin-bottom: 29px;
}
/deep/.el-form-item__label {
  height: 50px;
  line-height: 50px;
}
/deep/.el-input__inner {
  height: 50px;
  line-height: 50px;
}
/deep/.el-textarea__inner {
  font-family: Microsoft YaHei;
}
/deep/.el-textarea {
  .el-input__count {
    line-height: 14px;
    right: 19px;
  }
}
.btn {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .button {
    width: 120px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    border-radius: 2px;
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
