<template>
<el-container class="container">
  <el-main>
    <project-toolbar v-if="isLogin"></project-toolbar>
  </el-main>
  <el-aside width="280px">
    <el-main>
45667
    </el-main>
  </el-aside>
  <el-dialog title="创建新项目" :visible.sync="isCreateDialogVisible">
    <project-create-dialog></project-create-dialog>
  </el-dialog>
</el-container>
</template>

<script>
import ProjectToolbar from '@/components/project/ProjectToolbar'
import ProjectCreateDialog from '@/components/project/ProjectCreateDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'project',
  components: {
    ProjectToolbar,
    ProjectCreateDialog
  },
  computed: {
    isCreateDialogVisible: {
      get: function () {
        return this.$store.state.project.isCreateDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('project/setIsCreateDialogVisible', { isCreateDialogVisible: newValue })
      }
    },
    ...mapGetters({
      isLogin: 'status/isLogin'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 75px auto 0;
}
</style>
