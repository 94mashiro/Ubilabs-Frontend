<template>
<div class="add-note-wrapper">
  <el-dialog title="添加笔记" :visible.sync="isAddNoteDialogVisible">
    <h1 class="select-description">请选择您需要添加的文章作为项目笔记：</h1>
    <el-select v-model="postBody.articleId" placeholder="选择文章" style="width: 100%">
      <el-option v-for="article in articles" :key="article.value" :label="article.label" :value="article.value"></el-option>
    </el-select>
    <div slot="footer"><el-button type="primary" @click="submitForm">添加</el-button></div>
  </el-dialog>
</div>
</template>

<script>
import { getArticles, postProjectNote } from '@/store/api'
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
    submitForm: async function () {
      if (!this.postBody.projectId || !this.postBody.articleId) {
        this.$message.error('请选择文章后再进行提交。')
      } else {
        try {
          const body = await postProjectNote(this.postBody)
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
.select-description {
  margin-bottom: 10px;
}
</style>

