<template>
  <div class="inforManage">
    <div class="list-top">
      <div class="list-top-title">供应商资料管理</div>
    </div>
    <div class="list-info" v-if="editIndex === 0">
      <div class="title">
        资料信息
        <span @click="handleEdit">修改</span>
      </div>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="159px">
        <!-- form上部 -->
        <div class="form-top">
          <el-form-item label="企业">{{ form.nickName }}</el-form-item>
          <el-form-item label="联系人">{{ form.linkman }}</el-form-item>
          <el-form-item label="手机号">{{ form.phonenumber }}</el-form-item>
          <el-form-item label="社会统一信用代码">
            {{ form.creditCode }}
          </el-form-item>
          <el-form-item label="行业类型">
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
                      :images="[location.origin + '/api' + item.path]"
                      :ref="'img' + item.id"
                    >
                      <img :src="location.origin + '/api' + item.path" />
                    </viewer>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="营业期限"
            >{{ form.businessStart }} 至 {{ form.businessEnd }}</el-form-item
          >
        </div>
        <!-- form中部 -->
        <div class="form-bot">
          <el-form-item
            v-for="(item, index) in form.fileCategories"
            :key="index"
            :label="item.name"
            :class="item.code"
          >
            <viewer
              :images="enlargeSrc"
              ref="img"
              v-for="(cell, idx) in item.files"
              :key="idx"
            >
              <img :src="location.origin + '/api' + cell.path" />
            </viewer>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="list-edit" v-if="editIndex === 1">
      <div class="title">修改资料信息</div>
      <edit
              @cancel="cancel"
              :data="editForm"
              :size="size"
              @close="close"
              @save="save"
              :inOptions="inOptions"
      ></edit>
    </div>
    <!-- 正在审核中 -->
    <div v-if="editIndex === 2" class="checkIng">
      <div class="check-logo"></div>
      <div class="check-status">正在审核中</div>
      <div class="check-text">
        恭喜，资料提交成功，我们将会在<span>1个工作日</span>内审核完成，请您及时关注
      </div>
    </div>
    <!-- 审核未通过 -->
    <div v-if="editIndex === 3" class="checkFailed">
      <div class="check-logo"></div>
      <div class="check-status">很抱歉，申报审核失败</div>
      <div class="check-text">
        原因：
        <div class="check-text-cont" :title="remark || '无'">
          {{ remark || "无" }}
        </div>
      </div>
      <div class="check-btn">
        <div class="btn return" @click="returnData">暂不修改</div>
        <div class="btn edit" @click="reEdit">修改</div>
      </div>
    </div>
  </div>
  <!-- 修改内容 -->
</template>
<script>
  import {getEditInfo, returnHome} from "@/api/personal.js";
  import {getIndustry} from "@/api/login.js";
  import edit from "./edit";

  export default {
    data() {
      return {
        editIndex: null,
        remark: "",
        size: "normal",
        location: location,
        form: {},
        editForm: {},
        tableKey: true, //使表格发生变化
        inOptions: [],
        tableData: [],
        enlargeSrc: [],
        defaultImg: require("@/assets/icon/yj_icon_mr.png")
      };
    },
    components: {
      edit
    },
    methods: {
      /** 关闭修改信息弹窗 */
      close() {
        this.editIndex = 0;
      },
      /** 保存成功 */
      save() {
        this.editIndex = 2;
      },
      /** 修改信息 */
      handleEdit() {
        this.getEditPersonalInfo()
      },
      imgerrorfun() {
        let img = event.srcElement;
        img.src = this.defaultImg;
        img.onerror = null; //防止闪图
      },
      /** 返回信息主页 */
      returnData() {

        returnHome().then(result => {
          if (result.code === 200) {
            this.getPersonalInfo()
            this.$message({
              type: "success",
              //duration: 2000,
              message: result.msg,
              center: true
            });
          }
        });
      },
      /** 重新编辑 */
      reEdit() {
        this.editForm = this.form
        this.editIndex = 1;
      },
      cancel() {
      },
      /** 获取信息 status=1,查修改后数据*/
      getPersonalInfo(status) {
        getEditInfo({status: status}).then(result => {
          switch (result.data.auditStatus) {
            case "1":
              this.editIndex = 2;
              break;
            case "3":
              this.editIndex = 3;
              this.remark = result.data.remark;
              break;
            default:
              this.editIndex = 0;
              break;
          }
          this.form = result.data;
          this.tableData = [];
          console.log(this.form, "~~~~~~~this.form");
          if (this.form.memberIndustryFileList.length > 0) {
            this.tableData = this.form.memberIndustryFileList.map(item => {
              return {
                enclosure: item.fileList,
                industry: {
                  id: item.industryId,
                  title: this.selectDictLabel(
                          this.inOptions,
                          Number(item.industryId)
                  )
                }
              };
            });
            console.log("result", this.tableData);
          }
        });
      },
      /** 获取修改后的数据*/
      getEditPersonalInfo() {
        console.log("getEditPersonalInfo")
        getEditInfo({status: 1}).then(result => {
          this.editForm = result.data;
          this.editIndex = 1;
        });
      },
      /** 获取行业类型 */
      getDict() {
        getIndustry().then(result => {
          this.handleRecursion(result.data);
          this.getPersonalInfo();
        });
      },
      /** 递归遍历 */
      handleRecursion(list) {
        list.forEach(item => {
          this.inOptions.push({
            dictValue: item.id,
            dictLabel: item.label
          });
          if (item.children) {
            this.handleRecursion(item.children);
          }
        });
      }
    },
    created() {
      this.getDict();
    }
  };
