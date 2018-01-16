<template>
<div class="profile-container">
  <el-container>
    <el-aside width="400px">
      <el-main>
        <div class="profile-card-wrapper">
          <el-card>
            <div slot="header" class="profile-card-header">
              <avatar :src="profile.avatar" :size="80" :username="profile.name"></avatar>
              <div class="user-information-wrapper">
                <div class="user-username">{{profile.name}}</div>
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
            <el-tab-pane label="项目" name="first">项目</el-tab-pane>
            <el-tab-pane label="问题" name="second">问题</el-tab-pane>
            <el-tab-pane label="文章" name="third">文章</el-tab-pane>
            <el-tab-pane label="正在关注" name="fourth">正在关注</el-tab-pane>
            <el-tab-pane label="关注者" name="fifth">关注者</el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>
import Avatar from 'vue-avatar'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'profile',
  components: {
    Avatar
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile'
    })
  },
  methods: {
    getI18nDate: function (date) {
      moment.locale('zh-cn')
      return moment(date).format('ll')
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

</style>

