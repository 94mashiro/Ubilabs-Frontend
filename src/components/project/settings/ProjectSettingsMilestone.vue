<template>
<div class="project-settings-milestone-wrapper">
  <project-settings-add-milestone-dialog></project-settings-add-milestone-dialog>
  <project-settings-modify-milestone-dialog :modifyMilestone="modifyMilestone"></project-settings-modify-milestone-dialog>
  <div class="milestone-settings-header" v-if="project.milestones">
    <span>该项目目前共设置了 {{project.milestones.length || 0}} 个里程碑，已完成 {{finishedMilestone.length}} 个，未完成 {{unfinishedMilestone.length}} 个。</span>
    <el-button type="text" icon="el-icon-plus" style="padding: 0" @click="showAddDialog()">添加里程碑</el-button>
  </div>
  <el-table :data="project.milestones">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="简述" prop="description"></el-table-column>
    <el-table-column label="预计完成日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span>{{getI18nDate(scope.row.deadline)}}</span>
      </template>
    </el-table-column>
    <el-table-column label="实际完成日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span>{{getI18nDate(scope.row.finishDate)}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div class="operation-wrapper">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="showModifyDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import moment from 'moment'
import { deleteProjectMilestone } from '@/store/api'
import ProjectSettingsModifyMilestoneDialog from './ProjectSettingsModifyMilestoneDialog'
import ProjectSettingsAddMilestoneDialog from './ProjectSettingsAddMilestoneDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'projectSettingsMilestone',
  components: {
    ProjectSettingsAddMilestoneDialog,
    ProjectSettingsModifyMilestoneDialog
  },
  computed: {
    ...mapGetters({
      project: 'project/project'
    }),
    finishedMilestone: function () {
      return this.project.milestones.filter(milestone => {
        return milestone.isFinished
      })
    },
    unfinishedMilestone: function () {
      return this.project.milestones.filter(milestone => {
        return !milestone.isFinished
      })
    }
  },
  data () {
    return {
      modifyMilestone: {}
    }
  },
  methods: {
    showAddDialog: function () {
      this.$store.dispatch('project/setIsAddMilestoneDialogVisible', { isAddMilestoneDialogVisible: true })
    },
    showModifyDialog: function (milestone) {
      this.modifyMilestone = {...milestone}
      this.$store.dispatch('project/setIsModifyMilestoneDialogVisible', { isModifyMilestoneDialogVisible: true })
    },
    getI18nDate: function (date) {
      moment.locale('zh-cn')
      return date === (undefined || null) ? '暂未完成' : moment(date).format('LL')
    },
    handleDelete: async function (milestone) {
      if (confirm('你确定要删除该项目里程碑？')) {
        try {
          const body = await deleteProjectMilestone({ milestone_id: milestone._id })
          if (!body.success) {
            throw body.message
          } else {
            await this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
            this.$notify.success('项目里程碑删除成功。')
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
.milestone-settings-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.operation-wrapper {
  display: flex;
  flex-direction: column;
  button {
    width: 100px;
    margin: 0 0 5px 0 !important;
  }
}
</style>

