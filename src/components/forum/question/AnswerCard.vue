<template>
  <el-card class="card-wrapper">
    <header>
      <author-info :author="answer.author"></author-info>
      <!-- <div class="author-info">
        <avatar :src="answer.author.avatar" :username="answer.author.name" :size="30"></avatar>
        <span>{{answer.author.name}}</span>
      </div> -->
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
import Avatar from 'vue-avatar'
import AuthorInfo from '@/components/forum/AuthorInfo'
import QuestionAnswerToolbar from './AnswerToolbar'
export default {
  name: 'questionAnswerCard',
  components: {
    Avatar,
    QuestionAnswerToolbar,
    AuthorInfo
  },
  data () {
    return {
      author: {}
    }
  },
  props: ['answer']
}
</script>

<style lang="scss" scoped>
.question-content-wrapper {
  margin: 10px 0;
}
.author-info {
  display: flex;
  span {
    line-height: 2;
    margin-left: 10px;
  }
}
</style>
