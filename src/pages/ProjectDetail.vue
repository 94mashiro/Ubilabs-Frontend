<template>
<div class="project-detail-wrapper">
  <el-tabs v-model="selectedTab" type="border-card" v-loading="isLoadingProject" element-loading-background="#fff" @tab-click="handleClick">
    <el-tab-pane name="intro" label="项目介绍">
      <project-detail-intro></project-detail-intro>
    </el-tab-pane>
    <el-tab-pane name="progress" label="项目进度">
      <project-detail-progress v-if="!isLoadingProject"></project-detail-progress>
    </el-tab-pane>
    <el-tab-pane name="git" label="项目代码">
      <project-detail-git></project-detail-git>
    </el-tab-pane>
    <el-tab-pane name="member" label="项目成员">
      <project-detail-member></project-detail-member>
    </el-tab-pane>
    <el-tab-pane name="note" label="项目笔记">
      <project-detail-note></project-detail-note>
    </el-tab-pane>
    <el-tab-pane name="settings" label="项目管理" v-if="isLogin && project.leader._id === profile._id">
      <project-detail-settings></project-detail-settings>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import ProjectDetailIntro from '@/components/project/ProjectDetailIntro'
import ProjectDetailProgress from '@/components/project/ProjectDetailProgress'
import ProjectDetailGit from '@/components/project/ProjectDetailGit'
import ProjectDetailMember from '@/components/project/ProjectDetailMember'
import ProjectDetailNote from '@/components/project/ProjectDetailNote'
import ProjectDetailSettings from '@/components/project/ProjectDetailSettings'
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetail',
  components: {
    ProjectDetailIntro,
    ProjectDetailProgress,
    ProjectDetailGit,
    ProjectDetailMember,
    ProjectDetailNote,
    ProjectDetailSettings
  },
  data () {
    return {
      selectedTab: this.$route.params.tab || 'intro'
    }
  },
  computed: {
    ...mapGetters({
      isLoadingProject: 'project/isLoadingProject',
      project: 'project/project',
      profile: 'user/profile',
      isLogin: 'status/isLogin'
    })
  },
  created () {
    this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
  },
  destroyed () {
    this.$store.dispatch('project/initState')
  },
  methods: {
    handleClick: function ({name}) {
      this.$router.push(`/project/${this.project._id}/${name}`)
    }
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
