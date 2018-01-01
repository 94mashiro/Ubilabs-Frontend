<template>
<div class="activity-detail-header-wrapper">
  <div class="header-carousel">
    <el-carousel trigger="click" width="500px">
      <el-carousel-item v-for="imageUrl in activity.imageUrls" :key="imageUrl">
        <div class="carousel-image-hover">
          <img :src="imageUrl" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="activity-title">
    <h1>{{activity.title}}</h1>
  </div>
  <div class="activity-date">
    <span>{{startTime}}</span>
  </div>
  <div class="activity-description markdown-body" v-html="activity.content.html">
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'activityDetailHeader',
  props: ['activity'],
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    startTime: function () {
      moment.locale('zh-cn')
      return moment(this.activity.startDate).format('LL')
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-detail-header-wrapper {
  margin-top: 100px;

  .carousel-image-hover {
    background: #aaa;
    display: flex;
    justify-content: center;
  }

  .activity-title {
    margin-top: 50px;
    font-size: 30px;
    font-weight: 600;
  }

  .activity-date {
    font-size: 20px;
    color: #999;
    margin-top: 20px;
  }

  .activity-description {
    margin-top: 20px;
  }
}
</style>
