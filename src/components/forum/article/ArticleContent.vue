<template>
<div class="article-content-wrapper">
  <div class="markdown-body" v-html="article.content.html"></div>
</div>
</template>

<script>
export default {
  name: 'articleContent',
  props: ['article']
}
</script>

<style lang="scss" scoped>
.article-content-wrapper {
  margin: 24px 0 30px;
}
</style>
