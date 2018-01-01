<template>
<el-card header="相似问题" v-loading="isLoading">
  <div class="similar-question-list-wrapper">
    <div class="similar-question-wrapper" v-for="i in similarQuestions" :key="i.id" v-if="similarQuestions.length > 0">
      <a :href="i.url" class="question-link" v-if="question">{{i.title}}</a>
    </div>
    <div class="no-question" v-if="similarQuestions.length === 0">
      暂时还没有相似问题
    </div>
  </div>
</el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'similarQuestionList',
  computed: {
    ...mapGetters({
      question: 'question/question'
    }),
    similarQuestions: function () {
      return this.$store.state.forum.questions.filter(question => {
        return question._id !== this.question._id
      })
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  async created () {
    if (this.similarQuestions.length === 0 && this.question.node) {
      this.isLoading = true
      await this.$store.dispatch('forum/getQuestions', { nodeId: this.question.node._id })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.similar-question-list-wrapper {
  display: flex;
  flex-direction: column;

  .similar-question-wrapper {
    margin-bottom: 5px;

    .question-link {
      text-decoration: none;
      color: #000;
      font-size: 14px;
    }
  }
}
</style>
