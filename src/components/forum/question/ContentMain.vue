<template>
  <el-container class="question-content-main">
    <el-container>
      <el-main>
        <question-answer-editor v-if="profile && isShowEditor"></question-answer-editor>
        <question-answer-list></question-answer-list>
      </el-main>
    </el-container>
    <el-aside width="300px">
      <el-main>
        <similar-question-list></similar-question-list>
      </el-main>
    </el-aside>
  </el-container>
</template>

<script>
import QuestionAnswerList from '@/components/forum/question/AnswerList'
import QuestionAnswerEditor from '@/components/forum/question/AnswerEditor'
import SimilarQuestionList from '@/components/forum/question/SimilarQuestionList'
import { mapGetters } from 'vuex'
export default {
  name: 'questionContentMain',
  components: {
    QuestionAnswerList,
    QuestionAnswerEditor,
    SimilarQuestionList
  },
  computed: mapGetters({
    profile: 'user/profile',
    isShowEditor: 'question/isShowEditor'
  })
}
</script>

<style lang="scss" scoped>
.question-content-main {
  width: 1000px;
  margin: 0 auto;
}
</style>
