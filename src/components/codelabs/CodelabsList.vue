<template>
<div class="codelabs-list-wrapper">
  <div class="list-item" v-for="codelab in list.results" :key="codelab._id">
    <codelabs-card :codelab="codelab"></codelabs-card>
  </div>
  <el-card :body-style="{padding: 0}" class="list-pagination">
    <el-pagination layout="prev, pager, next" :total="list.total" @current-change="changePage"></el-pagination>
  </el-card>
</div>
</template>

<script>
import CodelabsCard from './CodelabsCard'
export default {
  name: 'codelabsList',
  components: {
    CodelabsCard
  },
  props: ['list'],
  methods: {
    changePage: function (page) {
      this.$store.dispatch('codelabs/getCodelabs', { paginate: true, page })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-pagination {
  margin-top: 20px;
}
</style>
