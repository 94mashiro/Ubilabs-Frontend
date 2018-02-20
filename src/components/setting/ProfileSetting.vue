<template>
<div class="setting-form">
  <el-form label-width="100px" label-position="left">
    <el-input v-model="settings._id" type="hidden"></el-input>
    <el-form-item label="邮箱">
      <el-input v-model="settings.email" placeholder="" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="settings.name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="settings.studentId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="个人描述">
      <el-input v-model="settings.description" placeholder="" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
    </el-form-item>
    <el-form-item label="修改头像">
      <image-uploader :limit="1"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateProfile } from '@/store/api'
import ImageUploader from '../ImageUploader'
export default {
  name: 'profileSetting',
  components: {
    ImageUploader
  },
  computed: mapGetters({
    profile: 'user/profile',
    uploadImages: 'status/uploadImages'
  }),
  data () {
    return {
      settings: {
        _id: '',
        email: '',
        name: '',
        studentId: '',
        description: '',
        avatar: ''
      }
    }
  },
  created () {
    for (const key in this.settings) {
      this.settings[key] = this.profile[key] || ''
    }
  },
  methods: {
    submitForm () {
      if (this.uploadImages.length) {
        this.settings.avatar = this.uploadImages[0]
      }
      updateProfile(this.settings)
        .then((body) => {
          if (body.success) {
            this.$message.success({
              message: '修改成功',
              duration: 1500
            })
            this.$store.dispatch('user/getUserProfile')
          } else {
            this.$message.error({
              message: body.message.message,
              duration: 1500
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            duration: 1500
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  h2 {
    font-size: 24px;
    padding-left: 10px;
    border-left: 5px solid #409EFF;
  }

  header {
    margin-bottom: 30px;
  }

  .setting-form {
    width: 600px;
  }
}
</style>

