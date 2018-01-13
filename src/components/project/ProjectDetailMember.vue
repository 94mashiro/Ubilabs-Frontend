<template>
  <div class="project-detail-member-wrapper">
    <project-detail-add-member-dialog></project-detail-add-member-dialog>
    <div class="project-leader-toolbar">
      <div class="member-rank"><icon name="people_fill" :scale="2" class="icon"></icon>项目负责人</div>
    </div>
    <project-detail-member-card :isLeader="true" :member="project.leader"></project-detail-member-card>
    <div class="project-member-toolbar">
      <div class="member-rank"><icon name="group_fill" :scale="2" class="icon"></icon>项目组成员</div>
    </div>
    <div v-for="member in project.member" :key="member._id">
      <project-detail-member-card :isLeader="false" :member="member"></project-detail-member-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectDetailMemberCard from './ProjectDetailMemberCard'
import ProjectDetailAddMemberDialog from './ProjectDetailAddMemberDialog'
export default {
  name: 'projectDetailMember',
  components: {
    ProjectDetailMemberCard,
    ProjectDetailAddMemberDialog
  },
  computed: {
    ...mapGetters({
      isLogin: 'status/isLogin',
      project: 'project/project',
      profile: 'user/profile'
    }),
    isAddMemberDialogVisible: {
      get: function () {
        return this.$store.state.project.isAddMemberDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('project/setIsAddMemberDialogVisible', { isAddMemberDialogVisible: newValue })
      }
    }
  },
  methods: {
    showAddMemberDialog: function () {
      this.isAddMemberDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.member-rank {
  width: 105px;
  background: #f5f7fa;
  padding: 8px 15px;
  border-radius: 5px;
  border: 1px solid #d2d5d8;
  color: #909399;
}
.icon {
  margin-right: 3px;
  vertical-align: bottom;
}
.project-member-toolbar {
  margin-bottom: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.project-leader-toolbar {
  margin-bottom: 20px;
}
</style>
