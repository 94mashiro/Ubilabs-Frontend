<template>
<div class="codelabs-list-wrapper">
  <div class="list-item" v-for="codelab in list" :key="codelab._id">
    <codelabs-card :codelab="codelab"></codelabs-card>
  </div>
</div>
</template>

<script>
import CodelabsCard from './CodelabsCard'
export default {
  name: 'codelabsList',
  components: {
    CodelabsCard
  },
  props: ['list']
}
</script>

<style lang="scss" scoped>

</style>
