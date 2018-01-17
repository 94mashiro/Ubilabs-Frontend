<template>
<div class="project-settings-member-wrapper">
  <project-detail-add-member-dialog></project-detail-add-member-dialog>
  <div class="member-settings-header">
    <span>该项目目前共有 {{project.member.length}} 名成员。</span>
    <el-button type="text" icon="el-icon-plus" style="padding: 0" @click="showDialog">添加成员</el-button>
  </div>
  <el-table :data="project.member" stripe style="width: 100%">
    <el-table-column label="姓名" prop="name" min-width="200"></el-table-column>
    <el-table-column label="邮箱" prop="email" min-width="200"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteProjectMember } from '@/store/api'
import ProjectDetailAddMemberDialog from '@/components/project/ProjectDetailAddMemberDialog'
export default {
  name: 'projectSettingsMember',
  components: {
    ProjectDetailAddMemberDialog
  },
  computed: mapGetters({
    project: 'project/project'
  }),

  methods: {
    showDialog: function () {
      this.$store.dispatch('project/setIsAddMemberDialogVisible', { isAddMemberDialogVisible: true })
    },
    handleDelete: async function (row) {
      const result = confirm(`你确定要删除成员 ${row.name} 吗？`)
      if (result) {
        try {
          const projectId = this.$route.params.id
          const memberId = row._id
          const body = await deleteProjectMember({projectId, memberId})
          if (!body.success) {
            throw body.message
          } else {
            await this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
            this.$notify.success('成员删除成功。')
          }
        } catch (err) {
          this.$notify.error(err.message || err)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.member-settings-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
