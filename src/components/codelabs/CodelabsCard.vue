<template>
<div class="codelab-card-wrapper">
  <el-card>
    <div class="card-flex-wrapper">
      <div class="codelab-title">
        <a :href="gitbookUrl" target="_blank">{{title}}</a>
      </div>
      <div class="codelab-node">
        <span>{{codelab.node.name}}</span>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'codelabsCard',
  props: ['codelab'],
  computed: {
    gitbookUrl: function () {
      return `http://localhost:3000/gitbook/${this.codelab._id}`
    },
    title: function () {
      return `《${this.codelab.title}》`
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
    // &:before {
    //   content: "《";
    // }
    // &:after {
    //   content: "》";
    // }
  }
  .codelab-node {
    span {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
