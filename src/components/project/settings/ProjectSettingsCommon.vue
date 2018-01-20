<template>
<div class="project-settings-common-wrapper">
  <el-form :model="postBody" label-width="90px">
    <el-form-item label="项目名称">
      <el-input v-model="postBody.title" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="项目描述">
      <el-input v-model="postBody.description" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="项目技术">
      <el-select v-model="postBody.node" placeholder="" filterable multiple style="width: 100%">
        <el-option v-for="node in nodeList" :key="node.value" :value="node.value" :label="node.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Codelab">
      <el-select v-model="postBody.codelab" placeholder="" filterable multiple style="width: 100%">
        <el-option v-for="codelab in codelabList" :key="codelab.value" :value="codelab.value" :label="codelab.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目故事版">
      <markdown-editor v-model="postBody.story.md" :configs="configs" class="markdown-editor"></markdown-editor>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" icon="el-icon-setting" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { getNodes, patchProject } from '@/store/api'
import { markdownEditorConfigs } from '@/utils/config'
export default {
  name: 'projectSettingsCommon',
  data () {
    return {
      postBody: {
        title: '',
        description: '',
        node: [],
        codelab: [],
        story: {
          md: ''
        },
        _id: this.$route.params.id
      },
      nodeList: [],
      codelabList: [],
      configs: {}
    }
  },
  methods: {
    submitForm: async function () {
      try {
        const body = await patchProject(this.postBody)
        if (!body.success) {
          throw body.message
        } else {
          this.$message.success('项目资料修改成功。')
        }
      } catch (err) {
        this.$message.error(err.message || err)
      }
    }
  },
  async created () {
    this.configs = markdownEditorConfigs
    const { project } = this.$store.state.project
    const codelabs = this.$store.state.codelabs.codelabs
    this.postBody.title = project.title
    this.postBody.description = project.description
    this.postBody.story.md = (project.story && project.story.md) || ''
    this.postBody.node = project.node.map(item => {
      return item._id
    })
    this.postBody.codelab = project.codelab.map(codelab => {
      return codelab._id
    })

    try {
      const body = await getNodes()
      if (!body.success) {
        throw body.message
      } else {
        this.nodeList = body.result.map(node => {
          return { value: node._id, label: node.name }
        })
        this.codelabList = codelabs.map(codelab => {
          return { value: codelab._id, label: codelab.title }
        })
      }
    } catch (err) {
      this.$message.error(err.message || err)
    }
  }
}
</script>

<style lang="scss">

</style>

