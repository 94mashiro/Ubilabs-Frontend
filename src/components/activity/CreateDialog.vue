<template>
<div class="activity-create-dialog-wrapper">
  <el-form :model="activityForm" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="activityForm.title" placeholder="请输入活动名称"></el-input>
    </el-form-item>
    <el-form-item label="活动类型">
      <el-select v-model="activityForm.node" placeholder="请选择活动类型" filterable>
        <el-option v-for="node in nodes" :key="node.value" :label="node.label" :value="node.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开始日期">
      <el-date-picker v-model="activityForm.startDate" placeholder="请选择活动开始日期" type="date"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动描述">
      <markdown-editor :configs="configs" v-model="activityForm.content.md"></markdown-editor>
    </el-form-item>
    <el-form-item label="活动图片">
      <image-uploader></image-uploader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">创建活动</el-button>
      <el-button type="plain" @click="cancelCreate">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { getNodes, postActivity } from '@/store/api'
import { markdownEditorConfigs } from '@/utils/config'
import ImageUploader from '@/components/ImageUploader'
export default {
  name: 'activityCreateDialog',
  components: {
    ImageUploader
  },
  data () {
    return {
      configs: {},
      nodes: [],
      activityForm: {
        title: '',
        content: {
          md: ''
        },
        node: '',
        startDate: '',
        imageUrls: []
      }
    }
  },
  created () {
    this.configs = markdownEditorConfigs
    getNodes().then((results) => {
      if (results.success) {
        this.nodes = results.result.map(node => {
          return { value: node._id, label: node.name }
        })
      } else {
        throw new Error(results.message)
      }
    })
  },
  methods: {
    submitForm () {
      this.activityForm.imageUrls = this.$store.state.status.uploadImages
      postActivity(this.activityForm).then(body => {
        if (body.success) {
          this.$message.success({
            message: '创建活动成功',
            duration: 1500,
            showClose: true
          })
          this.$store.dispatch('activity/setIsCreateDialogVisible', { isCreateDialogVisible: false })
          this.$store.dispatch('activity/getActivities')
        } else {
          this.$message.error({
            message: body.message,
            duration: 1500,
            showClose: false
          })
        }
      }).catch(err => {
        this.$message.error({
          message: err,
          duration: 1500,
          showClose: false
        })
      }).finally(() => {
        this.$store.dispatch('status/clearUploadImages')
      })
    },
    cancelCreate () {
      this.$store.dispatch('activity/setIsCreateDialogVisible', { isCreateDialogVisible: false })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
