<template>
<div class="rss-card-wrapper">
  <el-card header="好友动态">
    <div class="loading-wrapper" v-loading="isLoadingRss">
      <div class="rss-list-wrapper" v-if="rssList.length">
        <div class="list-item" v-for="rss in rssList" :key="rss._id">
          <span v-if="rss.rssType==='comment'">
            <router-link :to="getProfileLink(rss.author)">{{rss.author.name}}</router-link>  评论了  <router-link :to="getArticleLink(rss.article)">{{rss.article.title}}</router-link>
          </span>
          <span v-if="rss.rssType==='answer'">
            <router-link :to="getProfileLink(rss.author)">{{rss.author.name}}</router-link>  回答了  <router-link :to="getQuestionLink(rss.question)">{{rss.question.title}}</router-link>
          </span>
          <span v-if="rss.rssType==='project'">
            <router-link :to="getProfileLink(rss.leader)">{{rss.leader.name}}</router-link>  创建了项目  <router-link :to="getProjectLink(rss)">{{rss.title}}</router-link>
          </span>
          <span v-if="rss.rssType==='activity'">
            <router-link :to="getProfileLink(rss.author)">{{rss.author.name}}</router-link>  创建了活动  <router-link :to="getActivityLink(rss)">{{rss.title}}</router-link>
          </span>
          <span v-if="rss.rssType==='article'">
            <router-link :to="getProfileLink(rss.author)">{{rss.author.name}}</router-link>  发表文章  <router-link :to="getArticleLink(rss)">{{rss.title}}</router-link>
          </span>
          <span v-if="rss.rssType==='question'">
            <router-link :to="getProfileLink(rss.author)">{{rss.author.name}}</router-link>  提出问题  <router-link :to="getQuestionLink(rss)">{{rss.title}}</router-link>
          </span>
        </div>
      </div>
      <div class="no-rss-wrapper" v-if="!rssList.length">
        <span class="no-rss">
          暂无动态
        </span>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'rssCard',
  computed: mapGetters({
    rssList: 'follow/rss',
    isLoadingRss: 'follow/isLoadingRss'
  }),
  methods: {
    getProfileLink: function (user) {
      return `/profile/${user._id}`
    },
    getArticleLink: function (article) {
      return `/forum/article/${article._id}`
    },
    getProjectLink: function (project) {
      return `/project/${project._id}`
    },
    getActivityLink: function (activity) {
      return `/activity/${activity._id}`
    },
    getQuestionLink: function (question) {
      return `/forum/question/${question._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.rss-card-wrapper {
  margin-bottom: 20px;
}
.list-item {
  font-size: 14px;
  line-height: 1.3;

  a {
    color: #225a9e;
    text-decoration: none;
    font-weight: 500;
  }
}
.list-item:not(:last-child) {
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 8px;
  padding-bottom: 8px;
}
.no-rss {
  font-size: 13px;
}
</style>
