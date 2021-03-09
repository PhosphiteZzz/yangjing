<template>
  <div class="write">
    <el-form ref="form" :model="form" label-width="168px" :rules="rules">
      <div class="write-top">
        <el-form-item label="企业" prop="nickName">
          <el-input
            v-model.trim="form.nickName"
            placeholder="请输入企业名称"
            :maxlength="30"
          ></el-input>
          <div class="tips"><span>*</span>必填项</div>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input
            v-model.trim="form.linkman"
            placeholder="需与被授权人一致"
            :maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input
            v-model.trim="form.phonenumber"
            placeholder="请输入联系电话"
            :maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码" prop="creditCode">
          <el-input
            v-model.trim="form.creditCode"
            placeholder="请填写社会统一代码"
            :maxlength="18"
          ></el-input>
        </el-form-item>
      </div>
      <div class="write-content">
        <el-form-item label="行业类型" prop="industryType">
          <el-select
            ref="write"
            v-model="form.industryType"
            placeholder="请选择"
            :popper-append-to-body="false"
          >
            <el-option
              :value="form.industryType"
              :label="form.industryLabel"
              style="height: 200px; overflow: auto; background-color: #fff"
            >
              <el-tree
                :data="options"
                :props="defaultProps"
                @node-click="handleNodeClick"
              >
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业期限" prop="date">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="选择日期"
            end-placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="write-bot">
        <el-form-item
          v-for="item in form.fileCategories"
          :key="item.id"
          :label="item.name"
          :prop="item.code"
          :class="[{ card: item.code === 'idcard' }]"
        >
          <upload
            v-if="item.code === 'idcard'"
            :code="item.code"
            :value.sync="imgCardFront"
            :list="item.files[0]"
            :imgUrl="imgUrl"
            :accept="cardAccept"
            :explain="cardExplainF"
            @returnId="returnId"
            @deleteId="deleteId"
          ></upload>
          <upload
            v-if="item.code === 'idcard'"
            :code="item.code"
            :value.sync="imgCardBack"
            :list="item.files[1]"
            :imgUrl="imgUrl"
            :accept="cardAccept"
            :explain="cardExplainB"
            @returnId="returnId"
            @deleteId="deleteId"
          ></upload>
          <div
            v-if="item.code === 'idcard'"
            v-text="cardText"
            class="bot-card"
          ></div>
          <upload
            v-if="item.code !== 'idcard'"
            :code="item.code"
            :value.sync="img"
            :list="item.files[0]"
            :imgUrl="imgUrl"
            :accept="cardAccept"
            :text="returnText(item.code)"
            @returnId="returnId"
            @deleteId="deleteId"
          ></upload>
        </el-form-item>
        <div class="btn">
          <div @click="handleCancel">取消</div>
          <div @click="handleSubmit">确认</div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import upload from "@/components/uploadImage/index.vue";
