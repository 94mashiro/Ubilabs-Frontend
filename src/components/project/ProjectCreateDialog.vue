<template>
<div class="project-create-form-wrapper">
  <el-form :model="postBody" label-width="80px">
    <el-form-item label="项目名称">
      <el-input v-model="postBody.title" placeholder="请填写项目名称"></el-input>
    </el-form-item>
    <el-form-item label="GIT名称">
      <el-input v-model="postBody.gitTitle" placeholder="GIT名称只能包含字母、数字、' - '、' _ ' 和 ' . '"></el-input>
    </el-form-item>
    <el-form-item label="项目简介">
      <el-input v-model="postBody.description" placeholder="一句话来介绍你的项目吧"></el-input>
    </el-form-item>
    <el-form-item label="项目技术">
      <el-select v-model="postBody.node" filterable multiple placeholder="请选择">
        <el-option v-for="node in nodeList" :key="node.value" :label="node.label" :value="node.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目图片">
      <image-uploader></image-uploader>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="submitForm">创建项目</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import { postProject, getNodes } from '@/store/api'
export default {
  name: 'projectCreateDialog',
  components: {
    ImageUploader
  },
  data () {
    return {
      nodeList: [],
      postBody: {
        title: '',
        gitTitle: '',
        description: '',
        imageUrls: [],
        node: []
      }
    }
  },
  methods: {
    submitForm: function () {
      this.postBody.imageUrls = this.$store.state.status.uploadImages
      postProject(this.postBody).then(body => {
        if (body.success) {
          this.$message.success('项目创建成功！')
          this.$store.dispatch('project/setIsCreateDialogVisible', { isCreateDialogVisible: false })
        } else {
          this.$message.error(body.message)
          console.error(body.message)
        }
      }).catch(err => {
        this.$message.error(err)
        console.error(err)
      })
    }
  },
  created () {
    getNodes().then((results) => {
      if (results.success) {
        this.nodeList = results.nodes.map(node => {
          return { value: node._id, label: node.name }
        })
      } else {
        throw new Error(results.message)
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
