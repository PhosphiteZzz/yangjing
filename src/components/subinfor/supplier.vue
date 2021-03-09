<template>
  <div class="supplier">
    <div class="list-top">
      <div class="list-top-title">供应商</div>
      <div class="list-top-search">
        <el-input
          v-model.trim="page.nickName"
          placeholder="请输入关键字"
          :maxlength="50"
        ></el-input>
        <span class="icon" @click="handleSearch"></span>
      </div>
    </div>
    <div class="list-bot" v-if="mainList.length > 0">
      <div class="list-bot-title">
        <span class="index">序号</span>
        <span class="title">单位名称</span>
        <span class="code">社会统一信用代码</span>
      </div>
      <div class="list-bot-list">
        <div
          class="content-item"
          v-for="(item, index) in mainList"
          :key="index"
        >
          <div class="index" v-text="index + 1"></div>
          <div
            class="title"
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
      <div class="list-bot-foot">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page.pageNum"
          :page-size="page.pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div v-else class="list-bot">
      <no-result></no-result>
    </div>
  </div>
</template>
<script>
import { getMainInfo } from "@/api/index.js";

export default {
  data() {
    return {
      total: 0,
      mainList: [],
      page: {
        nickName: "",
        pageNum: 1,
        pageSize: 7
      }
    };
  },
  methods: {
    /** 查询 */
    handleSearch() {
      this.searchAction();
    },
    /** 查询方法 */
    searchAction() {
      //主体信息
      getMainInfo(this.page).then(result => {
        this.mainList = result.rows;
        this.total = result.total;
      });
    },
    handleCurrentChange(page) {
      this.page.pageNum = page;
      this.searchAction();
    }
  },
  created() {
    this.searchAction();
  }
};
</script>
<style lang="less" scoped>
.supplier {
  height: 100%;
  padding: 0 24px 0 14px;
  background: @white;
  .list-bot {
    background: @white;
    .list-bot-title {
      display: flex;
      text-align: center;
      justify-content: space-between;
      .index {
        width: 72px;
        text-align: center;
      }
      .title {
        flex: 1;
      }
      .code {
        width: 150px;
      }
    }
    .list-bot-list {
      padding: 0 28px 0 10px;
      .content-item {
        display: flex;
        text-align: center;
        justify-content: space-between;
        cursor: text;
        .index {
          width: 72px;
          text-align: center;
        }
        .title {
          flex: 1;
          max-width: 621px;
          .overflow();
        }
        .code {
          width: 150px;
          .overflow();
        }
      }
    }
  }
}
</style>
