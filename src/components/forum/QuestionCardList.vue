<template>
<div class="question-list-wrapper">
  <div class="question-wrapper" v-for="question in questions.results" :key="question._id">
    <question-card :question="question"></question-card>
  </div>
  <el-card v-if="!questions.total" style="margin-bottom: 10px">
    无数据
  </el-card>
  <el-card :body-style="{padding: 0}">
    <el-pagination layout="prev, pager, next" :total="questions.total" :page-size="5" @current-change="changePage"></el-pagination>
  </el-card>
</div>
</template>

<script>
import QuestionCard from '@/components/forum/QuestionCard'
import { mapGetters } from 'vuex'
export default {
  name: 'questionCardList',
  components: {
    QuestionCard
  },
  computed: {
    ...mapGetters({
      questions: 'forum/questions',
      displayNode: 'forum/displayNode'
    })
  },
  methods: {
    changePage: function (page) {
      this.$store.dispatch('forum/getQuestions', { nodeId: this.displayNode, page })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
