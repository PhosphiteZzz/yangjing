const constant = {
  upload_common_path: "/api/file/upload/common",
  upload_common_type: [
    "bmp",
    "jpg",
    "jpeg",
    "png",
    "tif",
    "gif",
    "pcx",
    "tga",
    "exif",
    "fpx",
    "svg",
    "psd",
    "cdr",
    "pcd",
    "dxf",
    "ufo",
    "eps",
    "ai",
    "raw",
    "WMF",
    "webp"
  ],
  upload_file_type: ["image/png", "image/jpeg"]
};
export default {
  install(Vue) {
    Vue.prototype.constant = constant;
  }
};
