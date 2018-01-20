<template>
  <div class="setting-form">
    <el-form :model="settings" label-width="100px" label-position="left" ref="passwordForm">
      <el-form-item label="旧密码">
        <el-input v-model="settings.oldPassword" placeholder="" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="settings.newPassword" placeholder="" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码确认">
        <el-input v-model="settings.newPassword2" placeholder="" type="password" @keyup.enter.native="submitForm"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from '@/store/api'
import { mapGetters } from 'vuex'
export default {
  name: 'updatePassword',
  data () {
    return {
      settings: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      }
    }
  },
  computed: mapGetters({
    profile: 'user/profile'
  }),
  methods: {
    submitForm () {
      updatePassword({
        ...this.settings,
        email: this.profile.email
      })
        .then((data) => {
          if (data.success) {
            this.$message.success({
              message: '密码更新成功！',
              showClose: true,
              duration: 1500
            })
          } else {
            this.$message.error({
              message: data.message,
              showClose: true,
              duration: 1500
            })
          }
        }).finally(() => {
          this.settings = {
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
