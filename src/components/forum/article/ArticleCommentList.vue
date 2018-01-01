<template>
<div class="article-comment-list-wrapper">
  <div class="comment-list-header">
    <span class="list-toolbar">
      <span class="comment-count">{{comments.length}}条评论</span>
      <el-button type="text" class="" @click="showDialog" v-if="isLogin">写评论</el-button>
    </span>
    <span class="header-line"></span>
  </div>
  <div class="comment-list-wrapper">
    <div class="comment-item-wrapper" v-for="(comment, index) in comments" :key="comment._id">
      <ArticleComment :comment="comment" :index="index"></ArticleComment>
    </div>
  </div>
</div>
</template>

<script>
import ArticleComment from '@/components/forum/article/ArticleComment'
import { mapGetters } from 'vuex'
export default {
  name: 'articleCommentList',
  components: {
    ArticleComment
  },
  props: ['comments'],
  computed: mapGetters({
    isLogin: 'status/isLogin'
  }),
  methods: {
    showDialog () {
      this.$store.dispatch('article/setIsCommentEditorDialogVisible', { isCommentEditorDialogVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-comment-list-wrapper {
  margin: 50px 0;
}
.comment-list-header {
  position: relative;
  margin-bottom: 20px;
}
.list-toolbar {
  position: relative;
  z-index: 2;
  background: #fff;
  padding-right: 15px;
  font-weight: 600;
}
.header-line {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  color: #f0f0f0;
  background: #f0f0f0;
  z-index: 1;
}
.comment-item-wrapper {
  margin-bottom: 30px;
}
</style>
