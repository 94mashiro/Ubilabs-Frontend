<template>
<div class="project-toolbar-wrapper">
<el-card>
  <el-button type="text" icon="el-icon-tickets" class="create-button" @click="showCreateDialog">创建项目</el-button>
</el-card>
</div>
</template>

<script>
export default {
  name: 'projectToolbar',
  methods: {
    showCreateDialog: function () {
      this.$store.dispatch('project/setIsCreateDialogVisible', { isCreateDialogVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.create-button {
  padding: 0 !important;
}
</style>