import { examineRequest, getIndustry } from "@/api/login.js";
import { saveModify } from "@/api/personal.js";
export default {
  data() {
    return {
      form: {
        id: null,
        userName: null,
        password: null,
        nickName: null,
        linkman: null,
        fileCategories: null,
        phonenumber: null,
        creditCode: null,
        industryType: null,
        industryLabel: null,
        date: null,
        businessStart: null,
        businessEnd: null
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        nickName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        linkman: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phonenumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "手机号格式不正确"
          }
        ],
        creditCode: [
          {
            required: true,
            message: "请输入社会统一信用代码",
            trigger: "blur"
          }
        ],
        industryType: [
          { required: true, message: "请选择行业类型", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择营业期限", trigger: "blur" }],
        business_licence: [{ required: true, validator: this.verify }],
        authorization_letter: [{ required: true, validator: this.verify }],
        idcard: [{ required: true, validator: this.verify }]
      },
      options: [],
      img: require("@/assets/icon/yj_icon_sc.png"),
      imgCardFront: require("@/assets/icon/yj_icon_sfz.png"),
      imgCardBack: require("@/assets/icon/yj_icon_sfz2.png"),
      imgUrl: this.constant.upload_common_path,
      licenseText: "请上传原件的彩色扫描件",
      letterText:
        "请在网站的下载中心<a href='#/index/downcenter/down?title=授权委托书' target='_blank'>下载</a>授权委托书，需法人签字或盖章，被授权人需签字，请填写授权日期",
      cardExplainF: "身份证正面",
      cardExplainB: "身份证反面",
      cardText: "请上传原件的彩色扫面件",
      cardAccept: ".jpg,.png,.jpeg",
      letterAccept: ".jpg,.png,.jpeg,.docx,.doc",
      limitText: "（仅支持png，jpg，jpeg格式图片）"
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    inOptions: {
      type: Array,
      default: () => []
    }
  },
  components: {
    upload
  },
  methods: {
    verify(rule, value, callback) {
      let type = rule.field;
      let length = type === "idcard" ? 2 : 1;
      this.form.fileCategories.forEach(item => {
        if (item.code === type) {
          if (item.files.length < length) {
            callback(new Error(`请选择${item.name}`));
          } else {
            callback();
          }
        }
      });
    },
    init() {
      getIndustry().then(res => {
        this.options = res.data;
        let result = $.extend(true, {}, this.data);
        for (let i in this.form) {
          this.form[i] = result[i];
        }
        this.form.date = [this.form.businessStart, this.form.businessEnd];
        this.form.id = result.id;
        this.form.industryLabel = this.selectDictLabel(
          this.inOptions,
          this.form.industryType
        );
      });
    },
    returnText(code) {
      if (code === "business_licence") {
        return this.licenseText;
      }
      if (code === "authorization_letter") {
        return this.letterText;
      }
    },
    handleNodeClick(data) {
      this.form.industryType = data.id;
      this.form.industryLabel = data.label;
      this.$refs.write.blur();
    },
    /** 暂存/提交 */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.businessStart = this.form.date[0];
          this.form.businessEnd = this.form.date[1];
          saveModify(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                center: true,
                duration: 2000,
                type: "success"
              });
              this.$emit("save");
            }
          });
        }
      });
    },
    /** 取消 */
    handleCancel() {
      this.$emit("close");
    },
    /** 返回文件id */
    returnId(result) {
      this.form.fileCategories.forEach(item => {
        if (item.code.indexOf(result.code) !== -1) {
          if (item.code === "idcard") {
            item.files.push(result.result);
          } else {
            item.files = [result.result];
          }
        }
      });
    },
    /** 删除文件 id */
    deleteId(result) {
      let idx = null;
      this.form.fileCategories.forEach(item => {
        if (item.code.indexOf(result.code) !== -1) {
          if (item.code === "idcard") {
            item.files.forEach((cell, index) => {
              if (cell.id === result.id) {
                idx = index;
              }
            });
            item.files.splice(idx, 1);
          } else {
            item.files = [];
          }
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.write {
  &-top {
    .title {
      font-size: 26px;
      padding-bottom: 29px;
    }
    .vice-title {
      font-size: 16px;
      padding-bottom: 50px;
      border-bottom: 1px solid @border-less;
      margin-bottom: 49px;
    }
  }
  &-content {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-less;
    /deep/.el-tree {
      .el-tree-node__label {
        font-weight: 400;
      }
    }
    /deep/.el-select-dropdown {
      left: 0 !important;
      .el-select-dropdown__item {
        .el-tree-node__content {
          height: 30px;
        }
      }
      .is-vertical {
        display: none;
      }
    }
  }
  &-bot {
    margin-top: 39px;
    padding-bottom: 21px;
    .card {
      position: relative;
      /deep/.el-form-item__content {
        display: flex;
        .component-upload-image {
          &:nth-of-type(1) {
            margin-right: 100px;
          }
        }
      }
      .bot-card {
        position: absolute;
        bottom: -46px;
        color: #d8c6b3;
        font-size: 14px;
      }
    }
    .btn {
      margin-top: 100px;
      display: flex;
      justify-content: center;
      div {
        width: 80px;
        height: 40px;
        border-radius: 6px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
        line-height: 40px;
        &:nth-of-type(1) {
          background-color: #fff8f1;
          color: @theme;
          border: 1px solid @theme;
        }
        &:nth-of-type(2) {
          background-color: #ac8458;
          margin-left: 30px;
        }
      }
    }
  }
  /deep/.el-form {
    > div {
      background-color: @white;
    }
    .el-form-item {
      margin-bottom: 29px;
      .el-form-item__label {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .el-input {
        width: 438px;
        .el-input__inner {
          height: 40px;
          line-height: 40px;
        }
      }
      .el-select {
        width: 438px;
      }
      .el-date-editor {
        width: 438px;
        height: 40px;
        .el-range-separator {
          line-height: 34px;
        }
      }
      .tips {
        position: absolute;
        left: 458px;
        top: 50%;
        transform: translateY(-50%);
        span {
          display: inline-block;
          color: #f31111;
        }
      }
    }
  }
}
</style>
