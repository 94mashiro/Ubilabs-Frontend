<template>
<div class="activity-detail-wrapper" v-loading="isActivityDetailLoading">
<activity-detail-header :activity="activity" v-if="!isActivityDetailLoading"></activity-detail-header>
<activity-detail-comment v-if="!isActivityDetailLoading"></activity-detail-comment>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityDetailHeader from '@/components/activity/ActivityDetailHeader'
import ActivityDetailComment from '@/components/activity/ActivityDetailComment'
export default {
  name: 'activityDetail',
  components: {
    ActivityDetailHeader,
    ActivityDetailComment
  },
  computed: mapGetters({
    isActivityDetailLoading: 'activity/isActivityDetailLoading',
    activity: 'activity/activity'
  }),
  created () {
    this.$store.dispatch('activity/getActivity', { activityId: this.$route.params.id })
  }
}
</script>

<style lang="scss" scoped>
.activity-detail-wrapper {
  width: 1000px;
  margin: 80px auto 0;
  min-height: 400px;
}
</style>
