<template>
<div class="codelabs-create-dialog-wrapper">
  <el-form :model="postBody" label-width="100px">
    <el-form-item label="文档标题">
      <el-input v-model="postBody.title" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="文档节点">
      <el-select v-model="postBody.node" filterable placeholder="" style="width:100%;">
        <el-option v-for="node in nodes" :key="node.value" :label="node.label" :value="node.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上传压缩包">
      <el-upload action="" :accept="acceptType" :auto-upload="false" :limit="1" :on-change="handleChange" :on-remove="handleRemove">
        <el-button type="success" plain>选择文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="submitForm">创建文档</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNodes, postCodelab } from '@/store/api'
export default {
  name: 'codelabsCreateDialog',
  data () {
    return {
      acceptType: 'application/zip',
      nodes: [],
      postBody: {
        title: '',
        node: '',
        author: '',
        file: {}
      }
    }
  },
  computed: mapGetters({
    profile: 'user/profile'
  }),
  created () {
    getNodes().then((results) => {
      if (results.success) {
        this.nodes = results.nodes.map(node => {
          return { value: node._id, label: node.name }
        })
      } else {
        throw new Error(results.message)
      }
    })
  },
  methods: {
    handleChange: function (file) {
      console.log(file)
      this.postBody.file = file.raw
    },
    handleRemove: function () {
      this.postBody.file = {}
    },
    submitForm: function () {
      const formData = new FormData()
      formData.append('file', this.postBody.file)
      formData.append('title', this.postBody.title)
      formData.append('node', this.postBody.node)
      formData.append('author', this.profile._id)
      postCodelab(formData).then(body => {
        if (body.success) {
          this.$message.success('创建成功')
          this.$store.dispatch('setIsCreateDialogVisible', { isCreateDialogVisible: false })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

