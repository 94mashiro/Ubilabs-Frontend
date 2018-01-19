<template>
<div class="project-detail-progress-wrapper">
  <div class="progress-header-wrapper">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="progress">
        <div slot="title" class="collapse-title">进度条</div>
        <el-steps :active="finishedMilestone.length" finish-status="success" align-center v-if="sortedMilestone.length">
          <el-step v-for="milestone in sortedMilestone" :key="milestone._id">
            <div slot="title">
              <el-tooltip>
                <div slot="content">{{milestone.description}}</div>
                <span class="tooltip-name">{{milestone.name}}</span>
              </el-tooltip>
            </div>
            <div slot="description">
              <span v-if="!milestone.isFinished">预计日期: {{getI18nDate(milestone.deadline)}}</span>
              <span v-if="milestone.isFinished">完成日期: {{getI18nDate(milestone.finishDate)}}</span>
            </div>
          </el-step>
        </el-steps>
        <div v-if="!sortedMilestone.length">暂无里程碑</div>
      </el-collapse-item>
      <el-collapse-item name="table">
        <div slot="title" class="collapse-title">里程碑详情</div>
        <el-table :data="project.milestones">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="名称" prop="name" width="180"></el-table-column>
          <el-table-column label="简述" prop="description" width="380"></el-table-column>
          <el-table-column label="计划完成日期" width="160">
            <template slot-scope="scope">
              <span>{{getI18nDate(scope.row.deadline)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="实际完成日期" width="160">
            <template slot-scope="scope">
              <span>{{getI18nDate(scope.row.finishDate)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="chart" title="进度图表" v-if="sortedMilestone.length > 0">
        <div id="milestone-chart" style="height:400px;width:800px;"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import echarts from 'echarts'
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
    },
    unfinishedMilestone: function () {
      return this.project.milestones.filter(milestone => {
        return !milestone.isFinished
      })
    },
    sortedMilestone: function () {
      const finishedMilestone = [].concat(this.finishedMilestone)
      const unfinishedMilestone = [].concat(this.unfinishedMilestone)
      finishedMilestone.sort((a, b) => {
        return new Date(a.finishDate) - new Date(b.finishDate)
      })
      unfinishedMilestone.sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline)
      })
      return finishedMilestone.concat(unfinishedMilestone)
    }
  },
  data () {
    return {
      myChart: {},
      activeNames: ['progress', 'table', 'chart'],
      chartOptions: {
        dataset: {
          source: []
        },
        xAxis: {type: 'category'},
        yAxis: {type: 'time'},
        series: [
          {type: 'line'},
          {type: 'line'}
        ]
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('milestone-chart'))
    if (this.project.chartOptions.length > 0) {
      this.myChart.setOption({
        dataset: {
          source: this.project.chartOptions
        },
        xAxis: {type: 'category'},
        yAxis: {type: 'time'},
        series: [
          {type: 'line'},
          {type: 'line'}
        ]
      })
    }
  },
  methods: {
    getI18nDate: function (date) {
      moment.locale('zh-cn')
      return date === (undefined || null) ? '暂未完成' : moment(date).format('LL')
    },
    getChartDateFormat: function (date) {
      const dateObject = new Date(date)
      return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`
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
