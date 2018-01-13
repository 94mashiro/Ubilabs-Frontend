<template>
<el-dialog title="写下你的问题" :visible.sync="isQuestionDialogVisible" :before-close="handleClose" center top="10vh">
  <el-form :model="questionForm" ref="questionForm">
    <el-form-item>
      <el-input v-model="questionForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="">
      <markdown-editor class="question-editor" v-model="questionForm.content.md" :configs="configs"></markdown-editor>
    </el-form-item>
    <el-form-item label="选择话题">
      <el-select v-model="questionForm.node" filterable placeholder="" style="width:100%;">
        <el-option v-for="node in nodes" :key="node.value" :label="node.label" :value="node.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitForm">提交提问</el-button>
    <el-button @click="clearFormData">取消</el-button>
  </span>
</el-dialog>
</template>

<script>
import { getNodes, postQuestion } from '@/store/api'
import { markdownEditorConfigs } from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  name: 'questionDialog',
  computed: {
    isQuestionDialogVisible: {
      get: function () {
        return this.$store.state.forum.isQuestionDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('forum/setIsQuestionDialogVisible', { isQuestionDialogVisible: newValue })
      }
    },
    ...mapGetters({
      displayNode: 'forum/displayNode'
    })
  },
  data () {
    return {
      nodes: [],
      questionForm: {
        title: '',
        content: {
          md: ''
        },
        node: '',
        configs: {}
      }
    }
  },
  methods: {
    clearFormData () {
      this.questionForm = {
        title: '',
        content: {
          md: ''
        },
        node: ''
      }
      this.isQuestionDialogVisible = false
    },
    handleClose (done) {
      this.clearFormData()
      done()
    },
    submitForm () {
      postQuestion(this.questionForm)
        .then((body) => {
          if (body.success) {
            this.$message.success({
              message: `提问成功`,
              duration: 1500
            })
          } else {
            this.$message.error({
              message: body.message.message,
              duration: 1500
            })
          }
        }).finally(() => {
          this.clearFormData()
          this.$store.dispatch('forum/getQuestions', { nodeId: this.displayNode })
        })
    }
  },
  created () {
    this.configs = markdownEditorConfigs
  },
  mounted () {
    getNodes().then((results) => {
      if (results.success) {
        this.nodes = results.result.map(node => {
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
.el-dialog {
  height: 80% !important;
  overflow: auto !important;
}

.question-editor {
  line-height: 1;
}

.markdown-editor .CodeMirror {
  height: 200px;
}
</style>
