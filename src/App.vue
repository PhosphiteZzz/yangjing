<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {},
  methods: {}
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  // overflow-x:hidden
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #ffffff inset !important;
  -webkit-background-clip: text;
}
</style>
