<template>
<div class="codelabs-create-dialog-wrapper">
  <el-dialog :title="isModifyCodelab ? '编辑文档' : '创建新文档'" :visible.sync="isCreateDialogVisible" @close="handleClose">
    <el-form :model="postBody" label-width="100px">
      <el-form-item label="文档标题">
        <el-input v-model="postBody.title" placeholder="" v-if="!isModifyCodelab"></el-input>
        <el-input v-model="title" placeholder="" v-if="isModifyCodelab"></el-input>
      </el-form-item>
      <el-form-item label="文档节点">
        <el-select v-model="postBody.node" filterable placeholder="" style="width:100%;" v-if="!isModifyCodelab">
          <el-option v-for="node in nodes" :key="node.value" :label="node.label" :value="node.value"></el-option>
        </el-select>
        <el-select v-model="node" filterable placeholder="" style="width:100%;" v-if="isModifyCodelab">
          <el-option v-for="node in nodes" :key="node.value" :label="node.label" :value="node.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传压缩包">
        <el-upload ref="upload" action="" :accept="acceptType" :auto-upload="false" :limit="1" :on-change="handleChange" :on-remove="handleRemove">
          <el-button type="success" plain size="small">选择文件</el-button>
        </el-upload>
      </el-form-item>
      后台编译文档可能会需要若干秒的时间，请耐心等待。
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm" size="small" v-if="!isModifyCodelab">创建文档</el-button>
      <el-button type="primary" @click="submitModifyForm" size="small" v-if="isModifyCodelab">编辑文档</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNodes, postCodelab, updateCodelab } from '@/store/api'
import * as type from '@/store/mutation-types'
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
  computed: {
    ...mapGetters({
      profile: 'user/profile',
      selectedCodelab: 'codelabs/selectedCodelab'
    }),
    isCreateDialogVisible: {
      get: function () {
        return this.$store.state.codelabs.isCreateDialogVisible
      },
      set: function (newValue) {
        return this.$store.dispatch('codelabs/setIsCreateDialogVisible', { isCreateDialogVisible: newValue })
      }
    },
    isModifyCodelab: function () {
      return JSON.stringify(this.selectedCodelab) !== '{}'
    },
    title: {
      get: function () {
        return this.$store.state.codelabs.selectedCodelab.title
      },
      set: function (newValue) {
        this.$store.commit(`codelabs/${type.CODELABS_UPDATE_TITLE}`, newValue)
      }
    },
    node: {
      get: function () {
        return this.$store.state.codelabs.selectedCodelab.node._id || this.$store.state.codelabs.selectedCodelab.node
      },
      set: function (newValue) {
        this.$store.commit(`codelabs/${type.CODELABS_UPDATE_NODE}`, newValue)
      }
    },
    file: {
      get: function () {
        return this.$store.state.codelabs.selectedCodelab.file
      },
      set: function (newValue) {
        this.$store.commit(`codelabs/${type.CODELABS_UPDATE_FILE}`, newValue)
      }
    }
  },
  created () {
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
    handleChange: function (file) {
      console.log(file)
      if (this.isModifyCodelab) {
        this.file = file.raw
      } else {
        this.postBody.file = file.raw
      }
    },
    handleRemove: function () {
      if (this.isModifyCodelab) {
        this.file = {}
      } else {
        this.postBody.file = {}
      }
    },
    handleClose: function () {
      console.log('close')
      this.$store.dispatch('codelabs/setSelectedCodelab', { selectedCodelab: {} })
      this.$refs.upload.clearFiles()
    },
    submitForm: function () {
      const formData = new FormData()
      formData.append('file', this.postBody.file)
      formData.append('title', this.postBody.title)
      formData.append('node', this.postBody.node)
      formData.append('author', this.profile._id)
      postCodelab(formData).then(body => {
        if (body.success) {
          this.$notify.success('创建成功')
          this.$store.dispatch('codelabs/setIsCreateDialogVisible', { isCreateDialogVisible: false })
        }
      })
    },
    submitModifyForm: async function () {
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.title)
      formData.append('node', this.node)
      formData.append('author', this.profile._id)
      formData.append('_id', this.selectedCodelab._id)
      try {
        const body = await updateCodelab(formData)
        if (!body.success) {
          throw body.message
        } else {
          this.$notify.success('编辑成功。')
          this.$store.dispatch('codelabs/setIsCreateDialogVisible', { isCreateDialogVisible: false })
        }
      } catch (err) {
        this.$notify.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

