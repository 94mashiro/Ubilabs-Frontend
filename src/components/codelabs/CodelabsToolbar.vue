<template>
<div class="codelabs-toolbar-container">
  <el-card>
    <div class="toolbar-items-wrapper">
      <el-select v-model="aaa" placeholder="">
        <el-option v-for="aa in aaa" :key="aa.a"></el-option>
      </el-select>
      <el-button type="primary">发布文档</el-button>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'codelabsToolbar'
}
</script>

<style lang="scss">
.toolbar-items-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

