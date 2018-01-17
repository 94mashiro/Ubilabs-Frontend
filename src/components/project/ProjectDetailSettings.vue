<template>
<div class="project-detail-settings-wrapper">
<el-tabs tab-position="left" style="min-height: 400px">
  <el-tab-pane label="通用设置">
    <project-settings-common></project-settings-common>
  </el-tab-pane>
  <el-tab-pane label="成员管理">
    <project-settings-member></project-settings-member>
  </el-tab-pane>
  <el-tab-pane label="里程碑管理">
    <project-settings-milestone></project-settings-milestone>
  </el-tab-pane>
  <el-tab-pane label="笔记管理">
    <project-settings-note></project-settings-note>
  </el-tab-pane>
</el-tabs>
</div>
</template>

<script>
import ProjectSettingsCommon from './settings/ProjectSettingsCommon'
import ProjectSettingsMember from './settings/ProjectSettingsMember'
import ProjectSettingsMilestone from './settings/ProjectSettingsMilestone'
import ProjectSettingsNote from './settings/ProjectSettingsNote'
export default {
  name: 'projectDetailSettings',
  components: {
    ProjectSettingsCommon,
    ProjectSettingsMember,
    ProjectSettingsMilestone,
    ProjectSettingsNote
  }
}
</script>

<style lang="scss" scoped>

</style>
