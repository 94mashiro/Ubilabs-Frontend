<template>
<el-card header="相似问题" v-loading="isLoading">
  <div class="similar-question-list-wrapper">
    <ul v-if="similarQuestions.length > 0">
      <li v-for="i in similarQuestions" :key="i.id">
        <a :href="i.url" class="question-link" v-if="question">{{i.title}}</a>
      </li>
    </ul>
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
      question: 'question/question',
      questions: 'forum/questions'
    })
  },
  data () {
    return {
      isLoading: false,
      similarQuestions: []
    }
  },
  async created () {
    if (this.similarQuestions.length === 0 && this.question.node) {
      this.isLoading = true
      await this.$store.dispatch('forum/getQuestions', { nodeId: this.question.node._id, page: 1 })
      this.similarQuestions = this.questions.results.filter(question => {
        return question._id !== this.question._id
      })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.similar-question-list-wrapper {
  display: flex;
  flex-direction: column;
  padding-left: 15px;

  ul {
    list-style-type: disc;
  }

  li {
    margin-bottom: 8px;

    .question-link {
      text-decoration: none;
      color: #000;
      font-size: 14px;
      line-height: 1.2;
    }
  }
}
</style>
