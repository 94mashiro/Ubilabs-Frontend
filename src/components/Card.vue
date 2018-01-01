<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card'
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ddd;
  background: #fff;
  width: 100%;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
  box-sizing: border-box;
}
</style>
