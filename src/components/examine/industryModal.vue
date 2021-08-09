<template>
  <el-dialog
    :title="type ? '添加' : '编辑'"
    :visible.sync="visible"
    width="700px"
    :close-on-click-modal="false"
    append-to-body
    @close="close"
  >
    <el-form
      :model="form"
      ref="form"
      v-if="visibleForm"
      label-width="100px"
      :rules="rules"
      class="industryModal"
    >
      <el-form-item label="行业类型：" prop="industry">
        <Select
          v-if="visibleSelect"
          style="width:100%"
          :value="defaultValue"
          :props="defaultProps"
          :options="options"
          :accordion="true"
          @getValue="getValue"
          @getRemark="getRemark"
        ></Select>
      </el-form-item>
      <el-form-item label="附件：" prop="enclosure">
        <!-- <upload
          :code="enclosureCode"
          :value.sync="img"
          :imgUrl="imgUrl"
          :size="size"
          :list="fileList"
          :accept="cardAccept"
          :text="explain"
          @returnId="returnId"
          @deleteId="deleteId"
        ></upload> -->
        <uploadMore
          :code="enclosureCode"
          :imgUrl="imgUrl"
          :list="fileList"
          :size="size"
          :accept="cardAccept"
          :text="explain"
          @returnMoreId="returnMoreId"
          @deleteMoreId="deleteMoreId"
        ></uploadMore>
      </el-form-item>
    </el-form>
    <div class="btn" slot="footer">
      <div class="button submit" @click="submit">提交</div>
      <div class="button cancel" @click="close">取消</div>
    </div>
  </el-dialog>
</template>
<script>
// import upload from "@/components/uploadImage/index.vue";
import uploadMore from "@/components/uploadIndustry/index.vue";
import { getIndustry } from "@/api/login.js";
import Select from "./component/select.vue";
export default {
  data() {
    return {
      defaultProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children" // 子级字段名
      },
      enclosureCode: "industry",
      size: "big",
      cardAccept: ".jpg,.png,.jpeg",
      img: require("@/assets/icon/yj_icon_sc.png"),
      imgUrl: this.constant.upload_common_path,
      explain: "",
      oldId: null,
      visibleSelect: true,
      defaultValue: null,
      visible: false,
      visibleForm: false,
      fileList: [],
      form: {
        industry: "",
        enclosure: []
      },
      rules: {
        industry: [{ required: true, validator: this.verifyIndustry }]
        // enclosure: [{ required: true, validator: this.verifyEnclosure }]
      },
      rulesAll: {
        industry: [{ required: true, validator: this.verifyIndustry }],
        enclosure: [{ required: true, validator: this.verifyEnclosure }]
      },
      rulesLess: {
        industry: [{ required: true, validator: this.verifyIndustry }]
      }
    };
  },
  components: {
    Select,
    uploadMore
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    type: {
      type: Boolean,
      default: true
    },
    industryRow: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    verifyEnclosure(rule, value, callback) {
      if (this.form.enclosure.length <= 0) {
        callback(new Error(`请上传附件`));
      } else {
        callback();
      }
    },
    verifyIndustry(rule, value, callback) {
      if (!this.form.industry) {
        callback(new Error(`请选择行业类型`));
      } else {
        callback();
      }
    },
    close() {
      this.visible = false;
      this.$emit("close");
    },
    /** 选择行业类型 */
    getValue(form) {
      this.form.industry = form;
      this.defaultValue = form.id;
    },
    /** 返回备注 */
    getRemark(remark) {
      // this.explain = !remark ? "备注：请上传行业类型证书！" : `备注：${remark}`;
      if (remark && remark.toString().length > 0) {
        this.visibleSelect = false;
        this.form.industry.remark = remark;
        this.$nextTick(() => {
          this.explain = `备注：${remark}`;
          this.rules = this.rulesAll;
          this.visibleSelect = true;
        });
        return;
      }
      this.visibleSelect = false;
      this.$nextTick(() => {
        this.explain = "";
        this.form.industry.remark = null;
        this.rules = this.rulesLess;
        this.visibleSelect = true;
      });
    },
    handleEdit() {
      this.oldId = this.industryRow.industry.id;
      console.log(this.industryRow);
      this.fileList = this.industryRow.enclosure;
      this.form = $.extend(true, {}, this.industryRow);
      this.defaultValue = this.industryRow.industry.id;
      //如果remark存在
      if (this.industryRow.industry.remark) {
        this.rules = this.rulesAll;
        this.explain = `备注：${this.industryRow.industry.remark}`;
      }
      this.visibleForm = true;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.type) {
            this.$emit("success", {
              data: this.form,
              type: this.type
            });
            return;
          }
          //编辑
          this.$emit("success", {
            oldId: this.oldId,
            data: this.form,
            type: this.type
          });
        }
      });
    },
    returnMoreId(result) {
      if (!result) return;
      if (!this.form.enclosure) {
        this.form.enclosure = [];
      }
      this.form.enclosure.push(result.result);
    },
    /**/
    deleteMoreId(result) {
      let index = this.form.enclosure.findIndex(item => {
        return item.id == result.result.id;
      });
      this.form.enclosure.splice(index, 1);
    }
  },
  created() {
    //编辑
    if (!this.type) {
      this.handleEdit();
      return;
    }
    this.visibleForm = true;
  },
  mounted() {
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
/deep/.el-form-item {
  margin-bottom: 40px;
}
</style>
