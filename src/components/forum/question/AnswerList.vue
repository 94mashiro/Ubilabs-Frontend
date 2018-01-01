<template>
<div class="answer-list">
  <div class="answer-card-wrapper" v-for="answer in answers" :key="answer.id" v-if="answers.length !== 0">
    <question-answer-card :answer="answer"></question-answer-card>
  </div>
  <div class="answer-card-wrapper" v-if="answers.length === 0">
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
    answers: 'question/answers'
  })
}
</script>

<style lang="scss" scoped>

</style>

