<template>
  <el-container class="container">
    <el-container>
      <el-main>
        <toolbar></toolbar>
        <article-card-list v-if="displayMode === 'article'" v-loading="isLoadingList" element-loading-background="#ffffff"></article-card-list>
        <question-card-list v-if="displayMode === 'question'" v-loading="isLoadingList" element-loading-background="#ffffff"></question-card-list>
      </el-main>
    </el-container>
    <el-aside width="280px">
      <el-main>
        <profile-card v-if="isLogin"></profile-card>
        <rss-card v-if="isLogin"></rss-card>
        <intro-card v-if="!isLogin"></intro-card>
        <node-chooser v-if="displayMode==='question'"></node-chooser>
      </el-main>
    </el-aside>
  </el-container>
</template>

<script>
import Toolbar from '@/components/forum/Toolbar'
import QuestionCardList from '@/components/forum/QuestionCardList'
import ArticleCardList from '@/components/forum/ArticleCardList'
import NodeChooser from '@/components/forum/NodeChooser'
import ProfileCard from '@/components/ProfileCard'
import IntroCard from '@/components/IntroCard'
import RssCard from '@/components/RssCard'
import { mapGetters } from 'vuex'
export default {
  name: 'forum',
  components: {
    Toolbar,
    ArticleCardList,
    QuestionCardList,
    NodeChooser,
    ProfileCard,
    IntroCard,
    RssCard
  },
  computed: mapGetters({
    isLogin: 'status/isLogin',
    displayMode: 'forum/displayMode',
    questions: 'forum/questions',
    articles: 'forum/articles',
    isLoadingList: 'forum/isLoadingList'
  }),
  created () {
    this.$store.dispatch('forum/setDisplayMode', { displayMode: 'question' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 75px auto;
}
</style>

