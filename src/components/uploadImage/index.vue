<template>
  <div :class="['component-upload-image', { normal: size === 'normal' }]">
    <el-upload
      ref="upload"
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      :accept="accept"
      :data="uploadData"
      name="file"
      :disabled="Object.keys(filelist).length > 0"
      :show-file-list="false"
      style="display: inline-block; vertical-align: top"
    >
      <img
        v-if="Object.keys(filelist).length <= 0"
        :src="value"
        class="avatar"
        ref="img"
      />
      <viewer
        v-else
        :images="enlargeSrc"
        :class="['avatar', { border: Object.keys(filelist).length > 0 }]"
        ref="img"
      >
        <img v-for="(src, index) in enlargeSrc" :src="src" :key="index" />
      </viewer>
      <span
        class="closeIcon"
        @click.stop="clearFiles"
        v-if="Object.keys(filelist).length > 0"
      ></span>
    </el-upload>

    <div class="upload-explain" v-html="explain" v-if="explain"></div>
    <div class="upload-tips" v-html="text" v-if="text"></div>
    <div class="upload-format" v-if="code === 'authorization_letter'">
      （仅支持png，jpg，jpeg格式图片）
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      uploadImgUrl: this.imgUrl, // 上传的图片服务器地址
      filesImg: require("@/assets/icon/yj_icon_mr.png"),
      filelist: {},
      uploadData: {
        categoryCode: this.code
      },
      visible: false,
      enlargeSrc: []
    };
  },
  props: {
    size: {
      type: String,
      default: "normal"
    },
    code: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: ".jpg,.png"
    },
    explain: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    imgUrl: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    //编辑的文件列表
    list: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.list && Object.keys(this.list).length > 0) {
        this.filelist = this.list;
        this.choosePic(location.origin + "/api" + this.filelist.path);
      }
    });
  },
  methods: {
    /** 关闭弹窗 */
    closeModal() {
      this.visible = false;
    },
    /** 删除文件 */
    clearFiles() {
      // this.$refs.img.src = this.value;
      this.enlargeSrc = [this.value];
      this.$emit("deleteId", {
        code: this.code,
        result: this.filelist
      });
      this.filelist = {};
    },
    /** 上传成功 */
    handleUploadSuccess(res) {
      this.filelist = res.data;
      let params = {
        code: this.code,
        result: res.data
      };
      this.$emit("returnId", params);
      this.loading.close();
      this.choosePic(res.data.url);
    },
    /** 判断显示哪种默认图 */
    choosePic(url) {
      let index = url.lastIndexOf(".");
      let ext = url.substr(index + 1).toLowerCase();
      if (this.constant.upload_common_type.indexOf(ext) === -1) {
        this.enlargeSrc = [this.filesImg];
        return;
      }
      this.enlargeSrc = [url];
    },
    handleBeforeUpload(file) {
      if (this.constant.upload_file_type.indexOf(file.type) === -1) {
        this.$message({
          type: "error",
          message: "请上传png，jpg，jpeg格式图片！",
          duration: 2000,
          center: true
        });
        return false;
      }
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    handleUploadError() {
      this.$message({
        type: "error",
        message: "上传失败",
        duration: 2000,
        center: true
      });
      this.loading.close();
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.el-upload--picture-card {
  border: none;
  width: 184px;
  height: 133px;
  position: relative;
  background: transparent;
}
.avatar {
  width: 184px;
  height: 133px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.border {
  background: #f8f8f8;
  border: 1px solid #eeeeee;
}
.upload-tips {
  margin-top: 22px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #d8c6b3;
  a {
    color: #ee5555;
  }
}
.upload-explain {
  text-align: center;
  margin-top: 22px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.upload-format {
  position: absolute;
  left: 200px;
  bottom: 52px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #d8c6b3;
}
.closeIcon {
  display: inline-block;
  position: absolute;
  width: 24px;
  height: 24px;
  right: -24px;
  top: -24px;
  background: url("~@/assets/icon/yj_icon_ygb.png") center center no-repeat;
}
.normal {
  .upload-tips {
    font-size: 14px;
  }
  .upload-explain {
    font-size: 14px;
  }
  .upload-format {
    position: absolute;
    left: 200px;
    bottom: 52px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #d8c6b3;
  }
}
.upload-plug {
  /deep/.el-dialog__body {
    height: 700px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
