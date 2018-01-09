<template>
  <div class="update-sshkey-wrapper">
    <el-form :model="postBody">
      <el-form-item label="">
        <el-input v-model="postBody.key" type="textarea" placeholder="这里填写电脑生成的sshkey。" resize="none" :autosize="{minRows: 10, maxRows: 10}"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-plus" @click="submitForm">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateSSHKey, updateProfile } from '@/store/api'
import { mapGetters } from 'vuex'
export default {
  name: 'updateSSHKey',
  computed: mapGetters({
    profile: 'user/profile'
  }),
  data () {
    return {
      postBody: {
        key: '',
        title: 'ssh-key'
      }
    }
  },
  methods: {
    submitForm: async function () {
      if (this.postBody.key === '') {
        this.$message.error('请输入SSH Key。')
      } else {
        try {
          let body = await updateSSHKey(this.profile.gitlabToken, this.postBody)
          if (body.message) {
            this.$message.error(body.message.key.join('\n'))
          } else {
            body = await updateProfile({
              _id: this.profile._id,
              gitlabSSHKey: this.postBody.key
            })
            await this.$store.dispatch('user/getUserProfile')
            this.$message.success('SSH Key绑定成功！')
            this.postBody.key = ''
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

