<template>
  <div class="content-login">
    <!-- 登录 -->
    <div class="login-box" v-if="basis">
      <div class="login-box-title">用户登录</div>
      <!-- 登录表单 -->
      <el-form
        ref="formLogin"
        key="formLoginKey"
        :model="formLogin"
        :rules="rulesLogin"
      >
        <div class="login-box-mail">
          <span class="icon"></span>
          <el-form-item prop="username" key="l_userKey">
            <el-input
              placeholder="请输入邮箱"
              v-model.trim="formLogin.username"
              :maxlength="30"
              @keyup.enter.native="handleformLogin"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="login-box-pwd" key="l_passKey">
          <span class="icon"></span>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model.trim="formLogin.password"
              :maxlength="16"
              :minlength="6"
              @keyup.enter.native="handleformLogin"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="login-box-submit" @click="handleformLogin">登录</div>
      <div class="login-box-link">
        <div class="link-pwd" @click="forgetPwd">忘记密码？</div>
        <div class="link-regist">
          还没有账号，<span @click="handleRegister">快速注册</span>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <div class="register-box" v-else>
      <div class="register-box-title">用户注册</div>
      <el-form
        ref="formRegist"
        key="formRegistKey"
        :model="formRegist"
        :rules="rulesRegist"
      >
        <div class="register-box-mail">
          <span class="icon"></span>
          <el-form-item prop="email" key="r_emailKey">
            <el-input
              placeholder="请输入邮箱"
              v-model.trim="formRegist.email"
              :maxlength="30"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="register-box-code">
          <span class="icon"></span>
          <el-form-item prop="code" key="r_codeKey">
            <el-input
              placeholder="请输入验证码"
              v-model.trim="formRegist.code"
              :maxlength="6"
            >
            </el-input>
          </el-form-item>
          <button @click.prevent="handlegetCode" v-if="showCode">
            获取验证码
          </button>
          <button v-else disabled>{{ codeTime }}s</button>
        </div>
        <div class="register-box-pwd">
          <span class="icon"></span>
          <el-form-item prop="password" key="r_passKey">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model.trim="formRegist.password"
              :maxlength="16"
              :minlength="6"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="register-box-confirmPwd">
          <span class="icon"></span>
          <el-form-item prop="confirmPassWord" key="r_cpassKey">
            <el-input
              type="password"
              placeholder="请确认密码"
              v-model.trim="formRegist.confirmPassWord"
              :maxlength="16"
              :minlength="6"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="register-box-submit" @click="handleformRegist">注册</div>
      <div class="register-box-link">
        <div class="link-regist">
          已有账号，<span @click="handleLogin">去登录</span>
        </div>
      </div>
    </div>
    <!-- 公众号 -->
    <div class="account" v-if="showQRCode">
      <div class="close" @click.stop="handleCode"></div>
      <div class="qrCode">
        <img :src="require('@/assets/icon/code.jpg')" alt="二维码" />
      </div>
      <div class="qrTitle">关注公众号</div>
      <div class="qrTitle">及时掌握招投标动态</div>
    </div>
  </div>
