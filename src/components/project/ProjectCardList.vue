<template>
<div class="project-cardlist-wrapper">
<div class="list-item" v-for="project in list.results" :key="project._id">
  <project-card :project="project"></project-card>
</div>
<div class="list-pagination">
  <el-card :body-style="{padding: 0}">
    <el-pagination layout="prev, pager, next" :total="list.total" @current-change="changePage"></el-pagination>
  </el-card>
</div>
</div>
</template>

<script>
import ProjectCard from './ProjectCard'
export default {
  name: 'projectCardList',
  props: ['list'],
  components: {
    ProjectCard
  },
  methods: {
    changePage: function () {
      console.log('cp')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

