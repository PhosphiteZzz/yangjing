<template>
  <div class="editPwd">
    <div class="list-top">
      <div class="list-top-title">修改密码</div>
    </div>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="原始密码" prop="password">
        <el-input
          v-model.trim="form.password"
          type="password"
          :maxlength="16"
          :minlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassWord">
        <el-input
          v-model.trim="form.newPassWord"
          type="password"
          :maxlength="16"
          :minlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassWord">
        <el-input
          v-model.trim="form.confirmPassWord"
          type="password"
          @blur="blurPassword"
          :maxlength="16"
          :minlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="edit-btn" @click="handleEdit">修改</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getEditPass } from "@/api/personal.js";
export default {
  data() {
    return {
      form: {
        password: "",
        newPassWord: "",
        confirmPassWord: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入原始密码", trigger: "blur" },
          {
            pattern: /^[\da-zA-Z_]{6,16}$/,
            message: "请输入6-16个字母、数字、下划线密码"
          }
        ],
        newPassWord: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)[\da-zA-Z_]{6,16}$/,
            message: "请输入6-16个字母、数字、下划线组合密码"
          }
        ],
        confirmPassWord: [
          { required: true, message: "请输入确认新密码", trigger: "blur" },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)[\da-zA-Z_]{6,16}$/,
            message: "请输入6-16个字母、数字、下划线组合密码"
          }
        ]
      }
    };
  },
  methods: {
    /** 验证新密码和确认密码是否一致 */
    blurPassword() {
      if (this.form.newPassWord !== this.form.confirmPassWord) {
        this.$message({
          message: "两次密码输入的不一致！",
          center: true,
          //duration: 2000,
          type: "error"
        });
      }
    },
    /** 修改密码 */
    handleEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          getEditPass(this.form).then(result => {
            if (result.code === 200) {
              this.$message({
                message: "密码修改成功，请重新登录！",
                center: true,
                //duration: 2000,
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/login/index"
                });
              }, 2000);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.editPwd {
  padding-left: 14px;
  padding-right: 21px;
  .list-top {
    border-bottom: 1px solid @border-less;
  }
  height: 100%;
  background: @white;
  /deep/.el-form {
    height: calc(~"100% - 72px");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-form-item {
      .el-form-item__label {
        font-size: 14px;
        color: #666666;
        text-align: right;
        padding: 0 29px 0 0;
      }
    }
    .el-input {
      width: 240px;
    }
    .edit-btn {
      margin-top: 17px;
      width: 240px;
      height: 40px;
      background: @theme;
      color: @white;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      border-radius: 4px;
    }
  }
}
</style>
