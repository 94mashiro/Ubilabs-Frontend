<template>
  <div class="container">
    <el-row :gutter="30">
      <el-col :span="5" class="nav-brand">
        <!-- <img src="http://via.placeholder.com/146x38?text=logo" alt="Ubilabs Logo"> -->
        Ubilabs 在线学习平台
      </el-col>
      <el-col :span="19">
        <el-menu class="nav" mode="horizontal" @select="handleSelect" :default-active="activePath">
          <el-menu-item index="">项目</el-menu-item>
          <el-menu-item index="codelabs">CodeLabs</el-menu-item>
          <el-menu-item index="forum">论坛</el-menu-item>
          <el-menu-item index="activity">活动</el-menu-item>
          <el-menu-item index="content-us">联系我们</el-menu-item>
          <el-menu-item v-if="!isLogin" class="nav-right" index="register">注册</el-menu-item>
          <el-menu-item v-if="!isLogin" class="nav-right" index="login">登录</el-menu-item>
          <el-submenu v-if="isLogin" class="nav-right" index="7">
            <template slot="title">
              <img class="nav-avatar img-round" :src="profile.avatar || `http://via.placeholder.com/146x38?text=logo`" alt="">
              <span>{{profile.name}}</span>
            </template>
            <el-menu-item v-if="profile.isAdmin" index="admin">后台管理</el-menu-item>
            <el-menu-item index="setting">个人设置</el-menu-item>
            <el-menu-item index="logout">登出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { logout } from '../store/api'
export default {
  name: 'navigation',
  data () {
    return {
      search: '',
      activePath: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === 'logout') {
        this.logout()
      } else if (key === 'admin') {
        window.location.href = 'http://localhost:3000/keystone'
      } else {
        this.$router.replace(`/${key}`)
        this.activePath = location.pathname.split('/')[1]
      }
    },
    logout () {
      logout().then(() => {
        this.$message.success({
          message: '登出成功',
          showClose: true,
          duration: 1500
        })
        this.$store.dispatch('user/getUserProfile')
      }).catch((err) => {
        this.$message.error({
          message: `登出错误: ${err}`,
          showClose: true,
          duration: 1500
        })
      }).finally(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'status/isLogin',
      profile: 'user/profile'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  min-width: 1000px;
  // border-bottom: 1px solid #eee;
  .nav-brand {
    height: 61px;
    vertical-align: middle;
    margin-top: 20px;
    img {
      margin-top: 12px;
    }
    .el-input {
      margin-top: 15px;
    }
  }
  .nav {
    width: 100%;
    height: 100%;
    .nav-right {
      float: right;
    }
    .nav-avatar {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }
  .el-menu--horizontal {
    border-bottom: 0 !important;
  }
  .el-submenu .el-menu-item {
    min-width: 150px;
  }
  .img-round {
    border-radius: 25px;
  }
}

</style>
