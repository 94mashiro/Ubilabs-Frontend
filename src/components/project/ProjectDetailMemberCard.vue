<template>
<div class="project-member-wrapper">
  <author-info :author="member"></author-info>
  <div :id="'chart-'+this.member._id.substring(0, 5)"></div>
</div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import CalendarHeatMap from 'calendar-heatmap-mini'
export default {
  name: 'projectDetailMemberCard',
  props: ['isLeader', 'member'],
  components: {
    AuthorInfo
  },
  mounted () {
    const chartData = [{
      date: new Date(),
      count: 100
    }]
    const chart = CalendarHeatMap()
              .data(chartData)
              .selector(`#chart-${this.member._id.substring(0, 5)}`)
              .colorRange(['#D8E6E7', '#218380'])
              .tooltipEnabled(true)
              .legendEnabled(false)
    chart()
  }
}
</script>

<style lang="scss" scoped>
@import '~calendar-heatmap-mini/src/calendar-heatmap-mini.css';
.project-member-wrapper {
  margin-bottom: 10px;
}
</style>

