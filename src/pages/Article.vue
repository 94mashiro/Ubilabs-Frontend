<template>
<div class="article-wrapper" v-loading="isLoading">
<article-header :article="article" v-if="!isLoading"></article-header>
<article-content :article="article" v-if="!isLoading"></article-content>
<article-comment-list :comments="comments" v-if="!isLoading"></article-comment-list>
<el-dialog title="写评论" :visible.sync="isCommentEditorDialogVisible" top="5vh">
  <article-comment-editor-dialog></article-comment-editor-dialog>
</el-dialog>
</div>
</template>

<script>
import ArticleHeader from '@/components/forum/article/ArticleHeader'
import ArticleContent from '@/components/forum/article/ArticleContent'
import ArticleCommentList from '@/components/forum/article/ArticleCommentList'
import ArticleCommentEditorDialog from '@/components/forum/article/ArticleCommentEditorDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'article',
  components: {
    ArticleHeader,
    ArticleContent,
    ArticleCommentList,
    ArticleCommentEditorDialog
  },
  computed: {
    ...mapGetters({
      isLoading: 'article/isLoading',
      article: 'article/article',
      comments: 'article/comments'
    }),
    isCommentEditorDialogVisible: {
      get: function () {
        return this.$store.state.article.isCommentEditorDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('article/setIsCommentEditorDialogVisible', { isCommentEditorDialogVisible: newValue })
      }
    }
  },
  created () {
    this.$store.dispatch('article/getArticle', { articleId: this.$route.params.id })
  }
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  min-height: 100vh;
  width: 660px;
  margin: 61px auto 0;
  background: #fff;
}
</style>
