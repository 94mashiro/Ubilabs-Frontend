<template>
  <el-container v-if="!isLoading" id="app" :class="{'article-style': isArticleStyle}">
    <el-header class="header sticky">
      <Navigation></Navigation>
    </el-header>
    <el-main class="container">
      <router-view/>
    </el-main>
    <el-footer class="footer" height="40px">
      <h2>Powered By Keystone & Vue.js With Love</h2>
    </el-footer>
  </el-container>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    Navigation
  },
  created () {
    this.$store.dispatch('user/getUserProfile')
  },
  computed: mapGetters({
    isLoading: 'status/isLoading',
    isArticleStyle: 'status/isArticleStyle'
  })
}
</script>

<style lang="scss">
@import './assets/reset.css';
@import './assets/custom.scss';
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css/github-markdown.css';
body {
  overflow: auto;
}
#app {
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #f3f3f3;
  margin: 0 auto;
  display: flex;
}

.article-style {
  background-color: #fff !important;
}

.container {
  padding: 0px;
  flex: 1;
}

.header {
  height: 61px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
  position: relative;
  width: 100%;
}

.sticky {
  position: fixed;
  z-index: 1600;
}

.footer {
  height: 40px;
  width: 100%;
  border-top: 1px solid #eee;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    text-align: center;
    color: #aaaaaa;
    font-size: 12px;
  }
}
</style>
