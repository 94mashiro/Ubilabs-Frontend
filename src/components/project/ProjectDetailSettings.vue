<template>
<div class="project-detail-settings-wrapper">
<el-tabs tab-position="left" style="min-height: 400px">
  <el-tab-pane label="通用设置">
    <project-settings-common></project-settings-common>
  </el-tab-pane>
  <el-tab-pane label="成员管理">
    <project-settings-member></project-settings-member>
  </el-tab-pane>
  <el-tab-pane label="里程碑设置">
    <project-settings-milestone></project-settings-milestone>
  </el-tab-pane>
  <el-tab-pane label="通用设置"></el-tab-pane>
</el-tabs>
</div>
</template>

<script>
import ProjectSettingsCommon from './settings/ProjectSettingsCommon'
import ProjectSettingsMember from './settings/ProjectSettingsMember'
import ProjectSettingsMilestone from './settings/ProjectSettingsMilestone'
export default {
  name: 'projectDetailSettings',
  components: {
    ProjectSettingsCommon,
    ProjectSettingsMember,
    ProjectSettingsMilestone
  }
}
</script>

<style lang="scss" scoped>

</style>
