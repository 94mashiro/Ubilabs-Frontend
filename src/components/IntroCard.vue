<template>
<div class="intro-card-wrapper">
  <el-card>
    <div slot="header">
      <span class="intro-header">Ubilabs 是一个关于分享和探索的地方</span>
    </div>
    <div class="intro-card-body">
      <el-button type="plain" style="width:45%;padding:8px;" @click="navToRegister">点击注册</el-button>
      <span>已注册用户请 <router-link to="/login">登录</router-link></span>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'introCard',
  methods: {
    navToRegister: function () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.intro-card-wrapper {
  margin-bottom: 20px;
}
.intro-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 10px;
    font-size: 13px;

    a {
      color: #333;
      font-weight: 600;
      text-decoration: none;
    }
  }
}
.intro-header {
  font-size: 14px;
}
</style>
