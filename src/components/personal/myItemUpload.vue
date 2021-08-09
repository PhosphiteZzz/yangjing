<template>
  <el-dialog
    title="递交标书"
    :visible.sync="visible"
    width="512px"
    :close-on-click-modal="false"
    append-to-body
    @close="close"
  >
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item>
        <div class="tips">
          <span>!</span>
          标书必须自行加密，否则造成泄漏后果自负
        </div>
      </el-form-item>

      <!-- :on-success="handleUploadSuccess"  :http-request="uploadHandler"             :before-upload="beforeUpload"                       -->
      <el-form-item label="电子标书：" prop="type">
        <el-upload
          class="upload-demo"
          action=""
          :on-change="onExceed"
          :http-request="uploadSectionFile"
          :accept="accept"
          :file-list="fileList"
        >
          <div class="upload">上传文件</div>
        </el-upload>
        <div class="tips-t">
          支持DOC、PDF格式，文件大小不能超过30M
        </div>
      </el-form-item>
      <div class="progress">
        <el-progress
          v-if="progressFlag"
          style="width: 285px;margin-top: 8px"
          :text-inside="true"
          :stroke-width="15"
          :percentage="progressPercent"
        />
      </div>
    </el-form>
    <div class="btn" slot="footer">
      <div class="button submit" @click="submit">提交</div>
      <div class="button cancel" @click="close">取消</div>
    </div>
  </el-dialog>
</template>
<script>
import { postTenderFile } from "@/api/personal.js";
export default {
  data() {
    return {
      form: {
        type: "",
        question: ""
      },
      progressFlag: false,
      progressPercent: 0,
      newFile: null,
      fileList: [],
      accept: ".doc,.docx,.pdf",
      visible: false,
      forms: undefined
    };
  },
  props: {
    noticeId: {
      type: Number,
      default: -1
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
    onExceed(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    beforeUpload(file) {
      const isLimit = file.size / 1024 / 1024 < 30;
      if (!isLimit) {
        this.$message({
          type: "error",
          //duration: 2000,
          center: true,
          message: "上传文件大小不能超过30MB!"
        });
        return;
      }
      if (file) {
        this.newFile = file;
      } else {
        return false;
      }
    },
    uploadHandler(param) {},
    /**
     *  自定义上传图片的方法
     */
    uploadSectionFile(params) {
      // 上传新文件时，将进度条值置为零
      this.progressPercent = 0;
      const file = params.file;
      const packageSize = (file.size / (1024 * 1024)).toFixed(2) + "M"; // 文件大小，转化成M
      if (packageSize >= 30) {
        this.$message({
          type: "error",
          //duration: 2000,
          center: true,
          message: "上传文件大小不能超过30MB!"
        });
        return;
      }
      if (file) {
        this.newFile = file;
      } else {
        return false;
      }
    },
    submit() {
      if (this.newFile) {
        this.forms = new FormData(); // 实例化一个formData，用来做文件上传
        this.forms.append("file", this.newFile);
        this.forms.append("noticeId", this.noticeId);
        this.progressFlag = true;
        // 将图片单独上传，并返回路径
        // 进度条
        const uploadProgressEvent = progressEvent => {
          this.progressPercent = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        };
        postTenderFile(this.forms, uploadProgressEvent).then(result => {
          if (result.code === 200) {
            this.progressFlag = false;
            this.$message({
              type: "success",
              //duration: 2000,
              center: true,
              message: result.msg
            });
            this.$emit("success");
          }
        });
        return;
      }
      this.$message({
        type: "error",
        //duration: 2000,
        center: true,
        message: "请递交标书！"
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.el-form {
  min-height: 190px;
  position: relative;
  .progress {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
}
/deep/.el-form-item__label {
  height: 50px;
  line-height: 50px;
}
/deep/.el-form-item__content {
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
// /deep/.el-upload-list__item {
//   transition: none !important;
// }
.upload-demo {
  /deep/.el-upload {
    margin-top: 7px;
  }
}
.tips {
  font-size: 14px;
  color: @theme;
  span {
    width: 15px;
    height: 15px;
    text-align: center;
    display: inline-block;
    border-radius: 50%;
    color: @white;
    line-height: 15px;
    font-size: 12px;
    background-color: @theme;
  }
}
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
.upload {
  width: 120px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  color: @white;
  background-color: @theme;
}
/deep/.el-dialog__footer {
  padding: 0 20px 20px;
}
</style>
