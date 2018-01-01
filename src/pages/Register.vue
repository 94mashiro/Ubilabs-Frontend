<template>
  <section class="container">
    <header class="login-header">
      <h1 class="logo">Ubilabs</h1>
      <h2 class="subtitle">与世界分享你的知识、经验和见解</h2>
    </header>
    <div class="register-form">
      <el-form status-icon :model="registerForm" :rules="formRules">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="email" v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordValid">
          <el-input type="password" v-model="registerForm.passwordValid" placeholder="密码确认"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary full-width" @click="submitForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data () {
    const passwordValidRule = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        passwordValid: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '请至少输入8个长度的密码', trigger: 'blur' }
        ],
        passwordValid: [
          { validator: passwordValidRule, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      axios.post('/auth/register', this.registerForm)
      .then((res) => {
        const { data } = res
        if (!data.success) {
          this.$message.error({
            message: data.message,
            showClose: true,
            duration: 1500
          })
        } else {
          this.$message.success({
            message: '恭喜你，注册成功！',
            showClose: true,
            duration: 1500
          })
          this.$store.dispatch('user/getUserProfile')
          this.$router.push('/')
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
}

.full-width {
  width: 100%;
}
</style>

