<template>
  <el-container class="container" v-loading="isLoading">
    <el-header>
      <filter-toolbar></filter-toolbar>
    </el-header>
    <el-main>
      <activity-list :activities="activities"></activity-list>
      <el-dialog title="创建新活动" :visible.sync="isCreateDialogVisible" top="5vh" @close="handleClose">
        <create-dialog></create-dialog>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import FilterToolbar from '@/components/activity/FilterToolbar'
import CreateDialog from '@/components/activity/CreateDialog'
import ActivityList from '@/components/activity/ActivityList'
import { mapGetters } from 'vuex'
export default {
  name: 'activity',
  components: {
    FilterToolbar,
    CreateDialog,
    ActivityList
  },
  computed: {
    isCreateDialogVisible: {
      get: function () {
        return this.$store.state.activity.isCreateDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('activity/setIsCreateDialogVisible', { isCreateDialogVisible: newValue })
      }
    },
    ...mapGetters({
      isLoading: 'activity/isLoading',
      activities: 'activity/activities'
    })
  },
  methods: {
    handleClose: function () {
      this.$store.dispatch('status/clearUploadImages')
    }
  },
  created () {
    this.$store.dispatch('activity/getActivities')
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 91px auto 0;
  width: 1000px;
}
</style>
