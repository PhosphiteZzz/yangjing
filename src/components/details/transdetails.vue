<template>
  <div class="transDetails">
    <div class="main-width">
      <div class="content-title">
        <span class="icon"></span>
        <div class="title">
          <router-link :to="{ path: '/index' }">首页></router-link>
        </div>
        <div class="title" v-if="fLeave" @click="routerTrade">
          {{ fLeave }}>
        </div>
        <div class="title" v-if="tLeave" @click="routerTrade">
          {{ tLeave }}>
        </div>
        <div class="title-current" v-if="tLeave">交易信息详情</div>
      </div>
      <div class="details-title">
        <div class="details-tap">
          <div
            :class="{ active: selectIdx === 0 }"
            @click="tapChangeByNId(0, currentNid)"
          >
            <p>采购公告</p>
            <span>{{ timeTransFor(noticeForm.createTime) }}</span>
          </div>
          <div
            :class="{ active: selectIdx === 1 }"
            @click="tapChangeByNId(1, currentNid)"
          >
            <p>澄清答疑</p>
            <span>{{ timeTransFor(explanForm.createTime) }}</span>
          </div>
          <div
            :class="{ active: selectIdx === 2 }"
            @click="tapChangeByNId(2, currentNid)"
          >
            <p>成交结果公示</p>
            <span>{{ timeTransFor(resultForm.createTime) }}</span>
          </div>
        </div>
        <!-- 采购公告 -->
        <div
          class="details-table"
          v-show="selectIdx === 0"
          v-if="showNotice"
          id="details-table"
        >
          <div>
            <div class="table-title">采购公告</div>
            <div class="table-cont" v-text="noticeForm.title"></div>
          </div>
          <div>
            <div class="table-title">发布时间</div>
            <div class="table-cont" v-text="noticeForm.createTime"></div>
          </div>
          <div v-if="tradeOptions.length > 0">
            <div class="table-title">交易信息分类</div>
            <div
              class="table-cont"
              v-text="commonFormatter(tradeOptions, noticeForm.tradeType)"
            ></div>
          </div>
          <div>
            <div class="table-title">采购文件/资格预审文件获取起止时间</div>
            <div class="table-cont">
              {{ noticeForm.getStartTime }} 至 {{ noticeForm.getEndTime }}
            </div>
          </div>
          <div v-if="wayOptions.length > 0">
            <div class="table-title">采购文件/资格预审文件获取方法</div>
            <div
              class="table-cont"
              v-text="commonFormatter(wayOptions, noticeForm.getWay)"
            ></div>
          </div>
          <div>
            <div class="table-title">文件售价(元)</div>
            <div
              class="table-cont red"
              v-text="noticeForm.attachmentMoney"
            ></div>
          </div>
          <div>
            <div class="table-title">采购文件/资格预审文件递交截止时间</div>
            <div class="table-cont" v-text="noticeForm.sendEndTime"></div>
          </div>
          <div>
            <div class="table-title">开标时间</div>
            <div class="table-cont" v-text="noticeForm.openTime"></div>
          </div>
          <div>
            <div class="table-title">开标地点</div>
            <div class="table-cont" v-text="noticeForm.tenderRoom"></div>
          </div>
          <div v-if="noticeOptions.length > 0">
            <div class="table-title">投标文件/资格预审申请文件递交方式</div>
            <div
              class="table-cont"
              v-text="commonFormatter(noticeOptions, noticeForm.sendWay)"
            ></div>
          </div>
          <div>
            <div class="table-title">是否允许联合体投标</div>
            <div
              class="table-cont"
              v-text="noticeForm.isAllowUnion === '1' ? '是' : '否'"
            ></div>
          </div>
          <!-- 购买文件 -->
          <section class="details-buy">
            <button v-if="noticeForm.buyCount >= 1" @click="downLoad">
              下载标书
            </button>
            <button @click="payForFiles" v-else>
              购买文件
            </button>
            <button
              class="bid-doc"
              @click="tenderSub"
              v-if="noticeForm.buyCount >= 1 && noticeForm.bidWay == '2'"
              v-text="noticeForm.tenderFileId ? '重递交标书' : '递交标书'"
            ></button>
          </section>
        </div>
        <!-- 澄清答疑 -->
        <div class="explan-table" v-show="selectIdx === 1" v-if="showExplan">
          <!-- <div class="explan-title">
            {{ explanForm.title }}
          </div> -->
          <div class="explan-item">
            <div class="table-title">澄清公告名称</div>
            <div class="table-cont">{{ explanForm.title }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">时间</div>
            <div class="table-cont">{{ explanForm.createTime }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">原公告内容</div>
            <div class="table-cont ql-editor" v-html="explanForm.content"></div>
          </div>
          <div class="explan-item">
            <div class="table-title">澄清答疑内容</div>
            <div
              class="table-cont ql-editor"
              v-html="explanForm.explanation"
            ></div>
          </div>
        </div>
        <!-- 成交结果公示 -->
        <div class="result-table" v-show="selectIdx === 2" v-if="showResult">
          <div class="explan-item">
            <div class="table-title">采购项目编号</div>
            <div class="table-cont">{{ resultForm.proNo }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">公告发布时间</div>
            <div class="table-cont">{{ resultForm.createTime }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">公告标题</div>
            <div class="table-cont">{{ resultForm.title }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">中标单位名称</div>
            <div class="table-cont">{{ resultForm.company }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">公告性质</div>
            <div class="table-cont">正常公告</div>
          </div>
          <div class="explan-item">
            <div class="table-title">交易信息分类</div>
            <div class="table-cont">{{ resultForm.tradeType }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">中标金额</div>
            <div class="table-cont">{{ resultForm.amount }}</div>
          </div>
          <div class="explan-item">
            <div class="table-title">价格单位</div>
            <div class="table-cont">万元</div>
          </div>
          <div class="explan-item">
            <div class="table-title">公告内容</div>
            <div class="table-cont ql-editor" v-html="resultForm.content"></div>
          </div>
        </div>
        <!-- 没有数据 -->
        <div>
          <nocontent
            v-if="!showNotice || !showExplan || !showResult"
          ></nocontent>
        </div>
      </div>
      <div
        class="details-text details-cont ql-container"
        v-show="selectIdx === 0"
      >
        <div v-html="content" class="ql-editor"></div>
      </div>
    </div>
    <!-- 支付弹窗 -->
    <el-dialog
      title="购买招标文件"
      :visible.sync="visible"
      width="700px"
      :close-on-click-modal="false"
      @close="closeModal"
    >
      <el-form ref="modalForm" :model="modalForm" label-width="120px">
        <el-form-item label="用户名" prop="nickName">
          {{ modalForm.nickName }}
        </el-form-item>
        <el-form-item label="项目" prop="nickName">
          {{ modalForm.proName }}
        </el-form-item>
        <el-form-item label="公告名称" prop="nickName">
          {{ modalForm.title }}
        </el-form-item>
        <el-form-item label="支付金额" prop="nickName" class="payColor">
          {{ modalForm.attachmentMoney }}
        </el-form-item>
        <el-form-item label="支付方式" prop="nickName" class="payMethod">
          <label class="wPay">
            <span class="icon"></span><span class="text">微信</span>
            <el-radio v-model="radio" :label="1"><span></span></el-radio>
          </label>
          <label class="aliPay">
            <span class="icon"></span><span class="text">支付宝</span>
            <el-radio v-model="radio" :label="2"><span></span></el-radio>
          </label>
        </el-form-item>
        <div class="action">
          <div @click="handlePay">支付</div>
          <div @click="closeModal">返回</div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 当订单为0元时，确认弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="open"
      width="700px"
      :close-on-click-modal="false"
      @close="closeOpenModal"
    >
      <div class="open">
        <p>此公告文件售价为 0 元，是否确认购买文件？</p>
        <div class="action">
          <div @click="confirmPay">确认</div>
          <div @click="closeOpenModal">取消</div>
        </div>
      </div>
    </el-dialog>
    <myItemUpload
      v-if="uploadVisible"
      @close="closeUploadModal"
      @success="success"
      :noticeId="currentNid"
    ></myItemUpload>
  </div>
</template>
<script>
import { getOrderCode, checkSocketStatus } from "@/api/index.js";
import {
  getTradeDetails,
  getExplanationDetails,
  getResultDetailsByNid,
  getResultDetails,
  getFullTime,
  getConditionVali,
  getDicts,
  downloadFiles
} from "@/api/index.js";
import { getToken, getUserInfo, getCode } from "@/utils/auth.js";
import nocontent from "@/components/common/nocontent.vue";
import myItemUpload from "@/components/personal/myItemUpload.vue";
export default {
  data() {
    return {
      id: "",
      fLeave: "",
      tLeave: "",
      content: "",
      config: "trade_type,get_way,notice_send_way",
      selectIdx: null,
      tradeOptions: [],
      wayOptions: [],
      noticeOptions: [],
      currentNid: "",
      visible: false,
      uploadVisible: false,
      open: false,
      radio: 1,
      //采购公告form
      noticeForm: {
        id: "", //公告id
        title: "",
        createTime: "",
        getStartTime: "",
        getEndTime: "",
        getWay: "",
        attachmentMoney: "",
        sendEndTime: "",
        openTime: "",
        tenderRoom: "",
        sendWay: "",
        isAllowUnion: "",
        tradeType: "",
        buyCount: -1,
        proName: "",
        tenderFileId: "",
        bidWay: ""
      },
      //澄清答疑form
      explanForm: {
        noticeId: "",
        title: "",
        content: "",
        explanation: "",
        createTime: ""
      },
      //成交结果公示form
      resultForm: {
        noticeId: "",
        proNo: "",
        createTime: "",
        title: "",
        company: "",
        tradeType: "",
        amount: "",
        content: ""
      },
      //支付弹窗form
      modalForm: {
        nickName: "",
        proName: "",
        title: "",
        attachmentMoney: ""
      },
      showNotice: true,
      showExplan: true,
      showResult: true,
      timer: null,
      time: 30000,
      socket: null,
      tap: null
    };
  },
  components: {
    nocontent,
    myItemUpload
  },
  methods: {
    routerLeave() {
      this.$router.push({
        path: "/index/transInfo/all"
      });
    },
    /** 关闭弹窗 */
    closeModal() {
      this.visible = false;
    },
    /**  */
    closeOpenModal() {
      this.open = false;
    },
    /** 下载标书 */
    downLoad() {
      downloadFiles(this.currentNid).then(result => {
        if (result.code === 200) {
          this.downloadFiles(result.msg);
        }
      });
    },
    /** 打开上传窗口 */
    tenderSub() {
      this.uploadVisible = true;
    },
    /** guanbi */
    closeUploadModal() {
      this.uploadVisible = false;
    },
    /** 上传成功 */
    success() {
      this.closeUploadModal();
    },
    /** 购买文件 */
    payForFiles() {
      let token = getToken();
      if (!token) {
        this.$message({
          message: "需要登录之后才能继续操作！",
          center: true,
          //duration: 2000,
          type: "error"
        });
        // this.$router.push("/login/index");
        this.$router.push({
          path: "/login/index",
          query: { redirect: this.$route.fullPath }
        });
        return;
      }
      this.checkLimit();
    },
    /** 确认是否购买0元文件 */
    confirmPay() {
      this.checkLimitFn();
    },
    /** 验证供应商权限 */
    checkLimit() {
      if (this.noticeForm.attachmentMoney === 0) {
        this.open = true;
        return;
      }
      this.checkLimitFn();
    },
    /** 验证供应商权限fn */
    checkLimitFn() {
      getConditionVali({
        noticeId: this.currentNid
      }).then(result => {
        if (result.code === 200) {
          this.modalForm.nickName = getUserInfo().nickName;
          this.modalForm.proName = this.noticeForm.proName;
          this.modalForm.title = this.noticeForm.title;
          this.modalForm.attachmentMoney = this.noticeForm.attachmentMoney;
          this.visible = true;
          return;
        }
        if (result.code === -21) {
          this.$message({
            message: "购买成功，即将刷新页面!",
            center: true,
            //duration: 2000,
            type: "success"
          });
          this.closeOpenModal();
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        }
      });
    },
    /**  */
    resetStatus() {
      this.showNotice = true;
      this.showExplan = true;
      this.showResult = true;
    },
    /**支付 */
    handlePay() {
      // if (this.radio === 2) {
      //   this.handleAlipay();
      //   return;
      // }
      let path = this.radio === 1 ? "/index/wepay" : "/index/alipay";
      this.$router.push({
        path,
        query: {
          noticeId: this.currentNid,
          payType: this.radio
        }
      });
    },
    /** 支付宝支付 */
    handleAlipay() {
      let params = {
        noticeId: this.currentNid,
        payType: this.radio
      };
      getOrderCode(params).then(result => {
        if (result.code === 200) {
          this.tap = window.open();
          let divForm = this.tap.document.getElementsByTagName("divform");
          if (divForm.length) {
            this.tap.document.body.removeChild(divForm[0]);
          }
          const div = this.tap.document.createElement("divform");
          div.innerHTML = result.data; // data就是接口返回的form 表单字符串
          this.tap.document.body.appendChild(div);
          this.tap.document.documentElement.style.height = "100%";
          document.querySelector("body").style.height = "100%";
          this.tap.document.forms[0].submit();
          this.openSocket();
          this.setSocket();
        }
      });
    },
    /** socket连接 */
    openSocket() {
      // m 供应商和专家， u 后台用户
      let userType = "m";
      let userId = getUserInfo().userId;
      // let socketUrl = `ws://192.168.0.101:8888/api/websocket/${userType}/${userId}/${getCode()}`;
      let socketUrl = `wss://zb.lygshjd.com/websocket/${userType}/${userId}/${getCode()}`;

      this.socket = new this.$webSocket({ ip: socketUrl });
      this.socket.onmessage = e => {
        if (e.action && e.action === "pay_success") {
          this.tap.close();
          this.$message({
            message: "支付成功！",
            center: true,
            //duration: 2000,
            type: "success"
          });
          location.reload();
        }
      };
    },
    /** 重新连接socket */
    reConnectSocket() {
      this.socket.closeSocket();
    },
    /** 每30s请求一次长连接 */
    setSocket() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        let params = {
          userType: Number(getUserInfo().userType) === 0 ? "u" : "m",
          userId: getUserInfo().userId,
          randomCode: getCode()
        };
        checkSocketStatus(params).then(result => {
          if (result.code !== 200) return;
          !result.online ? this.reConnectSocket() : "";
        });
      }, this.time);
    },
    routerTrade() {
      this.$router.push({
        path: "/index/transInfo/all"
      });
    },
    commonFormatter(options, type) {
      return this.selectDictLabel(options, type);
    },
    /** tap切换(本页面跳转) */
    tapChangeByNId(index, id) {
      this.resetStatus();
      let type = Number(index);
      this.selectIdx = type;
      let object = {
        0: this.getNoticeInfor,
        1: this.getExplanInfo,
        2: this.getResultsInfoNId
      };
      object[type](id, "nid");
    },
    /** tap切换(从首页跳转) */
    tapChangeById(index, id) {
      this.resetStatus();
      let type = Number(index);
      this.selectIdx = type;
      let object = {
        0: this.getNoticeInfor,
        1: this.getExplanInfo,
        2: this.getResultsInfo
      };
      object[type](id);
    },
    /** 采购公告信息id */
    getNoticeInfor(id) {
      getTradeDetails(id).then(result => {
        if (result.code === 200) {
          this.showNotice = true;
          this.currentNid = result.data.id;
          this.getDateForSearch(result.data.id);
          for (let i in this.noticeForm) {
            this.noticeForm[i] = result.data[i];
          }
          this.noticeForm.tradeType = result.data.project.tradeType;
          this.noticeForm.proName = result.data.project.proName;
          this.noticeForm.bidWay = result.data.project.bidWay;
          this.content = result.data.content;
          this.tLeave = this.commonFormatter(
            this.tradeOptions,
            result.data.project.tradeType
          );
          return;
        }
        this.showNotice = false;
      });
    },
    /** 澄清答疑信息id */
    getExplanInfo(id, type) {
      let params = type === "nid" ? { noticeId: id } : { id };
      getExplanationDetails(params).then(result => {
        if (result.code === 200) {
          this.showExplan = true;
          this.currentNid = result.data.noticeId;
          this.getDateForSearch(result.data.noticeId);
          for (let i in result.data) {
            this.explanForm[i] = result.data[i];
          }
          this.tLeave = this.commonFormatter(
            this.tradeOptions,
            result.data.tradeType
          );
          return;
        }
        this.showExplan = false;
      });
    },
    /** 成交结果公示id */
    getResultsInfo(id) {
      getResultDetails(id).then(result => {
        if (result.code === 200) {
          this.showResult = true;
          this.currentNid = result.data.noticeId;
          this.getDateForSearch(result.data.noticeId);
          for (let i in result.data) {
            this.resultForm[i] = result.data[i];
          }
          this.resultForm.proNo = result.data.project.proNo;
          this.resultForm.tradeType = result.data.project.tradeType;
          this.tLeave = this.resultForm.tradeType;
          return;
        }
        this.showResult = false;
      });
    },
    /** 成交结果公示Nid */
    getResultsInfoNId(id) {
      getResultDetailsByNid(id).then(result => {
        if (result.code === 200) {
          this.showResult = true;
          this.currentNid = result.data.noticeId;
          this.getDateForSearch(result.data.noticeId);
          for (let i in result.data) {
            this.resultForm[i] = result.data[i];
          }
          this.resultForm.proNo = result.data.project.proNo;
          this.resultForm.tradeType = result.data.project.tradeType;
          this.tLeave = this.resultForm.tradeType;
          return;
        }
        this.showResult = false;
      });
    },
    /** 查询公告相关日期 */
    getDateForSearch(noticeId) {
      if (
        !this.noticeForm.createTime ||
        !this.explanForm.createTime ||
        !this.resultForm.createTime
      ) {
        getFullTime(noticeId).then(result => {
          this.noticeForm.createTime = result.data.noticeTime || "";
          this.explanForm.createTime = result.data.explanationTime || "";
          this.resultForm.createTime = result.data.hitTime || "";
        });
      }
    }
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length <= 0) {
      this.$message({
        type: "error",
        //duration: 2000,
        center: true,
        message: "地址发生变化，回到上一页！"
      });
      this.routerLeave();
      return;
    }
    this.fLeave = query.fLeave;
    getDicts(this.config).then(res => {
      this.tradeOptions = res.data.trade_type;
      this.wayOptions = res.data.get_way;
      this.noticeOptions = res.data.notice_send_way;
      if (query.id) {
        this.tapChangeById(query.index, query.id);
      }
      if (query.noticeId) {
        this.tapChangeByNId(query.index, query.noticeId);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.transDetails {
  background-color: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 56px;
  .main-width {
    .details-title {
      min-height: 755px;
      height: auto;
      background-color: @white;
      padding: 29px 40px 25px;
      .details-tap {
        display: flex;
        justify-content: center;
        > div {
          width: 150px;
          height: 50px;
          font-size: 16px;
          text-align: center;
          border: 1px solid @border-less;
          padding: 9px 0;
          color: @grey;
          cursor: pointer;
          span {
            display: inline-block;
            padding-top: 6px;
            font-size: 12px;
          }
          &:nth-of-type(1) {
            border-right: none;
          }
          &:nth-of-type(2) {
            border-right: none;
          }
        }
        .active {
          background-color: @theme;
          color: @white;
        }
      }
      .details-table {
        margin-top: 30px;
        border-top: 1px solid @border-less;
        .details-buy {
          display: flex;
          justify-content: center;
          button {
            border: none;
            width: 120px;
            height: 50px;
            background: #cf6945;
            border-radius: 4px;
            font-size: 18px;
            color: @white;
            line-height: 50px;
            margin: 20px 0 25px;
            text-align: center;
            cursor: pointer;
          }
          .bid-doc {
            margin-left: 20px;
          }
        }
        > div {
          display: flex;
          line-height: 20px;
          border: 1px solid @border-less;
          border-top: none;
          &:nth-last-child(1) {
            border: none;
          }
        }
        .table-title {
          width: 363px;
          border-right: 1px solid @border-less;
          background-color: #fffbf7;
          color: @theme;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .table-cont {
          padding: 15px 56px;
          flex: 1;
        }
        .red {
          color: #f31212;
        }
      }
      .explan-table,
      .result-table {
        margin-top: 30px;
        .explan-title {
          padding-top: 20px;
          font-size: 16px;
          font-weight: bold;
          line-height: 50px;
          text-align: center;
        }
        .explan-item {
          display: flex;
          min-height: 50px;
          height: auto;
          line-height: 20px;
          border: 1px solid @border-less;
          border-bottom: none;
          &:nth-last-of-type(1) {
            border: 1px solid @border-less;
          }
        }
        .table-title {
          width: 363px;
          border-right: 1px solid @border-less;
          background-color: #fffbf7;
          color: @theme;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .table-cont {
          // text-indent: 56px;
          padding: 15px 56px;
          flex: 1;
        }
      }
    }
    .details-text {
      padding: 36px 40px;

      margin-top: 20px;
      // min-height: 500px;
      background: @white;
      .ql-editor {
        border: 1px solid @border-less;
      }
    }
  }
  /deep/.el-dialog__body {
    .el-form {
      color: @font;
      .el-form-item__content {
        padding-left: 18px;
      }
      .payColor {
        .el-form-item__content {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 550;
          color: #f21313;
        }
      }
      .payMethod {
        .el-form-item__content {
          display: flex;
          > label {
            width: 153px;
            height: 50px;
            border: 1px solid @border-less;
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            .icon {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              margin-left: 25px;
            }
            .el-radio {
              position: absolute;
              right: 14px;
              top: 50%;
              transform: translateY(-50%);
              .el-radio__label {
                padding: 0;
              }
              .is-checked {
                .el-radio__inner {
                  border-color: @theme;
                  background: @theme;
                }
              }
            }
          }
          .wPay {
            .icon {
              background: url("~@/assets/icon/yj_icon_wx.png") center center
                no-repeat;
            }
          }
          .aliPay {
            margin-left: 22px;
            .icon {
              width: 20px;
              height: 20px;
              background: url("~@/assets/icon/yj_icon_zfb.png") center center
                no-repeat;
            }
          }
        }
      }
      .action {
        display: flex;
        justify-content: center;
        padding-top: 8px;
        > div {
          width: 120px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          &:nth-of-type(1) {
            background: @theme;
            color: @white;
          }
          &:nth-of-type(2) {
            border: 1px solid #bbbbbb;
            color: @font;
            margin-left: 30px;
          }
        }
      }
    }
    .open {
      p {
        text-align: center;
        font-size: 16px;
        font-weight: 550;
        padding-bottom: 30px;
      }
      .action {
        display: flex;
        justify-content: center;
        padding-top: 8px;
        > div {
          width: 120px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          &:nth-of-type(1) {
            background: @theme;
            color: @white;
          }
          &:nth-of-type(2) {
            border: 1px solid #bbbbbb;
            color: @font;
            margin-left: 30px;
          }
        }
      }
    }
  }
}
</style>
