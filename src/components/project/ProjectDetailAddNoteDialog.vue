<template>
<div class="add-note-wrapper">
  <el-dialog title="添加笔记" :visible.sync="isAddNoteDialogVisible">
    <span>请选择您需要添加的文章作为项目笔记：</span>
    <el-select class="dialog-select" v-model="postBody.articleId" placeholder="选择文章" style="width: 100%" clearable >
      <el-option v-for="article in articles" :key="article.value" :label="article.label" :value="article.value"></el-option>
    </el-select>
    <el-select class="dialog-select" v-model="milestone" placeholder="如果该笔记是作为里程碑结束笔记，请选择对应的项目里程碑。" clearable style="width:100%">
      <el-option v-for="milestone in project.milestones" :key="milestone._id" :label="milestone.name" :value="milestone._id"></el-option>
    </el-select>
    <span class="select-description">如果还没写，<el-button type="text" class="nav-editor" @click="navToEditor">点击</el-button>跳转到文章编辑器。</span>
    <div slot="footer"><el-button type="primary" @click="submitForm">添加</el-button></div>
  </el-dialog>
</div>
</template>

<script>
import { getArticles, postProjectNote, patchProjectMilestone } from '@/store/api'
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetailAddNoteDialog',
  computed: {
    isAddNoteDialogVisible: {
      get: function () {
        return this.$store.state.project.isAddNoteDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('project/setIsAddNoteDialogVisible', { isAddNoteDialogVisible: newValue })
      }
    },
    ...mapGetters({
      profile: 'user/profile',
      project: 'project/project',
      isLogin: 'status/isLogin'
    })
  },
  data () {
    return {
      articles: [],
      milestone: '',
      postBody: {
        projectId: this.$route.params.id,
        articleId: ''
      }
    }
  },
  async created () {
    try {
      const userArticles = await getArticles({ user_id: this.profile._id })
      this.articles = userArticles.result.filter(article => {
        for (let note of this.project.notes) {
          if (note.article._id === article._id) return false
        }
        return true
      }).map(article => {
        return {
          value: article._id,
          label: article.title
        }
      })
    } catch (err) {
      this.$message.error(err.message || err)
    }
  },
  methods: {
    navToEditor: function () {
      this.isAddNoteDialogVisible = false
      this.$router.push('/forum/editor')
    },
    checkMilestone: function (milestoneId) {
      if (!milestoneId) return
      const milestone = this.project.milestones.filter(ms => ms._id === milestoneId)[0]
      if (!milestone.isFinished) {
        const postBody = {
          _id: milestone._id,
          finishDate: new Date(),
          isFinished: true
        }
        return patchProjectMilestone(postBody)
      }
    },
    submitForm: async function () {
      if (!this.postBody.projectId || !this.postBody.articleId) {
        this.$message.error('请选择文章后再进行提交。')
      } else {
        try {
          const body = await postProjectNote(this.postBody)
          await this.checkMilestone(this.milestone)
          if (!body.success) {
            throw body.message
          } else {
            this.isAddNoteDialogVisible = false
            await this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
            this.$message.success('笔记添加成功！')
          }
        } catch (err) {
          this.$message.error(err)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-select {
  margin: 10px 0 10px;
}

.nav-editor {
  color: #295d9d;
  padding-right: 3px;
  font-weight: 600;
}
</style>

