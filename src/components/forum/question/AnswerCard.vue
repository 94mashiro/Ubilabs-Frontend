<template>
  <el-card class="card-wrapper">
    <header>
      <author-info :author="answer.author"></author-info>
    </header>
    <main>
      <div class="question-content-wrapper markdown-body" v-html="answer.content.html"></div>
    </main>
    <footer>
      <question-answer-toolbar :answer="answer"></question-answer-toolbar>
    </footer>
  </el-card>
</template>

<script>
import AuthorInfo from '../AuthorInfo'
import QuestionAnswerToolbar from './AnswerToolbar'
export default {
  name: 'questionAnswerCard',
  components: {
    AuthorInfo,
    QuestionAnswerToolbar
  },
  props: ['answer']
}
</script>

<style lang="scss" scoped>
.question-content-wrapper {
  margin: 10px 0;
}
</style>