</template>
<script>
import { loginRules, registRules } from "./rules";
import { getCodeExist, getCode } from "@/api/login.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      //登录的form
      formLogin: {
        username: "",
        password: ""
      },
      formRegist: {
        email: "",
        code: "",
        password: "",
        confirmPassWord: ""
      },
      basis: true,
      //登录表单验证规则
      rulesLogin: loginRules,
      rulesRegist: registRules,
      //获取验证码相关参数
      showCode: true,
      codeTime: 60,
      codeTimer: null,
      showQRCode: true
    };
  },
  mounted() {
    window.addEventListener("beforeunload", e => this.beforeunloadFn(e));
  },
  watch: {
    $route(to, from) {
      let query = to.query;
      if (Object.keys(query).length > 0 && query.type) {
        this.basis = query.type ? false : true;
        return;
      }
      this.basis = true;
    }
  },
  methods: {
    ...mapActions("login", ["Login", "Regist"]),
    beforeunloadFn(event) {
      clearInterval(this.codeTimer);
    },
    /** 点击关闭二维码 */
    handleCode() {
      this.showQRCode = false;
    },
    /** 注册 */
    handleRegister() {
      this.basis = false;
    },
    /** 去登录 */
    handleLogin() {
      this.basis = true;
    },
    /** 忘记密码 */
    forgetPwd() {
      // let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
      // let query = null;
      // if (reg.test(this.formLogin.username)) {
      //   query = this.formLogin.username;
      // }
      this.$router.push({
        path: "/login/forget"
      });
    },
    /** 登录 */
    handleformLogin() {
      this.$refs.formLogin.validate(valid => {
        if (valid) {
          this.Login(this.formLogin).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                center: true,
                //duration: 2000,
                type: "success"
              });
              this.$router.push({
                path: "/index/home"
              });
              return;
            }
            this.$message({
              message: res.msg,
              center: true,
              //duration: 2000,
              type: "warning"
            });
            this.$router.push({
              name: "资质审核",
              params: {
                code: res.code,
                data: res.data
              }
            });
          });
        }
      });
    },
    /** 注册 */
    handleformRegist() {
      this.$refs.formRegist.validate(valid => {
        if (valid) {
          this.Regist(this.formRegist).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                //duration: 2000,
                message: "注册成功！请继续登录！",
                center: true
              });
              this.basis = true;
            }
          });
        }
      });
    },
    /** 获取验证码 */
    handlegetCode() {
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
      if (!reg.test(this.formRegist.email)) {
        this.$message({
          type: "error",
          //duration: 2000,
          message: "邮箱格式不正确！",
          center: true
        });
        return;
      }
      let result = {
        email: this.formRegist.email
      };
      getCodeExist(result).then(res => {
        if (res.code === 200) {
          this.getCodeFunc(result);
        }
      });
    },
    /** 获取验证码方法 */
    getCodeFunc(result) {
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
  }
};
</script>
<style lang="less" scoped>
/deep/.el-form-item {
  margin: 0;
}
.content-login {
  .login-box,
  .register-box {
    width: 550px;
    height: 474px;
    background: @white;
    border-radius: 4px;
    padding: 10px 59px 0 59px;
    &-title {
      line-height: 84px;
      font-size: 26px;
      border-bottom: 1px solid @border-less;
    }
    &-mail,
    &-pwd,
    &-code,
    &-confirmPwd {
      color: @grey;
      position: relative;
      margin-top: 39px;
      .icon {
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 22px;
        z-index: 1;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("~@/assets/icon/yj_icon_yx.png") center center no-repeat;
      }
      /deep/.el-input__inner {
        height: 54px;
        padding-left: 61px;
        border-radius: 4px;
        font-size: 16px;
        color: @font;
        border: 1px solid @border-less;
      }
    }
    &-pwd,
    &-confirmPwd {
      margin-top: 29px;
      .icon {
        width: 24px;
        height: 22px;
        background: url("~@/assets/icon/yj_icon_mm.png") center center no-repeat;
      }
    }
    &-submit {
      height: 54px;
      background: @theme;
      border-radius: 4px;
      margin-top: 40px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: @white;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      letter-spacing: 1px;
    }
    &-link {
      height: 17px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      margin-top: 18px;
      letter-spacing: 1px;
      .link-pwd {
        color: @theme;
        cursor: pointer;
      }
      .link-regist {
        text-align: center;
        span {
          display: inline-block;
          color: @theme;
          cursor: pointer;
        }
      }
    }
  }
  .register-box {
    height: 607px;
    &-code {
      margin-top: 29px;
      display: flex;
      align-items: center;
      .icon {
        background: url("~@/assets/icon/yj_icon_yzm.png") center center
          no-repeat;
      }
      /deep/.el-form-item {
        flex: 1;
      }
      button {
        cursor: pointer;
        margin-left: 10px;
        width: 126px;
        height: 54px;
        color: @grey;
        background: #f8f8f8;
        border: 1px solid @border-less;
        border-radius: 4px;
      }
    }
    .link-regist {
      width: 100%;
    }
  }
  .account {
    top: 50%;
  }
}
</style>
