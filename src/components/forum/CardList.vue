<template>
<div class="card-list-wrapper">
  <div class="question-list-wrapper" v-if="displayMode === 'question' && listLength > 0">
    <div class="question-wrapper" v-for="question in questions" :key="question._id">
      <question-card :question="question"></question-card>
    </div>
  </div>
  <div class="article-list-wrapper" v-if="displayMode === 'article' && articles.length > 0">
    <div class="article-wrapper" v-for="article in articles" :key="article._id">
      <article-card :article="article"></article-card>
    </div>
  </div>
  <div class="question-wrapper" v-if="listLength === 0">
    <el-card>
      <span style="text-align: center;">这里现在什么都没有。</span>
    </el-card>
  </div>
</div>
</template>

<script>
import QuestionCard from '@/components/forum/QuestionCard'
import ArticleCard from '@/components/forum/ArticleCard'
import { mapGetters } from 'vuex'
export default {
  name: 'cardList',
  components: {
    QuestionCard,
    ArticleCard
  },
  computed: {
    ...mapGetters({
      articles: 'forum/articles',
      questions: 'forum/questions',
      displayMode: 'forum/displayMode'
    }),
    listLength: function () {
      if (this.displayMode === 'question') {
        return this.questions.length
      } else {
        return this.articles.length
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
