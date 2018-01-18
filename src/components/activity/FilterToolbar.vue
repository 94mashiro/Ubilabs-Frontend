<template>
<div class="filter-toolbar-wrapper">
  <div class="filter-mode-wrapper">
    <el-radio-group v-model="filterMode" size="mini">
      <el-radio-button label="all">全部</el-radio-button>
      <el-radio-button label="now">进行中</el-radio-button>
      <el-radio-button label="before">已结束</el-radio-button>
      <el-radio-button label="after">未开始</el-radio-button>
    </el-radio-group>
  </div>
  <div class="create-activity-wrapper" v-if="profile && profile.isAdmin">
    <el-button type="primary" class="create-btn" icon="el-icon-plus" size="small" @click="showCreateDialog">新建活动</el-button>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'filterToolbar',
  computed: {
    filterMode: {
      get: function () {
        return this.$store.state.activity.filterMode
      },
      set: function (newValue) {
        this.$store.dispatch('activity/setFilterMode', { filterMode: newValue })
      }
    },
    ...mapGetters({
      'profile': 'user/profile'
    })
  },
  methods: {
    showCreateDialog: function () {
      this.$store.dispatch('activity/setIsCreateDialogVisible', { isCreateDialogVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-toolbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.create-btn {
  margin-top: 10px;
}
</style>

