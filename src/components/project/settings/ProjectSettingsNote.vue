<template>
<div class="project-settings-note-wrapper">
  <div class="note-settings-header">
    <span>该项目目前共有 {{project.notes.length}}  篇笔记。</span>
  </div>
  <el-table :data="project.notes" style="width: 100%">
    <el-table-column label="笔记" prop="article.title" min-width="300"></el-table-column>
    <el-table-column label="作者" prop="author.name" width="120"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteProjectNote } from '@/store/api'
export default {
  name: 'projectSettingsNote',
  computed: {
    ...mapGetters({
      project: 'project/project'
    })
  },
  methods: {
    handleDelete: async function (note) {
      if (confirm('你确定要删除这篇笔记吗？')) {
        try {
          const body = await deleteProjectNote({ note_id: note._id })
          if (!body.success) {
            throw body.message
          } else {
            await this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
            this.$notify.success('笔记删除成功。')
          }
        } catch (err) {
          this.$notify.error(err.message || err)
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project-settings-note-wrapper {
  padding: 20px;
}
</style>

