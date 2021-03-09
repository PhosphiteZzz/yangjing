import _ from "lodash";
const directives = {
  /**
   * 点击节流
   * 节流
   */
  throttle: {
    bind(el, binding, vnode) {
      const that = vnode.context;
      if (!that[binding.arg].isBind) {
        that[binding.arg] = _.debounce(that[binding.arg], 500);
        that[binding.arg].isBind = true;
      }
      el.addEventListener("click", function T(event) {
        that[binding.arg](binding.value);
      });
    }
  },
  /**
   * 点击防抖
   * 防抖
   */
  debounce: {
    bind(el, binding, vnode) {
      const that = vnode.context;
      if (!that[binding.arg].isBind) {
        that[binding.arg] = _.throttle(that[binding.arg], 500);
        that[binding.arg].isBind = true;
      }
      el.addEventListener("click", function T(event) {
        that[binding.arg](binding.value);
      });
    }
  },
  /**
   * 空白处点击隐藏
   */
  blank: {
    bind(el, binding, vnode) {
      function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false;
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e);
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener("click", documentHandler);
    }
  }
};
export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
