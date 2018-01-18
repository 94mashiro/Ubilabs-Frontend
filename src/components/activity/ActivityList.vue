<template>
<el-row class="activity-list-wrapper">
  <el-col :span="6" :offset="(index % 3) > 0 ? 3 : 0" class="activity-item" v-for="(activity, index) in filteredList" :key="activity._id" v-if="filteredList.length > 0">
    <activity-card :activity="activity"></activity-card>
  </el-col>
  <el-col :span="12" :offset="9" class="no-activity" v-if="filteredList.length === 0">
    <span>Sorry, 暂时还没有活动</span>
  </el-col>
</el-row>
</template>

<script>
import ActivityCard from './ActivityCard'
import { mapGetters } from 'vuex'
import dateToday from '@date/today'
export default {
  name: 'activityList',
  props: ['activities'],
  computed: {
    ...mapGetters({
      filterMode: 'activity/filterMode'
    }),
    filteredList: function () {
      if (this.filterMode === 'all') {
        return this.activities
      } else if (this.filterMode === 'now') {
        return this.activities.filter(activity => dateToday.isToday(new Date(activity.startDate)))
      } else if (this.filterMode === 'before') {
        return this.activities.filter(activity => dateToday.isBeforeToday(new Date(activity.startDate)))
      } else if (this.filterMode === 'after') {
        return this.activities.filter(activity => dateToday.isAfterToday(new Date(activity.startDate)))
      } else {
        return this.activities
      }
    }
  },
  components: {
    ActivityCard
  }
}
</script>

<style lang="scss" scoped>
.activity-item {
  margin-bottom: 20px;
}
.no-activity{
  margin-top: 40px;

  span {
    font-size: 18px;
  }
}
</style>
