<template>
<div class="answer-list">
  <div class="answer-card-wrapper" v-for="answer in question.answer" :key="answer.id" v-if="question.answer && question.answer.length !== 0">
    <question-answer-card :answer="answer"></question-answer-card>
  </div>
  <div class="answer-card-wrapper" v-if="question.answer && question.answer.length === 0">
    <el-card>
      目前还没有任何回答。
    </el-card>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import QuestionAnswerCard from './AnswerCard'
export default {
  name: 'questionAnswerList',
  components: {
    QuestionAnswerCard
  },
  computed: mapGetters({
    question: 'question/question'
  })
}
</script>

<style lang="scss" scoped>

</style>

