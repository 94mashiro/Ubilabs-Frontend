<template>
  <div class="comment-dialog-wrapper">
    <div class="comment-list">
      <answer-comment-list></answer-comment-list>
    </div>
    <div class="comment-footer">
      <answer-comment-editor v-if="isLogin"></answer-comment-editor>
    </div>
  </div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import AnswerCommentList from '@/components/forum/question/AnswerCommentList'
import AnswerCommentEditor from '@/components/forum/question/AnswerCommentEditor'
import { mapGetters } from 'vuex'
export default {
  name: 'questionAnswerCommentDialog',
  components: {
    AuthorInfo,
    AnswerCommentList,
    AnswerCommentEditor
  },
  computed: mapGetters({
    isLogin: 'status/isLogin'
  })
}
</script>

<style lang="scss" scoped>
.comment-dialog-wrapper {
  display: flex;
  flex-direction: column;
  .comment-list {
    flex: 1;
  }
}
</style>
