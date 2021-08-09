const path = require("path");
const webpack = require("webpack");
const resolve = function (dir) {
  return path.join(__dirname, dir);
};
const vars = path.resolve(__dirname, "src/assets/styles/common.less");

const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"));
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "0.0.0.0", //局域网和本地访问
    port: "8080",
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        // target: "", //
        target: "https://zb.lygshjd.com/",
        // target: "http://192.168.0.101:8888",
        // target: "http://192.168.0.139:8888",
        secure: false,
        /* 允许跨域 */
        changeOrigin: true,
        ws: true
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      },
      less: {
        globalVars: {
          hack: `true; @import "${vars}"`
        }
      }
    }
  }
};
