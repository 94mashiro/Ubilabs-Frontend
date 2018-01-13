<template>
  <el-container class="container">
    <el-container>
      <el-main>
        <toolbar></toolbar>
        <card-list v-loading="isLoadingList" element-loading-background="#ffffff"></card-list>
      </el-main>
    </el-container>
    <el-aside width="280px" v-if="displayMode==='question'">
      <el-main>
        <profile-card v-if="isLogin"></profile-card>
        <node-chooser></node-chooser>
      </el-main>
    </el-aside>
  </el-container>
</template>

<script>
import Toolbar from '@/components/forum/Toolbar'
import CardList from '@/components/forum/CardList'
import NodeChooser from '@/components/forum/NodeChooser'
import ProfileCard from '@/components/ProfileCard'
import { mapGetters } from 'vuex'
export default {
  name: 'forum',
  components: {
    Toolbar,
    CardList,
    NodeChooser,
    ProfileCard
  },
  computed: mapGetters({
    isLogin: 'status/isLogin',
    displayMode: 'forum/displayMode',
    questions: 'forum/questions',
    articles: 'forum/articles',
    isLoadingList: 'forum/isLoadingList'
  }),
  created () {
    this.$store.dispatch('forum/setDisplayMode', { displayMode: 'question' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 75px auto;
}
</style>

