<template>
<div class="profile-card-wrapper">
  <el-card>
    <div slot="header" class="profile-header">
      <avatar :username="profile.name" :src="profile.avatar"></avatar>
      <span class="profile-name">{{profile.name}}</span>
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
</template>

<script>
import Avatar from 'vue-avatar'
import { mapGetters } from 'vuex'
export default {
  name: 'profileCard',
  components: {
    Avatar
  },
  computed: mapGetters({
    profile: 'user/profile'
  })
}
</script>

<style lang="scss" scoped>
.profile-card-wrapper {
  margin-bottom: 20px;
}

.profile-header {
  display: flex;

  .profile-name {
    margin: 18px 0 0 10px;
    font-size: 18px;
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.profile-counter-wrapper {
  display: flex;
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
