<template>
<el-card class="card-wrapper">
  <header>
    <question-card-info :question="question"></question-card-info>
  </header>
  <main>
    <question-card-content :question="question"></question-card-content>
  </main>
</el-card>
</template>

<script>
import QuestionCardInfo from '@/components/forum/QuestionCardInfo'
import QuestionCardContent from '@/components/forum/QuestionCardContent'
export default {
  name: 'forumCard',
  components: {
    QuestionCardInfo,
    QuestionCardContent
  },
  props: ['question']
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  margin-bottom: 10px;
}
</style>

