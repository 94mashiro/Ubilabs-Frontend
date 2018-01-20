<template>
<div class="codelab-card-wrapper">
  <el-card>
    <div class="card-flex-wrapper">
      <div class="codelab-title">
        <a :href="gitbookUrl" target="_blank">{{title}}</a>
        <el-button type="text" style="padding: 0" v-if="isLogin && codelab.author._id === profile._id" @click="showModifyDialog">管理</el-button>
      </div>
      <div class="codelab-node">
        <span>{{codelab.node.name}}</span>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'codelabsCard',
  props: ['codelab'],
  computed: {
    gitbookUrl: function () {
      return `http://localhost:3000/gitbook/${this.codelab._id}`
    },
    title: function () {
      return `《${this.codelab.title}》`
    },
    ...mapGetters({
      isLogin: 'status/isLogin',
      profile: 'user/profile'
    })
  },
  methods: {
    showModifyDialog: async function () {
      await this.$store.dispatch('codelabs/setSelectedCodelab', { selectedCodelab: {...this.codelab} })
      await this.$store.dispatch('codelabs/setIsCreateDialogVisible', { isCreateDialogVisible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-flex-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .codelab-title {
    font-size: 20px;
    font-weight: 600;
    a {
      text-decoration: none;
      color: #000;
    }
  }
  .codelab-node {
    span {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
