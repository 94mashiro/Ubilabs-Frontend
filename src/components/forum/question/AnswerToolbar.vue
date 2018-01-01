<template>
<div class="answer-toolbar">
  <button class="button-plain answer-toolbar-item" @click="showAnswerCommentDialog()"><span><icon class="icon" name="star" :scale="2"></icon>{{commentText}}</span></button>
  <button v-if="profile && answer.author._id === profile._id" class="button-plain answer-toolbar-item" @click="modifyAnswer()"><span><icon class="icon" name="reply" :scale="1.7"></icon>修改回答</span></button>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'questionAnswerToolbar',
  computed: {
    ...mapGetters({
      profile: 'user/profile'
    }),
    commentText: function () {
      return this.answer.comments === 0 ? `添加评论` : `${this.answer.comments}条评论`
    }
  },
  props: ['answer'],
  methods: {
    modifyAnswer () {
      this.$store.dispatch('question/setSelectedAnswer', { selectedAnswer: this.answer })
      this.$store.dispatch('question/setIsShowEditor', { isShowEditor: true })
    },
    async showAnswerCommentDialog () {
      await this.$store.dispatch('question/setSelectedAnswer', { selectedAnswer: this.answer })
      await this.$store.dispatch('question/getAnswerComments')
      this.$store.dispatch('question/setIsAnswerCommentVisible', { isAnswerCommentVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-toolbar {
  display: flex;

  .answer-toolbar-item {
    margin-right: 20px;
  }

  .icon {
    margin-right: 3px;
    vertical-align: text-bottom;
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
}
</style>
