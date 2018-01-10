<template>
<div class="project-detail-note-wrapper">
  <project-detail-add-note-dialog v-if="isLogin"></project-detail-add-note-dialog>
  <div class="note-list-header">
    <span>本项目共有 {{projectNotes.length}} 篇项目笔记</span>
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="showDialog" v-if="isLogin">添加笔记</el-button>
  </div>
  <div class="note-list">
    <div class="list-item" v-for="note in projectNotes" :key="note._id">
      <div class="note-title"><router-link :to="getNoteLink(note)">{{note.article.title}}</router-link></div>
      <div class="note-author">{{note.author.name}}</div>
    </div>
  </div>
</div>
</template>

<script>
import ProjectDetailAddNoteDialog from './ProjectDetailAddNoteDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetailNote',
  components: {
    ProjectDetailAddNoteDialog
  },
  computed: {
    ...mapGetters({
      isLogin: 'status/isLogin',
      projectNotes: 'project/projectNotes'
    })
  },
  methods: {
    showDialog: function () {
      this.$store.dispatch('project/setIsAddNoteDialogVisible', { isAddNoteDialogVisible: true })
    },
    getNoteLink: function (note) {
      return `/forum/article/${note.article._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.note-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;

  span {
    line-height: 1.7;
  }
}
.list-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .note-title {
    font-size: 25px;
    font-weight: 600;
    a {
      color: #333;
      text-decoration: none;
    }
  }

  .note-author {
    color: #666;
    line-height: 1.3;
  }
}
</style>
