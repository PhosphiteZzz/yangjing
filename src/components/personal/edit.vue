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
          <div class="table-add" @click.stop="handleAddIndust">添加</div>
          <el-table :data="tableData" stripe :key="tableKey">
            <el-table-column
              prop="industryType"
              label="行业"
              width="160"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.industry.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="enclosure"
              label="附件"
              width="160"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  class="link-tip"
                  v-for="(item, index) in scope.row.enclosure"
                  :key="index"
                >
                  <viewer
                    :images="[
                      location.origin + '/api' + (item.path || item.filePath)
                    ]"
                    :ref="'img' + item.id"
                  >
                    <img
                      :src="
                        location.origin + '/api' + (item.path || item.filePath)
                      "
                    />
                  </viewer>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <!-- slot-scope="scope" -->
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  size="small"
                  @click="handleEditIndust(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  size="small"
                  @click="handleDeleteIndust(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="营业期限" prop="date">
          <el-date-picker
            v-model="form.businessStart"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
          ></el-date-picker>

          <div style="margin-top:30px">
            <el-date-picker
              v-model="form.businessEnd"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"
            ></el-date-picker>
            <el-checkbox
              v-model="checked"
              style="margin-left:30px"
              @change="handleChange"
              >长期</el-checkbox
            >
          </div>
        </el-form-item>
      </div>
      <div class="write-bot">
        <el-form-item
          v-for="item in form.fileCategories"
          :key="item.id"
          :label="item.name"
          :prop="item.code"
          :class="[{ card: item.code.includes('idcard') }]"
        >
          <upload
            v-if="item.code.includes('idcard')"
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
            v-if="item.code.includes('idcard')"
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
            v-if="item.code.includes('idcard')"
            v-text="cardText"
            class="bot-card"
          ></div>
          <upload
            v-if="!item.code.includes('idcard') && item.code !== 'member_other'"
            :code="item.code"
            :value.sync="img"
            :list="item.files[0]"
            :imgUrl="imgUrl"
            :accept="cardAccept"
            :text="returnText(item.code)"
            @returnId="returnId"
            @deleteId="deleteId"
          ></upload>
          <!-- 上传多张图片 -->
          <uploadMore
            v-if="item.code === 'member_other'"
            :code="item.code"
            :imgUrl="imgUrl"
            :list="item.files"
            :text="returnText(item.code)"
            @returnMoreId="returnMoreId"
            @deleteMoreId="deleteMoreId"
          ></uploadMore>
        </el-form-item>
        <div class="btn">
          <div @click="handleCancel">取消</div>
          <div @click="handleSubmit">确认</div>
        </div>
      </div>
    </el-form>
    <!-- 添加行业类型弹窗 -->
    <industry-modal
      :type="industryType"
      :industryRow="industryRow"
      :options="options"
      v-if="visibleIndustry"
      @close="handleCloseIndust"
      @success="handleSuccessIndust"
    ></industry-modal>
  </div>
