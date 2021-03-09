<template>
  <div class="edit">
    <div class="head">
      <span class="title">修改密码</span>
    </div>
    <div class="cont">
      <step :index="stepIdx"></step>
      <div class="cont-pwd">
        <el-form
          ref="passForm"
          :model="passForm"
          :rules="rules"
          label-width="86px"
        >
          <el-row>
            <el-col :span="8">密码：</el-col>
            <el-col :span="8.5">
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model.trim="passForm.password"
                  placeholder="请输入密码"
                  :maxlength="16"
                  :minlength="6"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7.5" class="tips">
              (6-16位大小字母、数字、符号组合)
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">确认密码：</el-col>
            <el-col :span="8.5">
              <el-form-item prop="confirmPassWord">
                <el-input
                  type="password"
                  v-model.trim="passForm.confirmPassWord"
                  placeholder="请输入密码"
                  :maxlength="16"
                  :minlength="6"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="next-btn">
            <div class="common-btn-active" @click="nextStep">确认修改</div>
            <div class="common-btn" @click="prevStep">上一步</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import step from "./components/step";
import { registRules } from "./rules";
import { editPassword } from "@/api/login.js";
export default {
  data() {
    return {
      passForm: {
        password: "",
        confirmPassWord: "",
        email: "",
        code: "",
        ticket: ""
      },
      rules: registRules,
      stepIdx: 1,
      value: "",
      confvalue: ""
    };
  },
  components: {
    step
  },
  methods: {
    nextStep() {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          editPassword(this.passForm).then(result => {
            if (result.code === 200) {
              this.$router.push({
                name: "修改完成",
                params: {
                  stepIdx: 2
                }
              });
            }
          });
        }
      });
    },
    prevStep() {
      this.$router.push({
        name: "忘记密码",
        params: {
          stepIdx: 0
        }
      });
    }
  },
  created() {
    let params = this.$route.params;
    if (Object.keys(params).length <= 0) {
      this.$router.go(-1);
      return;
    }
    this.passForm.email = params.email;
    this.passForm.code = params.code;
    this.passForm.ticket = params.ticket;
  }
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     if (to.params.stepIdx === null || to.params.stepIdx === undefined) {
  //       vm.$router.push("/login");
  //       return;
  //     }
  //     vm.stepIdx = to.params.stepIdx;
  //   });
  // },
};
</script>
<style lang="less" scoped>
.edit {
  width: 1070px;
  height: 585px;
  background: @white;
  .head {
    height: 76px;
    line-height: 76px;
    border: 1px solid @border-less;
    span {
      display: inline-block;
    }
    .title {
      font-size: 26px;
      text-indent: 26px;
    }
  }
  .cont {
    height: calc(~"100% - 76px");
    padding: 40px 67px;
    &-pwd {
      height: calc(~"100% - 54px");
      padding-top: 59px;
      font-size: 16px;
      /deep/.el-row {
        line-height: 54px;
        margin-bottom: 7px;
        .el-form-item__content {
          margin: 0 !important;
        }
        &:nth-of-type(2) {
          margin-bottom: 18px;
        }
        .el-col {
          &:nth-of-type(1) {
            text-align: right;
          }
        }
      }
      /deep/.el-input {
        width: 315px;
        .el-input__inner {
          height: 54px;
          line-height: 54px;
        }
      }
      .tips {
        color: @grey;
        text-indent: 8px;
      }
      .next-btn {
        > div {
          width: 381px;
          margin: 0 auto;
          &:nth-of-type(2) {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
