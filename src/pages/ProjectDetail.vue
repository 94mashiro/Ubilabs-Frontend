<template>
<div class="project-detail-wrapper">
  <el-tabs type="border-card"  v-if="!isLoadingProject">
    <el-tab-pane label="项目介绍">
      <project-detail-intro></project-detail-intro>
    </el-tab-pane>
    <el-tab-pane label="项目代码">
      <project-detail-git></project-detail-git>
    </el-tab-pane>
    <el-tab-pane label="项目成员">
      <project-detail-member></project-detail-member>
    </el-tab-pane>
    <el-tab-pane label="项目笔记"></el-tab-pane>
    <el-tab-pane label="项目管理" v-if="isLogin && project.leader._id === profile._id"></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import ProjectDetailIntro from '@/components/project/ProjectDetailIntro'
import ProjectDetailGit from '@/components/project/ProjectDetailGit'
import ProjectDetailMember from '@/components/project/ProjectDetailMember'
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetail',
  components: {
    ProjectDetailIntro,
    ProjectDetailGit,
    ProjectDetailMember
  },
  computed: mapGetters({
    isLoadingProject: 'project/isLoadingProject',
    project: 'project/project',
    profile: 'user/profile',
    isLogin: 'status/isLogin'
  }),
  created () {
    this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
  }
}
</script>

<style lang="scss" scoped>
.project-detail-wrapper {
  width: 1000px;
  margin: 80px auto 25px;
}
.skeleton-container {
  width: 100%;
  background: #fff;
  border: #eee;
}
</style>
