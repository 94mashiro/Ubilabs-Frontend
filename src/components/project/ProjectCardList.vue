<template>
<div class="project-cardlist-wrapper">
  <el-card v-if="!list || !list.results.length">
    暂无数据
  </el-card>
  <div class="list-item" v-for="project in list.results" :key="project._id" v-if="list && list.results.length">
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
    changePage: function (page) {
      this.$store.dispatch('project/getProjects', { page })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-pagination {
  margin-top: 20px;
}
</style>