</template>
<script>
import uploadMore from "@/components/upload/index.vue";
import upload from "@/components/uploadImage/index.vue";
import { examineRequest, getIndustry } from "@/api/login.js";
import IndustryModal from "@/components/examine/industryModal.vue";
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
      location: location,
      industryType: true, //默认是添加
      industryRow: {},
      visibleIndustry: false,
      tableData: [],
      tableKey: true, //使表格发生变化
      defaultProps: {
        children: "children",
        label: "label"
      },
      checked: false,
      oldEndTime: "",
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
        industryType: [{ required: true, validator: this.validatorType }],
        date: [{ required: true, validator: this.verifyDate }],
        business_licence: [{ required: true, validator: this.verify }],
        authorization_letter: [{ required: true, validator: this.verify }],
        idcard: [{ required: true, validator: this.verify }],
        cor_represent_idcard: [{ required: true, validator: this.verify }]
      },
      options: [],
      img: require("@/assets/icon/yj_icon_sc.png"),
      imgCardFront: require("@/assets/icon/yj_icon_sfz.png"),
      imgCardBack: require("@/assets/icon/yj_icon_sfz2.png"),
      imgUrl: this.constant.upload_common_path,
      licenseText: "请上传原件的彩色扫描件",
      otherText:
        "可上传企业资质如高新技术企业证书等信息，利于管理员进行供应商评级",
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
    upload,
    uploadMore,
    IndustryModal
  },
  methods: {
    //行业类型验证
    validatorType(rule, value, callback) {
      this.tableData.length <= 0
        ? callback(new Error("请添加行业类型"))
        : callback();
    },
    verifyDate(rule, value, callback) {
      if (!this.form.businessStart || !this.form.businessEnd) {
        callback(new Error("请选择营业期限"));
      } else {
        callback();
      }
    },
    verify(rule, value, callback) {
      let type = rule.field;
      let length = type.includes("idcard") ? 2 : 1;
      this.form.fileCategories.forEach(item => {
        if (item.code === type) {
          if (item.files.length < length) {
            callback(new Error(`请上传${item.name}`));
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
        if (this.form.businessEnd == "9999-12-31") {
          this.checked = true;
        }
        this.form.id = result.id;
        this.form.industryLabel = this.selectDictLabel(
          this.inOptions,
          this.form.industryType
        );
        if (
          result.memberIndustryFileList &&
          result.memberIndustryFileList.length > 0
        ) {
          this.tableData = result.memberIndustryFileList.map(item => {
            return {
              enclosure: item.fileList || [],
              industry: {
                id: item.industryId,
                title: this.selectDictLabel(
                  this.inOptions,
                  Number(item.industryId)
                ),
                remark: item.remark
              }
            };
          });
          console.log("result", this.tableData);
        }
      });
    },
    /** 添加行业类型 */
    handleAddIndust() {
      this.industryType = true;
      this.visibleIndustry = true;
    },
    /** 编辑行业类型 */
    handleEditIndust(row) {
      this.industryRow = row;
      this.industryType = false;
      this.visibleIndustry = true;
    },
    /** 关闭行业类型 */
    handleCloseIndust() {
      this.visibleIndustry = false;
    },
    /** 删除 */
    handleDeleteIndust(row) {
      this.$confirm("是否确认删除该条行业类型？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(row.$index, 1);
          this.tableKey = !this.tableKey;
        })
        .then(() => {
          this.$message({
            message: "删除成功!",
            center: true,
            type: "success"
          });
        });
    },
    handleSuccessIndust(result) {
      let index = this.tableData.findIndex(item => {
        return item.industry.id == result.data.industry.id;
      });
      //添加
      if (result.type) {
        if (index !== -1) {
          this.$message({
            type: "warning",
            center: true,
            message: `该行业类型已存在！请重新选择！`
          });
          return;
        }
        this.tableData.push(result.data);
        this.visibleIndustry = false;
        this.tableKey = !this.tableKey;
        return;
      }
      //编辑 如果没有改行业类型的情况
      if (result.oldId == result.data.industry.id) {
        this.tableData[index] = result.data;
        this.visibleIndustry = false;
        this.tableKey = !this.tableKey;
        return;
      }
      //改了行业类型的情况，要删除本身的行业类型id，再去找当前的行业存不存在，
      //不存在就插入，存在就提醒
      let oldList = $.extend(true, [], this.tableData);
      let oldIndex = oldList.findIndex(item => {
        return item.industry.id == result.oldId;
      });
      oldList.splice(oldIndex, 1);

      let newIndex = oldList.findIndex(item => {
        return item.industry.id == result.data.industry.id;
      });
      if (newIndex !== -1) {
        this.$message({
          type: "warning",
          center: true,
          message: `该行业类型已存在！请重新编辑！`
        });
        return;
      }
      oldList.splice(oldIndex, 0, result.data);
      this.tableData = oldList;
      this.visibleIndustry = false;
      this.tableKey = !this.tableKey;
    },
    handleChange(result) {
      if (result) {
        this.oldEndTime = this.form.businessEnd;
        this.form.businessEnd = "9999-12-31";
        return;
      }
      this.form.businessEnd = this.oldEndTime
        ? this.oldEndTime
        : this.form.businessEnd;
    },
    /**/
    deleteMoreId(result) {
      let idx = null;
      this.form.fileCategories.forEach(item => {
        if (item.code.indexOf(result.code) !== -1) {
          item.files.forEach((cell, index) => {
            if (cell.id === result.id) {
              idx = index;
            }
          });
          item.files.splice(idx, 1);
        }
      });
    },
    returnMoreId(result) {
      this.form.fileCategories.forEach(item => {
        if (item.code.indexOf(result.code) !== -1) {
          item.files.push(result.result);
        }
      });
    },
    returnText(code) {
      if (code === "business_licence") {
        return this.licenseText;
      }
      if (code === "authorization_letter") {
        return this.letterText;
      }
      if (code === "member_other") {
        return this.otherText;
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
          let params = $.extend(true, {}, this.form);
          //行业类型数据
          let memberIndustryFileList = this.tableData.map(item => {
            return {
              industryId: item.industry.id,
              fileId:
                item.enclosure.length > 0
                  ? item.enclosure
                      .map(cell => {
                        return cell.id;
                      })
                      .join(",")
                  : ""
            };
          });
          params.memberIndustryFileList = memberIndustryFileList;
          saveModify(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                center: true,
                //duration: 2000,
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
      let code = result.code;
      let index = this.form.fileCategories.findIndex(item => {
        return item.code === code;
      });
      let item = this.form.fileCategories[index];
      if (item.code.includes("idcard")) {
        item.files.push(result.result);
        return;
      }
      item.files = [result.result];
    },
    /** 删除文件 id */
    deleteId(result) {
      let idx = null;
      let code = result.code;
      let index = this.form.fileCategories.findIndex(item => {
        return item.code === code;
      });
      let item = this.form.fileCategories[index];
      if (item.code.includes("idcard")) {
        item.files.forEach((cell, key) => {
          if (cell.id === result.id) {
            idx = key;
          }
        });
        item.files.splice(idx, 1);
        return;
      }
      item.files = [];
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
    .table-add {
      width: 71px;
      margin-top: 3px;
      margin-bottom: 30px;
      height: 32px;
      border-radius: 6px;
      background-color: #cc6933;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
      line-height: 32px;
    }
    /deep/.el-table {
      width: 438px;
      border: 1px solid #dcdfe6;
      td {
        padding: 0;
      }
      th {
        padding: 0;
      }
      .link-tip {
        color: #66b1ff;
        text-decoration: underline;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        img {
          width: 50px;
          height: 36px;
          object-fit: contain;
        }
      }
    }
  }
  &-bot {
    margin-top: 39px;
    padding-bottom: 21px;
    /deep/ .el-form-item {
      &:nth-last-child(2) {
        margin-top: 55px;
      }
    }
    .card {
      position: relative;
      margin-bottom: 66px !important;
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
/deep/ .el-upload-list--picture-card {
  .el-upload-list__item {
    width: 184px;
    height: 133px;
  }
}
/deep/ .el-dialog__headerbtn {
  top: 8px;
}
</style>
