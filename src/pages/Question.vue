<template>
  <el-container class="container" v-loading="isLoading">
      <question-content-header></question-content-header>
      <question-content-main v-if="!isLoading"></question-content-main>
      <el-dialog title="评论" :visible.sync="isAnswerCommentVisible" custom-class="answer-comment-dialog" top="5vh">
        <answer-comment-dialog></answer-comment-dialog>
      </el-dialog>
  </el-container>
</template>

<script>
import QuestionContentHeader from '@/components/forum/question/ContentHeader'
import QuestionContentMain from '@/components/forum/question/ContentMain'
import AnswerCommentDialog from '@/components/forum/question/AnswerCommentDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'question',
  components: {
    QuestionContentHeader,
    QuestionContentMain,
    AnswerCommentDialog
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile',
      isLoading: 'question/isLoading',
      question: 'question/question'
    }),
    isAnswerCommentVisible: {
      get: function () {
        return this.$store.state.question.isAnswerCommentVisible
      },
      set: function (newValue) {
        this.$store.dispatch('question/setIsAnswerCommentVisible', { isAnswerCommentVisible: newValue })
      }
    }
  },
  async created () {
    this.$store.dispatch('question/setIsShowEditor', {isShowEditor: false})
    this.$store.dispatch('question/setSelectedAnswer', { selectedAnswer: {} })
    this.$store.dispatch('question/setIsAnswerCommentVisible', { isAnswerCommentVisible: false })
    await this.$store.dispatch('question/getQuestion', {questionId: this.$route.params.id, userId: this.profile && this.profile._id})
    if (!this.question) {
      this.$message.error({
        message: '找不到该页面',
        duration: 1500,
        showClose: true
      })
      this.$router.push('/forum')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 59px;
  display: flex;
  flex-direction: column;
}
</style>
