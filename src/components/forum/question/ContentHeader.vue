<template>
<el-container class="question-header">
  <div class="question-header-container" v-if="question.content" >
    <h1 class="question-header-title">
      {{question.title}}
    </h1>
    <author-info :author="question.author"></author-info>
    <div class="question-header-detail">
      <div class="question-text markdown-body" v-html="question.content.html"></div>
    </div>
    <div class="question-header-toolbar" v-if="!isAnswered">
      <el-button type="primary" size="small" plain @click="displayEditor"><icon class="icon" name="brush" :scale="1.8"></icon>写回答</el-button>
      <el-button type="plain" size="small" plain @click="displayDialog" v-if="profile._id === question.author._id"><icon class="icon" name="brush" :scale="1.8"></icon>修改问题</el-button>
    </div>
  </div>
</el-container>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import $ from 'jquery'
import { mapGetters } from 'vuex'
import sleep from '@/utils/sleep'
export default {
  name: 'questionContentHeader',
  components: {
    AuthorInfo
  },
  computed: mapGetters({
    isAnswered: 'question/isAnswered',
    question: 'question/question',
    profile: 'user/profile'
  }),
  methods: {
    displayEditor: async function () {
      if (!this.profile) {
        this.$router.push('/login')
      } else {
        await this.$store.dispatch('question/setIsShowEditor', {isShowEditor: true})
        await sleep(0)
        window.scrollTo(0, $('#answer-editor').offset().top - 70)
      }
    },
    displayDialog: async function () {
      await this.$store.dispatch('question/setSelectedQuestion', { selectedQuestion: this.question })
      await this.$store.dispatch('question/setIsModifyQuestionDialogVisible', { isModifyQuestionDialogVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.question-header {
  width: 100%;
  min-width: 1000px;
  padding-bottom: 20px;
  background: #fff;
  min-height: 100px;


  .question-header-container {
    width: 1000px;
    margin: 25px auto;

    .question-header-title {
      font-size: 22px;
      margin: 20px 0;
      font-weight: 600;
      line-height: 32px;
      color: #1e1e1e;
    }

    .question-header-detail {
      margin: 20px 0;
    }

    .question-text {
      font-size: 15px;
      line-height: 25px;
    }
  }

  .question-header-toolbar {
    .icon {
      vertical-align: text-bottom;
      margin-right: 2px;
    }
  }
}
</style>

