<template>
<div class="answer-comment-editor-wrapper" :class="{'editor-active': isShow}">
  <el-input class="comment-editor" type="textarea" resize="none" :autosize="inputSize" placeholder="请写下你的评论" v-model="comment" @focus="setButtonShow(true)" @blur="setButtonShow(false)"></el-input>
  <el-button class="submit-button" :class="{'submit-button-hide': !isShow}" type="primary" size="small" @click="submitComment()">评论</el-button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { postComment } from '@/store/api'
export default {
  name: 'questionAnswerCommentEditor',
  data () {
    return {
      isShow: false,
      inputSize: {
        minRows: 1
      },
      comment: ''
    }
  },
  computed: mapGetters({
    selectedAnswer: 'question/selectedAnswer'
  }),
  methods: {
    setButtonShow: function (val) {
      this.isShow = val
    },
    submitComment: async function () {
      const postBody = {
        content: {
          html: this.comment
        },
        answer: this.selectedAnswer._id
      }
      postComment(postBody)
        .then(body => {
          if (body.success) {
            this.comment = ''
            this.$store.dispatch('question/getQuestion', {questionId: this.$route.params.id, userId: this.profile && this.profile._id})
            this.$store.dispatch('question/getAnswerComments')
          } else {
            this.$message.error({
              message: body.message,
              duration: 1500,
              showClose: true
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error({
            message: JSON.stringify(err),
            duration: 1500,
            showClose: true
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-active {
  padding-right: 60px;
}
.submit-button-hide {
  opacity: 0;
}
.answer-comment-editor-wrapper {
  display: flex;
  transition: all 0.5s ease;

  .comment-editor {
    margin-right: 10px;
  }

  .submit-button {
    max-height: 33px;
    position: absolute;
    right: 16px;
    bottom: 11px;
  }
}
</style>

