<template>
<div class="answer-comment-wrapper">
  <div class="answer-comment-header">
    <author-info :mini="true" :avatarSize="20" :author="comment.author"></author-info>
  </div>
  <div class="answer-comment-main" v-html="comment.content.html"></div>
  <div class="answer-comment-footer">
    <div class="answer-comment-toolbar">
      <button class="button-plain answer-toolbar-item" @click="replyComment()" v-if="isLogin"><span><icon class="icon" name="reply" :scale="1.6"></icon>回复</span></button>
    </div>
  </div>
</div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'questionAnswerComment',
  components: {
    AuthorInfo
  },
  computed: mapGetters({
    isLogin: 'status/isLogin'
  }),
  props: ['comment'],
  methods: {
    replyComment () {
      const textareaNode = $('.el-textarea__inner')
      const inputText = textareaNode.val()
      const userText = `@${this.comment.author.name} ${inputText}`
      textareaNode.val(userText)
      textareaNode.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: text-bottom;
  margin-right: 3px;
}
.button-plain {
  border: 0;
  padding: 0;
  color: #8590a6;
  background: #fff;
  span {
    font-size: 15px;
    font-weight: 600;
  }
  &:active, &:focus {
    outline: none;
  }
  &:hover {
    color: #666;
  }
}
.answer-comment-main {
  line-height: 20px;
  margin-bottom: 5px;
}
.answer-comment-footer {
  margin-bottom: 5px;
}
</style>

