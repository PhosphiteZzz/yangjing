<template>
  <div class="calendar">
    <div class="list-top">
      <div class="list-top-title">项目日历</div>
      <span v-show="!leave" @click="returnCalc">返回日历</span>
    </div>
    <div class="list-calendar" v-show="leave">
      <el-calendar v-model="value" v-if="showCal">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="box" @click.stop="enterDetails(date)">
            <div class="box-title">
              <span>{{ data.day.split("-")[2] }}</span>
            </div>
            <p class="list-calendar-number">
              {{ formatter(utils.formatDateAll(date)) }}
            </p>
          </div>
        </template>
      </el-calendar>
    </div>
    <div v-show="!leave" class="list-table">
      <div class="date" v-text="currentDate"></div>
      <div class="table" v-if="currentList.length > 0">
        <div class="header">
          <p>日期</p>
          <p>项目名称</p>
          <p>项目类型</p>
        </div>
        <div class="item" v-for="item in currentList" :key="item.id">
          <p v-text="item.sendEndTime" :title="item.sendEndTime"></p>
          <p v-text="item.proName" :title="item.proName"></p>
          <p
            v-text="typeFormat(item.tradeType)"
            :title="typeFormat(item.tradeType)"
          ></p>
        </div>
      </div>
      <no-agenda v-else></no-agenda>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/utils.js";
import { getDicts } from "@/api/index.js";
import { getDateOfMonth, getScheduleByDay } from "@/api/index.js";
import noAgenda from "./noAgenda.vue";
export default {
  components: { noAgenda },
  data() {
    return {
      value: new Date(),
      type: "trade_type",
      utils: utils,
      result: null,
      showCal: false,
      leave: true,
      currentDate: null,
      currentQuery: null,
      currentList: [],
      tradeOptions: []
    };
  },
  watch: {
    result: {
      handler(value) {
        if (value !== null) {
          this.showCal = true;
        }
      },
      deep: true
    },
    value: {
      handler(value) {
        this.getSchedule(utils.formatDateAll(value));
      }
    }
  },
  methods: {
    formatter(date) {
      return this.result[date];
    },
    // 字典翻译
    typeFormat(type) {
      return this.selectDictLabel(this.tradeOptions, type);
    },
    /** 进入详情 */
    enterDetails(time) {
      this.currentQuery = utils.formatDateAll(time);
      this.currentDate = utils.formatDateStr(time);
      getScheduleByDay(this.currentQuery).then(result => {
        this.currentList = result.rows;
      });
      this.leave = false;
    },
    /** 返回日历 */
    returnCalc() {
      this.leave = true;
    },
    /** 获取某月的有任务的日期 */
    getSchedule(time) {
      getDateOfMonth(time).then(result => {
        this.result = new Object();
        result.data.forEach(item => {
          this.result[item.date] = item.num;
        });
      });
    }
  },
  created() {
    this.getSchedule(utils.formatDate());
    getDicts(this.type).then(result => {
      this.tradeOptions = result.data;
    });
  }
};
</script>
<style lang="less" scoped>
.calendar {
  width: 100%;
  // height: 880px;
  min-height: 600px;
  background-color: @white;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  .list-top {
    span {
      display: inline-block;
      width: 99px;
      height: 34px;
      border: 1px solid @border;
      border-radius: 4px;
      background: url("~@/assets/icon/yj_icon_fh.png") 12px center no-repeat;
      background-size: 7px 14px;
      font-size: 14px;
      line-height: 34px;
      text-indent: 28px;
      color: #666666;
      cursor: pointer;
    }
  }
  .list-calendar {
    height: calc(~"100% - 72px");
    /deep/.el-calendar__header {
      .el-button {
        &:hover {
          color: @theme;
          border-color: @theme;
          background-color: transparent;
        }
        &:focus {
          color: @white;
          border-color: @theme;
          background-color: @theme;
        }
      }
    }
    /deep/.el-calendar__body {
      .el-calendar-table {
        td {
          position: relative;
          // border: none;
          .el-calendar-day {
            height: 110px;
            padding: 0;
            box-sizing: border-box;
            background: url("~@/assets/icon/yj_icon_xm.png") center center
              no-repeat;
            > div {
              height: 100%;
            }
            .box-title {
              display: inline-block;
              width: 100%;
              height: 22px;
              line-height: 22px;
              text-indent: 10px;
              color: @theme;
              background: #f4f4f4;
              span {
                position: absolute;
                left: 0;
                top: 0;
              }
            }
            &:hover {
              border: 1px solid @theme;
              .box-title {
                height: 21px;
              }
            }
          }
        }
        .is-selected {
          .el-calendar-day {
            background: url("~@/assets/icon/yj_icon_xm_hover.png") center center
              no-repeat;
            .list-calendar-number {
              color: @theme;
            }
          }
        }
        .prev,
        .next {
          .el-calendar-day {
            visibility: hidden;
          }
        }
      }
    }
    &-number {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      // width: 100%;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      text-align: center;
      line-height: 23px;
    }
  }
  .list-table {
    flex: 1;
    display: flex;
    flex-direction: column;
    .date {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: @theme;
      padding-top: 10px;
    }
    .table {
      margin-top: 20px;
      border: 1px solid @border-less;
      .header,
      .item {
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #fffbf7;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid @border-less;
        color: @theme;
        p {
          text-align: center;
          border-right: 1px solid @border-less;
          &:nth-of-type(1) {
            width: 160px;
          }
          &:nth-of-type(2) {
            flex: 1;
          }
          &:nth-of-type(3) {
            width: 99px;
          }
          &:nth-of-type(4) {
            width: 274px;
            border: none;
          }
        }
      }
      .item {
        height: 49px;
        line-height: 49px;
        background: transparent;
        color: @font;
        font-weight: initial;
        &:nth-last-of-type(1) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
