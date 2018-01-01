<template>
  <section class="container">
    <header class="login-header">
      <h1 class="logo">Ubilabs</h1>
      <h2 class="subtitle">与世界分享你的知识、经验和见解</h2>
    </header>
    <div class="login-form">
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.email" placeholder="邮箱" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary full-width" @click="submitForm">登录</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="register" class="signup">还没有账号？快去注册</router-link>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      axios.post('/auth/login', this.loginForm)
      .then((res) => {
        const { data } = res
        if (!data.success) {
          this.$message.error({
            message: data.message,
            showClose: true,
            duration: 1500
          })
        } else {
          this.$router.push('/')
          this.$message.success({
            message: `登陆成功, id:${data.id}.`,
            showClose: true,
            duration: 1500
          })
          this.$store.dispatch('user/getUserProfile')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 300px;
  margin: 0 auto;
  margin-top: 61px;
  padding: 30px 0;
  .login-header {
    text-align: center;
    margin-bottom: 30px;
    .logo {
      font-size: 40px;
      color: #1e8ae8;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .subtitle {
      font-size: 18px;
    }
  }
  .login-form {
    .signup {
      text-decoration: none;
      color: #1e8ae8;
    }
  }
}

.full-width {
  width: 100%;
}
</style>
