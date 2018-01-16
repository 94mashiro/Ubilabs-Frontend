<template>
<div class="article-list-wrapper">
  <div class="article-wrapper" v-for="article in articles.results" :key="article._id">
    <article-card :article="article"></article-card>
  </div>
  <el-card v-if="!articles.total" style="margin-bottom: 10px">
    无数据
  </el-card>
  <el-card :body-style="{padding: 0}">
    <el-pagination layout="prev, pager, next" :total="articles.total" @current-change="changePage"></el-pagination>
  </el-card>
</div>
</template>

<script>
import QuestionCard from '@/components/forum/QuestionCard'
import ArticleCard from '@/components/forum/ArticleCard'
import { mapGetters } from 'vuex'
export default {
  name: 'articleCardList',
  components: {
    QuestionCard,
    ArticleCard
  },
  computed: {
    ...mapGetters({
      articles: 'forum/articles'
    })
  },
  methods: {
    changePage: function (page) {
      this.$store.dispatch('forum/getArticles', { page })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  margin-bottom: 10px;
}
</style>
