<template>
  <div class="answer-comment-list-wrapper">
    <div class="answer-comment-item" v-for="comment in comments" :key="comment._id" v-if="comments.length > 0">
      <answer-comment :comment="comment"></answer-comment>
    </div>
    <div class="no-comment" v-if="comments.length === 0">
      <h1>暂时还没有评论……</h1>
    </div>
  </div>
</template>

<script>
import AnswerComment from './AnswerComment'
import { mapGetters } from 'vuex'
export default {
  name: 'questionAnswerCommentList',
  components: {
    AnswerComment
  },
  computed: mapGetters({
    comments: 'question/answerComments'
  })
}
</script>

<style lang="scss" scoped>
.answer-comment-item {
  margin-bottom: 8px;
}
.no-comment {
  margin-bottom: 8px;

  h1 {
    font-size: 14px;
    text-align: center;
  }
}
.answer-comment-item:not(:last-child) {
    border-bottom: 1px solid #e3e6ee;
}
</style>
