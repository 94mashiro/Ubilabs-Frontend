<template>
<div class="modify-question-dialog-wrapper" v-if="isModifyQuestionDialogVisible">
  <el-dialog title="编辑问题" :visible.sync="isModifyQuestionDialogVisible">
    <el-form :model="selectedQuestion">
      <el-form-item label="">
        <el-input v-model="title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="">
        <markdown-editor v-model="md" :configs="configs"></markdown-editor>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="node" placeholder="" style="width: 100%">
          <el-option v-for="node in questionNodes" :key="node._id" :label="node.name" :value="node._id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm">确认修改</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateQuestion } from '@/store/api'
import { markdownEditorConfigs } from '@/utils/config'
import * as types from '@/store/mutation-types'
export default {
  name: 'modifyQuestionDialog',
  computed: {
    isModifyQuestionDialogVisible: {
      get: function () {
        return this.$store.state.question.isModifyQuestionDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('question/setIsModifyQuestionDialogVisible', { isModifyQuestionDialogVisible: newValue })
      }
    },
    title: {
      get: function () {
        return this.$store.state.question.selectedQuestion.title
      },
      set: function (newValue) {
        this.$store.commit(`question/${types.QUESTION_UPDATE_TITLE}`, newValue)
      }
    },
    md: {
      get: function () {
        return (this.$store.state.question.selectedQuestion.content && this.$store.state.question.selectedQuestion.content.md) || ''
      },
      set: function (newValue) {
        this.$store.commit(`question/${types.QUESTION_UPDATE_CONTENT}`, newValue)
      }
    },
    node: {
      get: function () {
        return this.$store.state.question.selectedQuestion.node
      },
      set: function (newValue) {
        this.$store.commit(`question/${types.QUESTION_UPDATE_NODE}`, newValue)
      }
    },
    ...mapGetters({
      question: 'question/question',
      selectedQuestion: 'question/selectedQuestion',
      questionNodes: 'forum/questionNodes'
    })
  },
  data () {
    return {
      configs: {}
    }
  },
  mounted () {
    this.configs = markdownEditorConfigs
  },
  methods: {
    submitForm: async function () {
      try {
        const body = await updateQuestion(this.selectedQuestion)
        if (!body.success) {
          throw body.message
        } else {
          this.isModifyQuestionDialogVisible = false
          await this.$store.dispatch('question/getQuestion', { questionId: this.$route.params.id })
          this.$notify.success('问题修改成功。')
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
