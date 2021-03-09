<template>
  <div class="cont-step">
    <div :class="['prev', { prevActive: index >= 0 }]">
      <span class="icon">1</span>
      <div class="text" v-text="text[0]"></div>
    </div>
    <div :class="['center', { centerActive: index >= 1 }]">
      <span class="icon">2</span>
      <div class="text" v-text="text[1]"></div>
    </div>
    <div :class="['next', { nextActive: index >= 2 }]">
      <span class="icon">3</span>
      <div class="text" v-text="text[2]"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    //步骤几
    index: {
      type: Number,
      default: 0,
    },
    text: {
      type: Array,
      default: () => ["安全认证", "修改密码", "修改完成"],
    },
  },
};
</script>
<style lang="less" scoped>
.cont-step {
  width: 100%;
  display: flex;
  justify-content: center;
  > div {
    width: 327px;
    height: 54px;
    display: flex;
    align-items: center;
    padding-left: 56px;
    .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      font-size: 18px;
      color: @border;
      text-align: center;
      line-height: 32px;
      background: @white;
      border-radius: 50%;
    }
    .text {
      text-indent: 20px;
      font-size: 18px;
      color: @white;
    }
  }
  .prev {
    padding-left: 26px;
    background: url("~@/assets/icon/prev.png") center center no-repeat;
  }
  .prevActive {
    background: url("~@/assets/icon/prev_active.png") center center no-repeat;
    .icon {
      color: @theme;
    }
  }
  .center {
    margin-left: -23px;
    background: url("~@/assets/icon/center.png") center center no-repeat;
  }
  .centerActive {
    background: url("~@/assets/icon/center_active.png") center center no-repeat;
    .icon {
      color: @theme;
    }
  }
  .next {
    margin-left: -23px;
    background: url("~@/assets/icon/next.png") center center no-repeat;
  }
  .nextActive {
    background: url("~@/assets/icon/next_active.png") center center no-repeat;
    .icon {
      color: @theme;
    }
  }
}
</style>