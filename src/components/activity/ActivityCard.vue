<template>
<div>
  <el-card :body-style="cardStyle">
    <div class="card-image">
      <img :src="activity.imageUrls[0]">
    </div>
    <div class="card-content">
      <div class="activity-title">
        <router-link :to="activityUrl">{{activity.title}}</router-link>
      </div>
      <div class="activity-time">
        <span>活动时间: {{startTime}}</span>
      </div>
      <div class="activity-node">
        <span>{{activity.node.name}}</span>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'activityCard',
  props: ['activity'],
  computed: {
    activityUrl: function () {
      return `/activity/${this.activity._id}`
    },
    startTime: function () {
      moment.locale('zh-cn')
      return moment(this.activity.startDate).format('LL')
    }
  },
  data () {
    return {
      cardStyle: {
        padding: '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-image {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.card-content {
  padding: 15px;

  .activity-title {
    font-size: 20px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    a {
      text-decoration: none;
      color: #000;
    }
  }

  .activity-time {
    margin-top: 5px;
    color: #999;
    font-size: 15px;
  }

  .activity-node {
    margin-top: 20px;
    color: #999;
    font-size: 14px;
    text-align: right;
  }
}
</style>
