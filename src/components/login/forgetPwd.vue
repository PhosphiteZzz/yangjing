<template>
  <div class="forget">
    <div class="head">
      <span class="title">忘记密码</span>
      <span class="text">为了您的账号安全，操作前请您进行安全验证</span>
    </div>
    <div class="cont">
      <step :index="stepIdx"></step>
      <el-form
        ref="passForm"
        :model="passForm"
        :rules="rules"
        label-width="86px"
      >
        <el-form-item label="验证邮箱:" prop="username">
          <el-input
            v-model.trim="passForm.username"
            placeholder="请输入验证邮箱"
            :maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code" class="cont-code">
          <el-input
            v-model.trim="passForm.code"
            placeholder="请输入验证码"
            :maxlength="6"
          ></el-input>
          <div class="getCode" @click="handlegetCode" v-if="showCode">
            获取验证码
          </div>
          <button class="getCode" disabled v-else>{{ codeTime }}s</button>
        </el-form-item>
      </el-form>
      <!-- <div class="cont-mail"></div> -->
      <div class="next-btn">
        <div class="common-btn-active" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 忘记密码 forgetPwd
 * @author li_xiangjian
 */
import step from "./components/step";
import { passRules } from "./rules";
import { getCode } from "@/api/login.js";
import { checkEmailCode } from "@/api/index.js";
export default {
  data() {
    return {
      //获取验证码相关参数
      showCode: true,
      codeTime: 60,
      codeTimer: null,
      passForm: {
        username: "",
        code: ""
      },
      //登录表单验证规则
      rules: passRules,
      //步骤几
      stepIdx: 0,
      value: ""
    };
  },
  components: {
    step
  },
  methods: {
    beforeunloadFn(event) {
      clearInterval(this.codeTimer);
    },
    nextStep() {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          let result = {
            email: this.passForm.username,
            code: this.passForm.code
          };
          checkEmailCode(result).then(res => {
            if (res.code === 200) {
              this.$router.push({
                name: "修改密码",
                params: {
                  stepIdx: 1,
                  email: this.passForm.username,
                  code: this.passForm.code,
                  ticket: res.ticket
                }
              });
            }
          });
        }
      });
    },
    /** 获取验证码 */
    handlegetCode() {
      this.$refs.passForm.validateField("username", errMsg => {
        if (!errMsg) {
          let result = {
            email: this.passForm.username
          };
          getCode(result).then(res => {
            if (res.code === 200) {
              this.showCode = false;
              this.codeTimer = setInterval(() => {
                if (this.codeTime <= 1) {
                  clearInterval(this.codeTimer);
                  this.showCode = true;
                  return;
                }
                this.codeTime--;
              }, 1000);
              this.$message({
                type: "success",
                //duration: 2000,
                message: res.msg,
                center: true
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    window.addEventListener("beforeunload", e => this.beforeunloadFn(e));
  }
};
</script>
<style lang="less" scoped>
.forget {
  width: 1070px;
  height: 465px;
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
    .text {
      text-indent: 20px;
      font-size: 16px;
      color: @grey;
    }
  }
  .cont {
    height: calc(~"100% - 76px");
    padding: 40px 67px;
    /deep/.el-form {
      .el-form-item {
        width: 406px;
        margin: 20px auto;

        .el-form-item__label {
          font-size: 16px;
          line-height: 54px;
          &:before {
            content: "";
          }
        }
        .el-form-item__content {
          .cont-user {
            line-height: 54px;
          }
          .el-input {
            width: 316px;
            .el-input__inner {
              height: 54px;
              line-height: 54px;
            }
          }
        }
      }
      .cont-code {
        .el-form-item__content {
          display: flex;
          .el-input {
            width: 180px;
          }
        }
      }
      .getCode {
        cursor: pointer;
        width: 126px;
        height: 54px;
        background: #f8f8f8;
        border: 1px solid #eeeeee;
        border-radius: 4px;
        font-size: 16px;
        text-align: center;
        color: #999999;
        line-height: 54px;
        margin-left: 10px;
      }
    }
    .next-btn {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      > div {
        width: 381px;
      }
    }
  }
}
</style>
