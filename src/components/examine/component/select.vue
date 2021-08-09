<template>
  <el-select
    :value="valueTitle"
    popper-append-to-body
    :clearable="clearable"
    @clear="clearHandle"
    popper-class="industry-select"
    ref="multiSelect"
  >
    <el-option :value="valueTitle" :label="valueTitle">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "el-tree-select",
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          children: "children" // 子级字段名,
        };
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 初始值 */
    value: {
      type: Number,
      default: () => {
        return null;
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
      inOptions: []
    };
  },
  mounted() {
    this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
          this.props.label
        ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
        //根据默认值去遍历是否有remark
        this.searchForRemark();
      }
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach(ele => (ele.style.width = 0));
      });
    },
    searchForRemark() {
      //遍历行业类型字典
      this.handleRecursion(this.options);
      console.log(this.inOptions, "!!!!!!!");
      let array = this.inOptions.filter(item => {
        return item.dictValue == this.valueId;
      });
      console.log(array, "~~~~~");
    },
    /** 递归遍历 */
    handleRecursion(list) {
      list.forEach(item => {
        this.inOptions.push({
          dictValue: item.id,
          dictLabel: item.label,
          remark: item.remark
        });
        if (item.children) {
          this.handleRecursion(item.children);
        }
      });
    },
    // 切换选项
    handleNodeClick(node) {
      if (node.children && node.children.length > 0) return;
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", {
        id: this.valueId,
        title: this.valueTitle
      });
      this.$emit("getRemark", node.remark || false);
      this.defaultExpandedKey = [];
      this.$refs.multiSelect.blur();
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", {
        id: null,
        title: ""
      });
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach(element => element.classList.remove("is-current"));
    }
  },
  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    }
  }
};
</script>

<style scoped lang="less">
.el-scrollbar {
  /deep/.el-select-dropdown__wrap {
    margin: 0px;
    max-height: none;
    overflow: hidden;
  }
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li /deep/ .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree /deep/ .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree /deep/ .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
