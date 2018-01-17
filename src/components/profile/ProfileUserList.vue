<template>
<div class="profile-user-container">
  <el-row class="profile-user-list-wrapper" v-if="users.length">
    <el-col class="user-item" v-for="(user, idx) in users" :key="user._id" :span="4" :offset="(idx % 5) > 0 ? 1 : 0">
      <avatar :src="user.avatar" :username="user.name"></avatar>
      <div class="user-name"><router-link :to="getUserProfileUrl(user)">{{user.name}}</router-link></div>
    </el-col>
  </el-row>
  <div v-if="!users.length">暂无用户</div>
</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  name: 'profileUserList',
  components: {
    Avatar
  },
  props: ['users'],
  methods: {
    getUserProfileUrl: (user) => {
      return `/profile/${user._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-user-container {
  padding: 10px 0;
}
.profile-user-list-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  .user-name {
    margin-top: 5px;
    a {
      color: #333;
      text-decoration: none;
    }
  }
}
</style>
