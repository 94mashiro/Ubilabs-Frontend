<template>
<div class="profile-container" v-loading="isLoading" element-loading-background="#f3f3f3">
  <el-container>
    <el-aside width="400px">
      <el-main>
        <div class="profile-card-wrapper">
          <el-card>
            <div slot="header" class="profile-card-header">
              <avatar :src="profile.avatar||''" :size="80" :username="profile.name||''"></avatar>
              <div class="user-information-wrapper">
                <div class="user-left">
                  <div class="user-username">{{profile.name}}</div>
                  <div class="user-follow-btn" v-if="isLogin && profile._id !== userProfile._id">
                    <el-button type="success" size="mini" v-if="!profile.isFollowing" @click="handleFollowing">关注</el-button>
                    <el-button type="danger" size="mini" v-if="profile.isFollowing" @click="handleUnFollowing">取消关注</el-button>
                  </div>
                </div>
                <div class="user-meta">
                  <span>
                    <p>加入于 {{getI18nDate(profile.createdAt)}}</p>
                    <p>{{profile.description}}</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="profile-counter-wrapper">
              <div class="counter-item">
                <div class="counter-name">项目数</div>
                <span>{{profile.projectCount}}</span>
              </div>
              <div class="divine"></div>
              <div class="counter-item">
                <div class="counter-name">提问数</div>
                <span>{{profile.questionCount}}</span>
              </div>
              <div class="divine"></div>
              <div class="counter-item">
                <div class="counter-name">文章数</div>
                <span>{{profile.articleCount}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-aside>
    <el-main>
      <div class="profile-aside-wrapper">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="项目" name="project">
              <el-table :data="project.results" :show-header="false">
                <el-table-column label="">
                  <template slot-scope="scope">
                  <router-link :to="scope.row.url" class="row-link">{{scope.row.title}}</router-link>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-pagination">
                <el-pagination :total="project.total" :page-size="10" @current-change="projectPage" layout="prev, pager, next"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="问题" name="question">
              <el-table :data="question.results" :show-header="false">
                <el-table-column label="">
                  <template slot-scope="scope">
                  <router-link :to="scope.row.url" class="row-link">{{scope.row.title}}</router-link>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-pagination">
                <el-pagination :total="question.total" :page-size="10" @current-change="questionPage" layout="prev, pager, next"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文章" name="article">
              <el-table :data="article.results" :show-header="false">
                <el-table-column label="">
                  <template slot-scope="scope">
                    <router-link :to="scope.row.url || ''" class="row-link">{{scope.row.title || ''}}</router-link>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-pagination">
                <el-pagination :total="article.total" :page-size="10" @current-change="articlePage" layout="prev, pager, next"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="正在关注" name="following">
              <profile-user-list :users="profile.following"></profile-user-list>
            </el-tab-pane>
            <el-tab-pane label="关注者" name="follower">
              <profile-user-list :users="profile.follower"></profile-user-list>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>
import Avatar from 'vue-avatar'
import ProfileUserList from '@/components/profile/ProfileUserList'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'profile',
  components: {
    Avatar,
    ProfileUserList
  },
  data () {
    return {
      activeName: 'project'
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/profile',
      project: 'profile/project',
      question: 'profile/question',
      article: 'profile/article',
      isLoading: 'profile/isLoading',
      userProfile: 'user/profile',
      isLogin: 'status/isLogin'
    })
  },
  methods: {
    getI18nDate: function (date) {
      moment.locale('zh-cn')
      return moment(date).format('ll')
    },
    ...mapActions({
      getArticle: 'profile/getArticle',
      getQuestion: 'profile/getQuestion',
      getProject: 'profile/getProject'
    }),
    projectPage: function (page) {
      this.getProject({ userId: this.$route.params.id, page })
    },
    questionPage: function (page) {
      this.getQuestion({ userId: this.$route.params.id, page })
    },
    articlePage: function (page) {
      this.getArticle({ userId: this.$route.params.id, page })
    },
    handleFollowing: async function () {
      try {
        await this.$store.dispatch('follow/follow', { followerId: this.userProfile._id, followingId: this.profile._id })
        this.$notify.success('关注成功。')
      } catch (err) {
        console.error(err)
        this.$notify.error(err)
      }
    },
    handleUnFollowing: async function () {
      try {
        await this.$store.dispatch('follow/unfollow', { followerId: this.userProfile._id, followingId: this.profile._id })
        this.$notify.success('取消关注成功。')
      } catch (err) {
        console.error(err)
        this.$notify.error(err)
      }
    }
  },
  created () {
    this.$store.dispatch('profile/getProfile', { userId: this.$route.params.id })
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('profile/getProfile', { userId: this.$route.params.id })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  width: 1100px;
  margin: 81px auto 20px;
}

.profile-card-header {
  display: flex;
  flex-direction: row;

  .user-information-wrapper {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .user-left {
      display: flex;
      justify-content: space-between;
    }

    .user-username {
      font-size: 24px;
      font-weight: 600;
    }
    .user-meta {
      font-size: 14px;
      color: #888;
      width: 200px;
      p {
        line-height: 1.5;
      }
    }
  }
}

.profile-counter-wrapper {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  .counter-item {
    text-align: center;
    .counter-name {
      margin-bottom: 8px;
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .divine {
    border-left: 1px solid #ebeef5;
    height: 35px;
    margin: auto 0;
  }
}

.table-pagination {
  padding: 10px 0;
}

.row-link {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

</style>

