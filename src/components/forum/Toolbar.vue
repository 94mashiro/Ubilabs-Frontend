<template>
  <div>
    <el-card body-style="padding: 10px;" class="card">
      <div class="toolbar-container">
        <div class="toolbar-container-nav">
          <el-button type="text" button class="toolbar-container-nav-item" @click="navigateToQuestion">
            <icon class="icon" name="ask" :scale="1.8"></icon>
            提问
          </el-button>
          <el-button type="text" button class="toolbar-container-nav-item" @click="navigateToArticle">
            <icon class="icon" name="article" :scale="2"></icon>
            写文章
          </el-button>
        </div>
        <div class="toolbar-dropdown">
          <!-- <el-radio-group v-model="displayMode" size="small">
            <el-radio-button label="question">问题</el-radio-button>
            <el-radio-button label="article">文章</el-radio-button>
          </el-radio-group> -->
          <el-dropdown @command="changeDisplayMode">
            <span class="el-dropdown-link">
              {{displayMode}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="question">问题</el-dropdown-item>
              <el-dropdown-item command="article">文章</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-card>
    <question-dialog></question-dialog>
  </div>
</template>

<script>
import QuestionDialog from '@/components/forum/QuestionDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'Toolbar',
  components: {
    QuestionDialog
  },
  computed: {
    ...mapGetters({
      isQuestionDialogVisible: 'forum/isQuestionDialogVisible',
      isLogin: 'status/isLogin'
    }),
    displayMode: {
      get: function () {
        return (this.$store.state.forum.displayMode === 'question') ? '问题' : '文章'
      },
      set: function (newValue) {
        this.$store.dispatch('forum/setDisplayMode', { displayMode: newValue })
      }
    }
  },
  methods: {
    navigateToQuestion () {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      this.$store.dispatch('forum/setIsQuestionDialogVisible', { isQuestionDialogVisible: true })
    },
    navigateToArticle () {
      this.$router.push('/forum/editor')
    },
    changeDisplayMode (command) {
      this.displayMode = command
    }
  }
}
</script>

<style lang="scss" scope>
.card {
  margin-bottom: 20px;
}

.el-radio-group {
  padding-top: 5px;
}

.toolbar-container {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  // line-height: 58px;
}

.toolbar-container-nav-item {
  font-size: 16px;
  color: #878d99;
  margin-right: 15px;
  &:hover, &:active, &:focus {
    color: #878d99;
  }
}

.icon {
  vertical-align: text-bottom;
  color: #9fadc7;
}

.toolbar-dropdown {
  margin-top: 15px;
  cursor: pointer;
  .el-dropdown-link {
    font-size: 16px;
    color: #878d99;
    font-weight: 600;
  }
}
</style>
