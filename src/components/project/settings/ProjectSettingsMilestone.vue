<template>
<div class="project-settings-milestone-wrapper">
  <project-settings-add-milestone-dialog></project-settings-add-milestone-dialog>
  <div class="milestone-settings-header">
    <span>该项目目前共设置了 {{project.milestones.length}} 个里程碑，已完成 0 个，未完成 0 个。</span>
    <el-button type="text" style="padding: 0" @click="showDialog">添加里程碑</el-button>
  </div>
  <el-steps :active="1" finish-status="success">
    <el-step title="项目启动"></el-step>
    <el-step v-for="milestone in project.milestones" :key="milestone._id" :title="milestone.name" :description="milestone.description"></el-step>
  </el-steps>
</div>
</template>

<script>
import ProjectSettingsAddMilestoneDialog from './ProjectSettingsAddMilestoneDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'projectSettingsMilestone',
  components: {
    ProjectSettingsAddMilestoneDialog
  },
  computed: mapGetters({
    project: 'project/project'
  }),
  methods: {
    showDialog: function () {
      this.$store.dispatch('project/setIsAddMilestoneDialogVisible', { isAddMilestoneDialogVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.milestone-settings-header {
  display: flex;
  justify-content: space-between;
}
</style>

