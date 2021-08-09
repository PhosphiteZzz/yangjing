<template>
  <div :class="['component-upload-image', { normal: size === 'normal' }]">
    <el-upload
      class="other"
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :limit="9"
      :data="uploadData"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <viewer :images="[dialogImageUrl]" style="display:none" ref="viewer">
      <img :src="dialogImageUrl" />
    </viewer>
    <div class="upload-tips" v-html="text" v-if="text"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadImgUrl: this.imgUrl, // 上传的图片服务器地址
      dialogImageUrl: "",
      fileList: [],
      uploadData: {
        categoryCode: this.code
      },
      length: null
    };
  },
  props: {
    size: {
      type: String,
      default: "normal"
    },
    text: {
      type: String,
      default: ""
    },
    imgUrl: {
      type: String,
      default: ""
    },
    code: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.list && this.list.length > 0) {
        this.length = this.fileList.length;
        this.fileList = this.list.map(item => {
          return {
            id: item.id,
            url: location.origin + "/api" + item.path
          };
        });
        // this.choosePic(location.origin + "/api" + this.filelist.path);
      }
    });
  },
  mounted() {},
  methods: {
    beforeUpload(files) {
      var bool = true;
      if (this.length >= 9) {
        this.$message.error("最多只能上传9张！");
        bool = false;
      } else {
        bool = true;
      }
      return bool;
    },
    handleRemove(file, fileList) {
      this.length--;
      if (file.response) {
        this.$emit("deleteMoreId", {
          code: this.code,
          result: file.response.data
        });
        return;
      }
      this.$emit("deleteMoreId", {
        code: this.code,
        result: file
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      //队列问题 设置settimeout 0解决
      setTimeout(() => {
        this.$refs.viewer.$viewer.view(0);
      }, 0);
    },
    handleSuccess(response, file, fileList) {
      this.length = fileList.length;
      let params = {
        code: this.code,
        result: response.data
      };
      this.$emit("returnMoreId", params);
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.other {
  /deep/.el-upload--picture-card {
    border: 1px dashed #c0ccda;
  }
  /deep/.el-upload-list__item-thumbnail {
    object-fit: contain;
  }
  /deep/.el-upload-list__item.is-success {
    background-color: #f8f8f8;
    .el-upload-list__item-status-label {
      display: none;
    }
  }
  /deep/.el-upload-list__item {
    transition: none !important;
  }
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
</style>
