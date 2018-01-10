<template>
<div class="project-detail-git-wrapper">
<div class="git-sshlink" v-if="isLogin && isProjectMemeber">
  <el-alert type="info" title="SSH链接" :description="project.gitSSH" show-icon :closable="false" v-if="profile.gitlabSSHKey"></el-alert>
  <el-alert type="error" title="SSH链接" show-icon :closable="false" v-if="!profile.gitlabSSHKey">
    <p class="el-alert__description">
      您需要在<router-link to="/setting" class="nav-link">个人设置</router-link>中绑定<router-link to="/setting" class="nav-link">SSH Key</router-link>之后才能查看项目的SSH链接。
    </p>
  </el-alert>
</div>
<project-git-file-explorer :repoId="project.gitId"></project-git-file-explorer>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectGitFileExplorer from './ProjectGitFileExplorer'
export default {
  name: 'projectDetailGit',
  computed: {
    ...mapGetters({
      project: 'project/project',
      profile: 'user/profile',
      isLogin: 'status/isLogin'
    }),
    isProjectMemeber: function () {
      if (this.profile) {
        if (this.profile._id === this.project.leader._id) {
          return true
        } else {
          for (let member of this.project.member) {
            if (this.profile._id === member._id) {
              return true
            }
          }
          return false
        }
      } else {
        return false
      }
    }
  },
  components: {
    ProjectGitFileExplorer
  }
}
</script>

<style lang="scss" scoped>
.git-sshlink {
  width: 600px;
  margin: 10px auto;
}
.nav-link {
  margin: 0 2px;
  text-decoration: none;
  color: #303133;
  font-weight: 600;
}
</style>
