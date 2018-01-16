<template>
  <el-card class="answer-editor" id="answer-editor" v-loading="isLoading">
    <div class="answer-editor-header">
      <author-info></author-info>
      <div>
        <el-button type="text close-editor-btn" @click="closeEditor"><icon name="close" scale="1.2"></icon></el-button>
      </div>
    </div>
    <markdown-editor class="no-border small-size" :configs="configs" v-model="editorForm.content.md"></markdown-editor>
    <div class="answer-editor-toolbar">
      <el-button type="primary" size="small" @click="submitAnswer">{{isModifyAnswer?'修改回答':'提交回答'}}</el-button>
    </div>
  </el-card>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import { markdownEditorConfigs } from '@/utils/config'
import { postAnswer, patchAnswer } from '@/store/api'
import { mapGetters } from 'vuex'
export default {
  name: 'questionAnswerEditor',
  components: {
    AuthorInfo
  },
  data () {
    return {
      configs: {},
      editorForm: {
        content: {
          md: ''
        },
        question: this.$route.params.id
      },
      isLoading: false
    }
  },
  computed: {
    isModifyAnswer: {
      get: function () {
        return Object.keys(this.selectedAnswer).length !== 0
      }
    },
    ...mapGetters({
      profile: 'user/profile',
      selectedAnswer: 'question/selectedAnswer'
    })
  },
  methods: {
    async submitAnswer () {
      this.isLoading = true
      if (!this.isModifyAnswer) {
        postAnswer(this.editorForm)
        .then((body) => {
          if (body.success) {
            this.$message.success({
              message: '回答成功',
              duration: 1500,
              showClose: true
            })
            this.editorForm.content.md = ''
            this.$store.dispatch('question/getQuestion', {questionId: this.$route.params.id, userId: this.profile && this.profile._id})
          } else {
            this.$message.error({
              message: body.message,
              duration: 1500,
              showClose: true
            })
          }
          this.isLoading = false
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            duration: 1500,
            showClose: true
          })
          this.isLoading = false
        })
      } else {
        try {
          const patchRes = await patchAnswer({
            content: this.editorForm.content,
            _id: this.selectedAnswer._id
          })
          if (patchRes.success) {
            this.$message.success({
              message: '回答修改成功！',
              duration: 1500,
              showClose: true
            })
            this.$store.dispatch('question/getQuestion', {questionId: this.$route.params.id, userId: this.profile && this.profile._id})
          } else {
            this.$message.error({
              message: patchRes.message,
              duration: 15000,
              showClose: true
            })
          }
        } catch (err) {
          console.log(err)
          this.$message.error({
            message: JSON.stringify(err),
            duration: 1500,
            showClose: true
          })
        } finally {
          this.isLoading = false
        }
      }
    },
    closeEditor () {
      this.$store.dispatch('question/setIsShowEditor', { isShowEditor: false })
      window.scrollTo(0, 0)
    }
  },
  created () {
    this.configs = markdownEditorConfigs
    console.log(this.isModifyAnswer)
    if (this.isModifyAnswer) {
      this.editorForm.content.md = this.selectedAnswer.content.md
      this.editorForm._id = this.selectedAnswer.id
    }
  }
}
</script>

<style lang="scss">
.answer-editor-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .close-editor-btn {
    color: #aaa;
  }
}
.answer-editor {
  margin-bottom: 20px;
}

.no-border {
  & > * {
    border: 0;
  }
}

.small-size {
  .CodeMirror-scroll, .CodeMirror {
    min-height: 150px;
  }
}

.answer-editor-toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>
