<template>
<div class="project-member-wrapper">
  <author-info :author="member"></author-info>
  <div :id="'chart-'+this.member._id.substring(0, 5)"></div>
</div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import CalendarHeatMap from 'calendar-heatmap-mini'
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetailMemberCard',
  props: ['isLeader', 'member'],
  components: {
    AuthorInfo
  },
  computed: {
    ...mapGetters({
      projectNotes: 'project/projectNotes'
    }),
    notes: function () {
      return this.projectNotes.filter(note => note.author._id === this.member._id)
    },
    chartData: function () {
      const table = {}
      const array = []
      this.notes.forEach(note => {
        const countDate = new Date(note.createdAt)
        const date = `${countDate.getFullYear()}-${countDate.getMonth() + 1}-${countDate.getDate()}`
        if (!table.date) {
          const insideObj = {
            date: new Date(date),
            count: 1
          }
          table[date] = insideObj
        } else {
          table[date].count ++
        }
      })
      for (let key in table) {
        array.push(table[key])
      }
      return array
    }
  },
  mounted () {
    if (this.chartData) {
      const chart = CalendarHeatMap()
              .data(this.chartData)
              .selector(`#chart-${this.member._id.substring(0, 5)}`)
              .colorRange(['#D8E6E7', '#218380'])
              .tooltipEnabled(true)
              .legendEnabled(false)
      chart()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~calendar-heatmap-mini/src/calendar-heatmap-mini.css';
.project-member-wrapper {
  margin-bottom: 10px;
}
</style>

