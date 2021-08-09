<template>
  <div style="padding-top: 20px" id="start">
    <div class="home main-width">
      <!-- 幻灯/行业新闻/登录 -->
      <section class="home-news clearfix">
        <div class="swiper-box">
          <swiper ref="swipers" :options="options">
            <swiper-slide v-for="item in bannerList" :key="item.id">
              <img
                v-if="item.sysFile"
                :src="location.origin + '/api' + item.sysFile.path"
                :alt="item.title"
                :title="item.title"
                @click="enterDetails(item.id, '行业新闻')"
              />
              <div class="mark" v-text="item.title"></div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="news-box">
          <div class="news-box-title">
            <div class="left">行业新闻</div>
            <div class="right" title="更多">
              <router-link :to="{ path: '/index/news' }">MORE+</router-link>
            </div>
          </div>
          <div class="news-box-cont" v-if="newsList.length > 0">
            <div
              class="news-box-cont-item"
              v-for="(item, index) in newsList"
              @click="enterDetails(item.id, '行业新闻')"
              :key="index"
            >
              <div class="icon"></div>
              <div class="title" v-text="item.title" :title="item.title"></div>
              <div
                class="time"
                v-text="timeTransFor(item.createTime)"
                :title="item.createTime"
              ></div>
            </div>
          </div>
          <div v-else class="nodataAvailableA"></div>
        </div>
        <div class="login-box">
          <div class="title-item">
            <div class="title">用户登录</div>
          </div>
          <div class="role-item">
            <div class="role-common" @click="supplierLogin">
              <span class="icon gys"></span>
              <span class="text" title="供应商">供应商</span>
              <span class="arrow"></span>
            </div>
            <div class="role-common" @click="purLogin">
              <span class="icon cgr"></span>
              <span class="text" title="采购人">采购人</span>
              <span class="arrow"></span>
            </div>
            <div class="role-common" @click="superLogin">
              <span class="icon jgr"></span>
              <span class="text" title="监管人">监管人</span>
              <span class="arrow"></span>
            </div>
            <!-- <div class="role-common" @click="expertLogin">
              <span class="icon zjdl"></span>
              <span class="text" title="专家登录">专家登录</span>
              <span class="arrow"></span>
            </div> -->
          </div>
        </div>
      </section>
      <!-- 采购公告/通知公告 -->
      <section class="home-notice">
        <div class="pur-notice">
          <div class="common-box">
            <!-- <div class="common-title">
              <div class="common-title-text">采购公告</div>
              <div class="common-title-more">MORE+</div>
            </div> -->
            <div class="common-tap">
              <div class="tap-box">
                <div
                  :class="['tap', { tapActive: noticeIndex === 0 }]"
                  @click="toggleNotice(0)"
                >
                  采购公告
                </div>
                <div
                  :class="['tap', { tapActive: noticeIndex === 1 }]"
                  @click="toggleNotice(1)"
                >
                  澄清答疑
                </div>
              </div>
              <div class="common-title-more" title="更多">
                <router-link :to="returnPath(noticeIndex)">MORE+</router-link>
              </div>
            </div>
          </div>
          <div class="pur-notice-list" v-if="noticeIndex === 0">
            <div v-if="annonList.length > 0">
              <div
                class="common-item"
                v-for="(item, index) in annonList"
                @click="enterNoExplantion(item.id, noticeIndex)"
                :key="index"
              >
                <div class="icon"></div>
                <div
                  :class="['status', handleStatus(item.process)]"
                  v-text="item.processName"
                ></div>
                <div
                  :class="[`type_${item.project.bidWay}`]"
                  v-text="`[${item.project.bidWayName}]`"
                ></div>
                <div
                  class="title"
                  v-text="item.title"
                  :title="item.title"
                ></div>
                <div
                  class="time"
                  v-text="timeFormatter(item.createTime)"
                  :title="item.createTime"
                ></div>
              </div>
            </div>
            <div v-else class="nodataAvailableB"></div>
          </div>
          <div class="question-notice-list" v-else>
            <div v-if="explanList.length > 0">
              <div
                class="common-item"
                v-for="(item, index) in explanList"
                @click="enterNoExplantion(item.id, noticeIndex)"
                :key="index"
              >
                <div
                  class="title"
                  v-text="item.proName"
                  :title="item.title"
                ></div>
                <div
                  class="time"
                  v-text="timeTransFor(item.createTime)"
                  :title="item.createTime"
                ></div>
              </div>
            </div>
            <div v-else class="nodataAvailableB"></div>
          </div>
        </div>
        <!-- 成交结果公示 -->
        <div class="result-notice">
          <div class="common-box">
            <div class="common-title">
              <div class="common-title-text">成交结果公示</div>
              <div class="common-title-more" title="更多">
                <router-link
                  :to="{
                    path: '/index/transInfo/result?tradeType=0&record='
                  }"
                  >MORE+</router-link
                >
              </div>
            </div>
          </div>
          <div class="result-notice-list" v-if="tenderList.length > 0">
            <div
              class="common-item"
              v-for="(item, index) in tenderList"
              @click="enterResultDetails(item.id)"
              :key="index"
            >
              <div class="title" v-text="item.title" :title="item.title"></div>
              <div
                class="time"
                v-text="timeTransFor(item.createTime)"
                :title="item.createTime"
              ></div>
            </div>
          </div>
          <div v-else class="nodataAvailableA"></div>
        </div>
      </section>
      <!-- 公众号 -->
      <div class="account" v-if="showCode">
        <div class="close" @click.stop="handleCode"></div>
        <div class="qrCode">
          <img :src="require('@/assets/icon/code.jpg')" alt="二维码" />
        </div>
        <div class="qrTitle">关注公众号</div>
        <div class="qrTitle">及时掌握招投标动态</div>
      </div>
    </div>
    <!-- 主体信息/诚信（信用）信息  -->
    <!-- <section class="home-info">
      <div class="main-width">
        <div class="info-notice">
          <div class="common-box">
            <div class="common-title">
              <div class="common-title-text">供应商信息</div>
              <div class="common-title-more" title="更多">
                <router-link :to="{ path: '/index/subinfor' }"
                  >MORE+</router-link
                >
              </div>
            </div>
          </div>
          <div class="info-notice-list">
            <div class="table-header">
              <div class="index">序号</div>
              <div class="company">单位名称</div>
              <div class="code">社会统一信用代码</div>
            </div>
            <div class="table-list">
              <div
                class="table-list-item"
                v-for="(item, index) in mainList"
                :key="index"
              >
                <div class="index" v-text="`${index + 1}`"></div>
                <div
                  class="company"
                  v-text="item.nickName"
                  :title="item.nickName"
                ></div>
                <div
                  class="code"
                  v-text="item.creditCode"
                  :title="item.creditCode"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="credit-notice">
          <div class="common-box">
            <div class="common-title">
              <div class="common-title-text">信用信息</div>
              <div class="common-title-more" title="更多">
                <router-link :to="{ path: '/index/creditinfo/info' }"
                  >MORE+</router-link
                >
              </div>
            </div>
          </div>
          <div class="credit-notice-list">
            <div
              class="common-item"
              v-for="(item, index) in creditList"
              @click="enterDetails(item.id, '信用信息')"
              :key="index"
            >
              <div class="title" v-text="item.title" :title="item.title"></div>
              <div
                class="time"
                v-text="timeTransFor(item.createTime)"
                :title="item.createTime"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- 今日交易 -->
    <section class="home-today main-width">
      <div class="common-box">
        <div class="common-title">
          <div class="common-title-text">今日交易</div>
        </div>
      </div>
      <div class="home-today-list">
        <div class="notice">
          <div
            class="notice-text"
            v-text="numList.todayNum"
            :title="numList.todayNum"
          ></div>
          <div class="notice-unit">公告(个)</div>
        </div>
        <div class="public">
          <div
            class="public-text"
            v-text="numList.hitNum"
            :title="numList.hitNum"
          ></div>
          <div class="public-unit">公示(个)</div>
        </div>
        <div class="opening">
          <div
            class="opening-text"
            v-text="numList.openNum"
            :title="numList.openNum"
          ></div>
          <div class="opening-unit">开标(场)</div>
        </div>
      </div>
    </section>
    <!-- 交易统计 -->
    <section class="home-count main-width">
      <div class="common-box">
        <div class="common-title">
          <div class="common-title-text">交易统计</div>
        </div>
      </div>
      <div class="count-btn">
        <div :class="{ 'active-btn': dateIdx === 0 }" @click="toggleDate(0)">
          本月
        </div>
        <div :class="{ 'active-btn': dateIdx === 1 }" @click="toggleDate(1)">
          季度
        </div>
        <div :class="{ 'active-btn': dateIdx === 2 }" @click="toggleDate(2)">
          本年
        </div>
      </div>
      <div class="count-chart">
        <div class="chart-box">
          <div ref="chart"></div>
        </div>
        <div class="table-box">
          <div class="all-amount">
            <div class="all-amount-text">
              本{{ dateIdxList[dateIdx] }}交易总数(宗)
            </div>
            <div class="all-amount-cont">
              <span
                class="number"
                v-for="(item, index) in countList"
                :key="index"
                v-text="item"
              ></span>
            </div>
          </div>
          <div class="all-table">
            <div class="all-table-header">
              <div class="type">交易类型</div>
              <div class="count">交易总数</div>
            </div>
            <div class="all-table-cont">
              <div
                class="all-table-cont-item"
                v-for="(item, index) in tradeList"
                :key="index"
              >
                <div class="type" v-text="item.tradeType"></div>
                <div class="count" v-text="item.num"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/**
 * 首页  home
 * @author li_xiangjian
 */