</script>
<style lang="less" scoped>
.inforManage {
  height: 100%;
  .checkFailed {
    height: calc(~"100% - 72px");
    background-color: @white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .check-status {
      margin-top: 52px;
      font-size: 28px;
      color: #e1591d;
    }
    .check-logo {
      width: 417px;
      height: 196px;
      background: url("~@/assets/icon/yj_img_no.png") center center no-repeat;
    }
    .check-text {
      width: 40%;
      color: @grey;
      text-align: center;
      margin-top: 28px;
      font-size: 16px;
      &-cont {
        padding-top: 5px;
        word-wrap: break-word;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /*设置p元素最大4行，父元素需填写宽度才明显*/
        text-overflow: ellipsis;
        overflow: hidden;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        /*因为代码环境的关系-webkit-box-orient被过滤掉了 autoprefixer 这个关键字可以免除被过滤的动作*/
      }
    }
    .check-btn {
      display: flex;
      justify-content: center;
      margin-top: 60px;
      align-items: center;
      .btn {
        width: 90px;
        height: 38px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        line-height: 38px;
        border-radius: 6px;
      }
      .return {
        color: @theme;
        border: 1px solid @theme;
        background: #fff8f1;
      }
      .edit {
        color: @white;
        margin-left: 20px;
        background: @theme;
      }
    }
  }
  .checkIng {
    height: calc(~"100% - 72px");
    background-color: @white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .check-logo {
      width: 417px;
      height: 196px;
      background: url("~@/assets/icon/yj_img_shz.png") center center no-repeat;
    }
    .check-status {
      margin-top: 52px;
      font-size: 28px;
      color: #ffc404;
    }
    .check-text {
      color: @grey;
      margin-top: 28px;
      font-size: 16px;
      span {
        color: #ffc404;
      }
    }
  }
}
.list-top {
  padding-left: 14px;
  background-color: @white;
}
.list-info,
.list-edit {
  margin-top: 8px;
  background-color: @white;
  padding-left: 28px;
  padding-right: 21px;
  padding-bottom: 35px;
  .title {
    font-size: 16px;
    line-height: 70px;
    color: #333333;
    span {
      cursor: pointer;
      float: right;
      width: 80px;
      height: 38px;
      font-size: 16px;
      line-height: 38px;
      background: @theme;
      color: @white;
      text-align: center;
      border-radius: 4px;
      margin-top: 16px;
    }
  }
  /deep/.el-form {
    // .el-form-item {
    //   margin-bottom: 14px;
    // }
    .form-top {
      // padding-bottom: 15px;
      border-bottom: 1px solid @border-less;
    }
    .form-bot {
      margin-top: 42px;
      .el-form-item__content {
        > div {
          display: flex;
          width: 184px;
          height: 133px;
          background: #f4f4f4;
          border: 2px solid #eeeeee;
          img {
            width: 174px;
            height: 125px;
            object-fit: contain;
            cursor: pointer;
          }
          > div {
            width: 184px;
            height: 133px;
            background: #f4f4f4;
            border: 2px solid #eeeeee;
          }
        }
      }
      .business_licence {
        .el-form-item__label {
          line-height: 125px;
        }
      }
      .authorization_letter {
        .el-form-item__label {
          line-height: 133px;
        }
      }
      .idcard,
      .cor_represent_idcard {
        .el-form-item__label {
          line-height: 114px;
        }
        .el-form-item__content {
          display: flex;
          > div {
            &:nth-last-child(1) {
              margin-left: 100px;
            }
          }
        }
      }
      .member_other {
        .el-form-item__label {
          line-height: 114px;
        }
        .el-form-item__content {
          display: flex;
          flex-wrap: wrap;
          > div {
            margin-right: 100px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
.list-edit {
  padding: 0 14px;
  height: auto;
}
/deep/.el-table {
  border: 1px solid #eeeeee;
  width: 322px;
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
</style>
