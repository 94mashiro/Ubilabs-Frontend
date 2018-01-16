<template>
<div class="project-detail-progress-wrapper">
  <div class="progress-header-wrapper">
    <el-steps :active="1+finishedMilestone.length" finish-status="success" align-center>
      <el-step title="项目启动" class="tooltip-name"></el-step>
      <el-step v-for="milestone in project.milestones" :key="milestone._id">
        <div slot="title">
          <el-tooltip>
            <div slot="content">{{milestone.description}}</div>
            <span class="tooltip-name">{{milestone.name}}</span>
          </el-tooltip>
        </div>
        <div slot="description">
          <!-- <span>{{milestone.description}}</span> -->
          <!-- <br> -->
          <span v-if="!milestone.isFinished">预计日期: {{getI18nDate(milestone.deadline)}}</span>
          <span v-if="milestone.isFinished">完成日期: {{getI18nDate(milestone.finishedDate)}}</span>
        </div>
      </el-step>
      <el-step title="项目结束" class="tooltip-name"></el-step>
    </el-steps>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'projectDetailProgress',
  computed: {
    ...mapGetters({
      project: 'project/project'
    }),
    finishedMilestone: function () {
      return this.project.milestones.filter(milestone => {
        return milestone.isFinished
      })
    }
  },
  methods: {
    getI18nDate: function (date) {
      moment.locale('zh-cn')
      return moment(date).format('LL')
    }
  }
}
</script>

<style lang="scss" scoped>
.project-detail-progress-wrapper {
  padding: 20px;
}
.tooltip-name {
  user-select: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
