<template>
  <el-card header="节点选择">
    <div class="question-nodes-wrapper" v-loading="isLoadingQuestionNodes">
      <div v-for="node in questionNodes" :key="node._id" class="node-wrapper">
        <el-button plain round size="small" class="very-small" :class="{'selected-node': node._id === displayNode}" @click="selectDisplayNode(node._id)">{{node.name}}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nodeChooser',
  computed: {
    questionNodes: {
      get: function () {
        const defaultNode = [{
          name: '最新',
          _id: ''
        }]
        return defaultNode.concat(this.$store.state.forum.questionNodes)
      }
    },
    ...mapGetters({
      displayNode: 'forum/displayNode',
      isLoadingQuestionNodes: 'forum/isLoadingQuestionNodes'
    })
  },
  methods: {
    selectDisplayNode (nodeId) {
      this.$store.dispatch('forum/setDisplayNode', { displayNode: nodeId })
    }
  },
  created () {
    this.$store.dispatch('forum/getQuestionNodes')
  }
}
</script>

<style lang="scss" scoped>

.question-nodes-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .selected-node {
    border-color: #409EFF;
    color: #409EFF;
    background: #fff;
  }

  .node-wrapper {
    margin: 0 5px 8px 0;
  }

  .very-small {
    padding: 4px 8px;
  }
}
</style>

