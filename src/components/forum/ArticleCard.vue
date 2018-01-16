<template>
  <el-card :body-style="{padding: '15px 20px'}">
    <div class="article-card-wrapper">
      <div class="article-title">
        <router-link :to="url" class="article-navigation-link">{{article.title}}</router-link>
      </div>
      <div class="article-author-info">
        <author-info :author="article.author" :mini="true" :avatarSize="20"></author-info>
      </div>
    </div>
  </el-card>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
export default {
  name: 'articleCard',
  props: ['article'],
  components: {
    AuthorInfo
  },
  computed: {
    url: function () {
      return `/forum/article/${this.article._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.article-card-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.article-navigation-link {
  color: #000;
  text-decoration: none;
  vertical-align: bottom;
  line-height: 1.4;
}
</style>
