<template>
<div class="comment-editor-dialog-wrapper">
  <markdown-editor :configs="configs" v-model="postBody.content.md"></markdown-editor>
  <el-button type="primary" class="comment-btn" @click="submitForm">评论</el-button>
</div>
</template>

<script>
import { markdownEditorConfigs } from '@/utils/config'
import { postComment } from '@/store/api'
export default {
  name: 'articleCommentEditorDialog',
  data () {
    return {
      configs: {},
      postBody: {
        article: this.$route.params.id,
        content: {
          md: ''
        }
      }
    }
  },
  methods: {
    submitForm () {
      postComment(this.postBody)
        .then(body => {
          if (body.success) {
            this.$message.success({
              message: '评论成功',
              duration: 1500,
              showClose: true
            })
            this.$store.dispatch('article/getArticle', { articleId: this.$route.params.id })
            this.postBody.content.md = ''
          } else {
            this.$message.error({
              message: `评论失败: ${body.message}`,
              duration: 1500,
              showClose: true
            })
          }
        })
    }
  },
  created () {
    this.configs = markdownEditorConfigs
  }
}
</script>

<style lang="scss" scoped>
.comment-btn {
  margin-top: 20px;
}
</style>

