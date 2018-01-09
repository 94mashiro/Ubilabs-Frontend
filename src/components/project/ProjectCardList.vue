<template>
<div class="project-cardlist-wrapper">
<div class="list-item" v-for="project in list" :key="project._id">
  <project-card :project="project"></project-card>
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
  }
}
</script>

<style lang="scss" scoped>

</style>