import { barOption } from "@/assets/utils/charts.js";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import {
  getDicts,
  getNoticeList,
  getMainInfo,
  getBannerList,
  getMoreInfo,
  getTypeNum,
  getExplanation,
  getProjectNum,
  getHitlist
} from "@/api/index.js";
import { getToken } from "@/utils/auth.js";
import "swiper/swiper-bundle.css";

export default {
  data() {
    return {
      //采购公告
      annonList: [],
      newsList: [],
      noticeList: [],
      tenderList: [],
      mainList: [],
      bannerList: [],
      tradeList: [],
      creditList: [],
      //交易总数
      countList: [],
      //澄清答疑
      explanList: [],
      noticeIndex: 0,
      //本月 季度 本年切换idx
      dateIdx: 0,
      dateIdxList: {
        0: "月",
        1: "季度",
        2: "年"
      },
      page: {
        pageNum: 1,
        pageSize: 5
      },
      pageMore: {
        pageNum: 1,
        pageSize: 8
      },
      location: location,
      //显示公众号
      showCode: true,
      //数目
      numList: {
        openNum: "", //开标
        todayNum: "", //公告
        hitNum: "" //公示
      },
      //公告类型
      noticeOptions: [],
      //交易类型
      tradeOptions: [],
      options: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        effect: "fade",
        fade: {
          crossFade: false
        },
        speed: 2000,
        autoplay: { delay: 5000 }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.swipers.$swiper;
    }
  },
  directives: {
    swiper: directive
  },
  created() {
    this.$nextTick(() => {
      this.getEchartData();
    });
    this.init();
  },
  mounted() {
    document.querySelector("#start").scrollIntoView(true);
  },
  methods: {
    /** 初始化页面数据 */
    init() {
      //获取字典
      getDicts("notice_type,trade_type").then(result => {
        this.noticeOptions = result.data.notice_type;
        this.tradeOptions = result.data.trade_type;
      });
      //采购公告
      getNoticeList(this.pageMore).then(result => {
        this.annonList = result.rows;
      });
      //主体信息
      // getMainInfo({
      //   pageNum: 1,
      //   pageSize: 4
      // }).then(result => {
      //   this.mainList = result.rows;
      // });
      // 轮播图
      getBannerList().then(result => {
        this.bannerList = result.data;
      });
      //行业新闻
      getMoreInfo("news", this.page).then(result => {
        this.newsList = result.rows;
      });
      //通知公告
      getMoreInfo("notice", this.page).then(result => {
        this.noticeList = result.rows;
      });
      //成交结果公示
      getHitlist(this.pageMore).then(result => {
        this.tenderList = result.rows;
      });
      //澄清答疑
      getExplanation(this.pageMore).then(result => {
        this.explanList = result.rows;
      });
      //公示/公告数据
      getTypeNum().then(result => {
        let { openNum, todayNum, hitNum } = result.data;
        this.numList = {
          openNum,
          todayNum,
          hitNum
        };
      });
      //信用信息
      // getMoreInfo("credit", this.page).then(result => {
      //   this.creditList = result.rows;
      // });
      getProjectNum("month").then(result => {
        this.refreshCharts(result);
      });
    },
    /** 进入详情 */
    enterDetails(id, str) {
      this.$router.push({
        path: "/index/details/",
        query: {
          id: id,
          fLeave: str
        }
      });
    },
    //采购公告/澄清答疑切换
    toggleNotice(type) {
      this.noticeIndex = type;
      if (type === 0) {
        //采购公告
        getNoticeList(this.pageMore).then(result => {
          this.annonList = result.rows;
        });
        return;
      }
      //澄清答疑
      getExplanation(this.pageMore).then(result => {
        this.explanList = result.rows;
      });
    },
    /** 进入采购公告/澄请公告 */
    enterNoExplantion(id, index) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: id,
          fLeave: "交易信息",
          index: index
        }
      });
    },
    /** 进入成交结果公示 */
    enterResultDetails(id) {
      this.$router.push({
        path: "/index/transdetails",
        query: {
          id: id,
          fLeave: "交易信息",
          index: 2
        }
      });
    },
    /** 返回path */
    returnPath(index) {
      let path = index ? "clarify" : "notice";
      return {
        path: `/index/transInfo/${path}`,
        query: {
          tradeType: 0,
          record: ""
        }
      };
    },
    /** 刷新echarts */
    refreshCharts(result) {
      let tradeLabel = [];
      let tradeValue = [];
      let allCount = 0;
      this.tradeList = result.data;
      this.tradeList.map(item => {
        tradeLabel.push(item.tradeType);
        tradeValue.push(item.num);
      });
      this.getEchartData(tradeLabel, tradeValue);
      tradeValue.forEach(item => {
        allCount += item;
      });
      // this.allCount = allCount;
      let numList = this.prefixInteger(allCount, 6)
        .toString()
        .split("");
      this.countList = numList;
    },
    /** 循环补0 */
    prefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    /** 状态 */
    handleStatus(type) {
      let status =
        type === "0" ? "bidding" : type === "1" ? "process" : "ending";
      return status;
    },
    /** 格式化时间格式 */
    timeFormatter(time) {
      return time.split(" ")[0];
    },
    /** 切换tab */
    refreshCredit(type) {
      //信用信息
      getMoreInfo("credit").then(result => {
        this.creditList = result.rows;
      });
    },
    /** 切换本月，季度，本年 */
    toggleDate(type) {
      this.dateIdx = type;
      let str = type === 0 ? "month" : type === 1 ? "quarter" : "year";
      getProjectNum(str).then(result => {
        this.refreshCharts(result);
      });
    },
    /** 供应商登录 */
    supplierLogin() {
      if (getToken()) {
        this.$message({
          type: "warning",
          //duration: 2000,
          message: "用户已登录！",
          center: true
        });
        return;
      }
      this.$router.push({
        path: "/login"
      });
    },
    /** 采购人 */
    purLogin() {
      // location.href = ;
      window.open(location.origin + "/admin/");
    },
    /** 监管人登录 */
    superLogin() {
      window.open(location.origin + "/admin/");
    },
    /** 专家登录 */
    expertLogin() {
      window.open(location.origin + "/experts/");
    },
    /** echarts数据 */
    getEchartData(label, data) {
      const chart = this.$refs.chart;
      if (chart) {
        this.$echarts.dispose(chart);
        const myChart = this.$echarts.init(chart);
        let option = barOption;
        option.xAxis.data = label;
        option.series[0].data = data;
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function() {
          myChart.resize();
        });
      });
    },
    /** 点击关闭二维码 */
    handleCode() {
      this.showCode = false;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  position: relative;
}
.home-news {
  height: 272px;
  display: flex;
  > div {
    height: 100%;
  }
  .swiper-box {
    width: 362px;
    .swiper-container {
      position: relative;
      width: 100%;
      height: 100%;
      /deep/.swiper-pagination-bullet-active {
        background: @white;
      }
      .swiper-slide {
        position: relative;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .mark {
          width: 100%;
          height: 31px;
          line-height: 32px;
          font-size: 12px;
          color: @white;
          bottom: 0;
          background: rgba(51, 51, 51, 0.6);
          position: absolute;
          z-index: 5;
          text-indent: 9px;
        }
      }
      .swiper-pagination {
        display: flex;
        justify-content: flex-end;
        padding-right: 40px;
        /deep/.swiper-pagination-bullet {
          width: 9px;
          height: 9px;
        }
      }
    }
  }
  .news-box {
    flex: 1;
    margin: 0 22px;
    &-title {
      display: flex;
      justify-content: space-between;
      height: 34px;
      line-height: 34px;
      position: relative;
      border-bottom: @border 1px solid;
      .left {
        height: 34px;
        color: @white;
        min-width: 107px;
        background: url("~@/assets/icon/yj_bg_hyxw.png");
        font-size: 16px;
        text-align: left;
        text-indent: 16px;
        // cursor: pointer;
      }
      .right {
        font-size: 14px;
        height: 100%;
        line-height: 34px;
        color: @grey;
        letter-spacing: 1px;
        cursor: pointer;
        a {
          color: #999999;
        }
      }
    }
    &-cont {
      height: calc(~"100% - 34px");
      padding-top: 12px;
      &-item {
        display: flex;
        align-items: center;
        line-height: 45px;
        height: 45px;
        border-bottom: 1px dashed @border-less;
        cursor: pointer;
        .icon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: @theme;
        }
        .title {
          margin-left: 10px;
          max-width: 372px;
          flex: 1;
          .overflow();
        }
        .time {
          margin-left: 53px;
          width: 85px;
          text-align: right;
          font-size: 14px;
          font-weight: 500;
          color: @grey;
        }
      }
    }
  }
  .login-box {
    width: 267px;
    background: @white;
    box-shadow: 0px 5px 10px 0px rgba(215, 215, 215, 0.4);
    border-radius: 2px;
    padding: 0 17px 0 19px;
    .title-item {
      height: 33px;
      border-bottom: 1px solid @border;
      .title {
        width: 78px;
        height: 34px;
        line-height: 33px;
        border-bottom: 3px solid @theme;
        font-size: 16px;
        font-weight: 500;
      }
    }
    .role-item {
      padding: 18px 0 17px 0;
      height: calc(~"100% - 33px");
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .role-common {
        height: 40px;
        border: 1px solid @theme;
        border-radius: 4px;
        // margin: 20px 0;
        // margin-bottom: 14px;
        display: flex;
        position: relative;
        span {
          display: inline-block;
          height: 100%;
          font-size: 14px;
          font-weight: 500;
          color: @theme;
          letter-spacing: 5px;
        }
        cursor: pointer;
        .icon {
          height: 100%;
          width: 67px;
        }
        .text {
          line-height: 40px;
          flex: 1;
        }
        .arrow {
          width: 5px;
          height: 10px;
          position: absolute;
          right: 10px;
          top: 50%;
          background: url("~@/assets/icon/yj_icon_gd.png") center center
            no-repeat;
          transform: translateY(-50%);
        }
        .gys {
          background: url("~@/assets/icon/yj_icon_gys.png") center center
            no-repeat;
        }
        .cgr {
          background: url("~@/assets/icon/yj_icon_cgr.png") center center
            no-repeat;
        }
        .jgr {
          background: url("~@/assets/icon/yj_icon_jgr.png") center center
            no-repeat;
        }
        .zjdl {
          background: url("~@/assets/icon/yj_icon_zjdl.png") center center
            no-repeat;
        }
      }
    }
  }
}
.home-notice {
  margin-top: 27px;
  height: 390px;
  display: flex;
  > div {
    height: 100%;
  }
  .pur-notice {
    flex: 1;
    margin-right: 29px;
    &-list {
      height: calc(~"100% - 30px");
      .common-item {
        .title {
          text-indent: 5px;
          max-width: 300px;
        }
      }
    }
  }
  .result-notice {
    width: 585px;
    &-list {
      .common-item {
        .title {
          max-width: none;
        }
      }
    }
  }
  .question-notice {
    width: 586px;
    margin-right: 29px;
    &-list {
      height: calc(~"100% - 30px");
      .common-item {
        .title {
          max-width: 437px;
        }
      }
    }
  }
}
.home-info {
  margin-top: 20px;
  height: 306px;
  background-color: @background;
  .main-width {
    height: 100%;
    display: flex;
    padding-top: 20px;
  }
  .info-notice {
    width: 586px;
    margin-right: 29px;
    &-list {
      height: 236px;
      margin-top: 20px;
      .table-header {
        background-color: @border-less;
        display: flex;
        height: 26px;
        line-height: 26px;
        text-align: center;
        .index {
          width: 70px;
        }
        .company {
          flex: 1;
        }
        .code {
          width: 230px;
        }
      }
      .table-list {
        text-align: center;
        &-item {
          height: 44px;
          line-height: 44px;
          font-size: 14px;
          display: flex;
          border-bottom: 1px solid @border-less;
          .index {
            width: 70px;
          }
          .company {
            flex: 1;
            .overflow();
          }
          .code {
            width: 230px;
          }
        }
      }
    }
  }
  .credit-notice {
    max-width: 585px;
    flex: 1;
    &-list {
      .common-item {
        .title {
          max-width: none;
        }
      }
    }
  }
}
.home-today {
  padding-top: 20px;
  height: 278px;
  &-list {
    height: calc(~"100% - 30px");
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    > div {
      width: 383px;
      height: 202px;
      position: relative;
      > div {
        width: 100%;
        text-align: center;
        position: absolute;
        &:nth-of-type(1) {
          height: 48px;
          font-size: 60px;
          font-weight: 400;
          top: 66px;
        }
        &:nth-of-type(2) {
          height: 17px;
          font-size: 16px;
          font-weight: 400;
          bottom: 40px;
        }
      }
    }
    .notice {
      background: url("~@/assets/icon/yj_bg_gg.png");
      &-text {
        color: #4186e5;
      }
    }
    .public {
      background: url("~@/assets/icon/yj_bg_gs.png");
      &-text {
        color: #f67554;
      }
    }
    .opening {
      background: url("~@/assets/icon/yj_bg_kb.png");
      &-text {
        color: #29bbbf;
      }
    }
  }
}
.home-count {
  padding-top: 20px;
  height: 580px;
  .count-btn {
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      text-align: center;
      width: 127px;
      height: 34px;
      line-height: 34px;
      background: #ccc;
      border-radius: 17px;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
      margin: 0 18px;
    }
    .active-btn {
      background-color: @theme;
    }
  }
  .count-chart {
    height: calc(~"100% - 134px");
    display: flex;
    .chart-box {
      flex: 1;
      > div {
        width: 480px;
        height: 100%;
        margin-left: 20px;
      }
    }
    .table-box {
      width: 578px;
    }
  }
  .table-box {
    padding-top: 40px;
    .all-amount {
      display: flex;
      align-items: center;
      &-text {
        width: 171px;
        font-size: 16px;
        color: #666666;
        margin-right: 18px;
      }
      &-cont {
        span {
          display: inline-block;
          width: 44px;
          height: 51px;
          border: 1px solid @border;
          font-size: 24px;
          color: #666666;
        }
        .number {
          line-height: 51px;
          text-align: center;
          margin: 0 5px;
        }
      }
    }
    .all-table {
      margin-top: 43px;
      width: 494px;
      &-header {
        display: flex;
        height: 50px;
        line-height: 50px;
        background: #f4f4f4;
        > div {
          width: 50%;
          text-align: center;
        }
      }
      &-cont {
        &-item {
          display: flex;
          border: 1px solid @border-less;
          border-top: none;
          > div {
            width: 50%;
            height: 50px;
            text-align: center;
            line-height: 50px;
          }
        }
      }
    }
  }
}
</style>
