<template>
<div>
  <div class="article-comment-meta">
    <author-info :author="comment.author"></author-info>
    <span class="comment-index">{{this.commentIndex}}</span>
  </div>
  <div class="article-comment-content markdown-body" v-html="comment.content.html">
  </div>
</div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
export default {
  name: 'articleComment',
  props: ['comment', 'index'],
  components: {
    AuthorInfo
  },
  computed: {
    commentIndex: function () {
      return `#${this.index + 1}`
    }
  }
}
</script>

<style lang="scss" scoped>
.article-comment-meta {
  display: flex;
  justify-content: space-between;

  .comment-index {
    line-height: 1.5;
    font-weight: 600;
  }
}
.article-comment-content {
  font-size: 16px;
  margin-top: 10px;
}
</style>
