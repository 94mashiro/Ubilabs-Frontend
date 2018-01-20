<template>
<div class="article-header-wrapper">
  <div class="article-title-image" v-if="article.imageUrl">
    <img :src="article.imageUrl">
  </div>
  <h1 class="article-title">{{article.title}}</h1>

  <div class="article-header">
    <div class="article-header-meta">
      <author-info :author="article.author" :mini="true" :avatarSize="22" class="article-header-author"></author-info>
      <span>发布于 {{createDate}}</span>
    </div>
    <div>
      <el-button type="primary" size="mini" @click="navToEditor">编辑文章</el-button>
    </div>
  </div>
</div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import moment from 'moment'
export default {
  name: 'articleHeader',
  components: {
    AuthorInfo
  },
  props: ['article'],
  computed: {
    createDate: function () {
      moment.locale('zh-cn')
      return moment(this.article.createdAt).startOf('day').fromNow()
    }
  },
  methods: {
    navToEditor: async function () {
      await this.$store.dispatch('article/setSelectedArticle', { selectedArticle: this.article })
      this.$router.push('/forum/editor')
    }
  }
}
</script>

<style lang="scss" scoped>
.article-header-wrapper {
  margin-top: 100px;
  overflow-y: hidden;
  .article-title {
    font-size: 36px;
    line-height: 1.3;
    font-weight: 600;
  }
  .article-header-author {
    margin-top: 5px;
  }
  .article-header {
    display: flex;
    justify-content: space-between;

    .article-header-meta {
      font-size: 14px;
      display: flex;

      span {
        margin: 9px 0 0 5px;
      }
    }
  }

}

</style>
