<template>
<div class="add-member-wrapper">
  <el-alert
    v-if="showError"
    :title="errorMessage"
    type="error"
    show-icon
    @close="closeError"
    class="dialog-alart"
  >
  </el-alert>
  <el-form status-icon :model="postBody" :rules="formRules">
    <el-form-item prop="email">
      <el-input v-model="postBody.email" placeholder="请输入用户的Email"></el-input>
    </el-form-item>
  </el-form>
  <div class="dialog-footer"><el-button type="primary" size="small" @click="verifyEmail">添加</el-button></div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetailAddMemberDialog',
  data () {
    return {
      showError: false,
      errorMessage: '',
      postBody: {
        email: ''
      },
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
        ]
      }
    }
  },
  computed: mapGetters({
    project: 'project/project'
  }),
  methods: {
    closeError: function () {
      this.showError = false
    },
    verifyEmail: function () {
      this.showError = false
      console.log(this.postBody.email)
      if (this.postBody.email === this.project.leader.email) {
        this.errorMessage = '您不能添加自己。'
        this.showError = true
      } else {
        for (let member of this.project.member) {
          if (member.email === this.postBody.email) {
            this.errorMessage = '该用户已加入此项目。'
            this.showError = true
            return
          }
        }
        console.log('post 数据')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-alart {
  margin-bottom: 20px;
}
</style>

