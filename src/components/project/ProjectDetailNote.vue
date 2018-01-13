<template>
<div class="project-detail-note-wrapper">
  <project-detail-add-note-dialog v-if="isLogin"></project-detail-add-note-dialog>
  <div class="note-list-header">
    <span>本项目共有 {{project.notes.length}} 篇项目笔记</span>
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="showDialog" v-if="isLogin">添加笔记</el-button>
  </div>
  <div class="note-list">
    <div v-for="note in project.notes" :key="note._id" class="list-item">
      <div class="card-wrapper">
        <div class="note-title"><router-link :to="getNoteLink(note)">{{note.article.title}}</router-link></div>
        <div class="note-author">{{note.author.name}}</div>
      </div>
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
      project: 'project/project'
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
  margin-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;

  span {
    line-height: 2;
  }
}

.card-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;

  .note-title {
    font-size: 25px;
    font-weight: 600;
    width: 800px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    a {
      color: #333;
      text-decoration: none;
    }
  }

  .note-author {
    color: #666;
    line-height: 2;
  }
}
</style>
