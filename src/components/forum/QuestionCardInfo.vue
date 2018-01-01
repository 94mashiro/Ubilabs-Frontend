<template>
<div class="question-info">
  <div class="question-node">
    <span class="question-node-item">
      来自主题: {{ question.node.name }}
    </span>
  </div>
  <div class="question-title">
    <h2 class="question-title-item">
      <router-link :to="question.url">
        {{ question.title }}
      </router-link>
    </h2>
  </div>
  <div class="question-author">
    <span class="authorInfo-avatar">
      <img class="round" :src="question.author.avatar" alt="" width="24" height="24">
    </span>
    <div class="authorInfo-content">
      <div class="authorInfo-name">
        {{ question.author.name }}
      </div>
      <div class="authorInfo-description">
        {{ question.author.description }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'answerCardInfo',
  props: ['question']
}
</script>

<style lang="scss" scoped>
.question-info {
  .question-node {
    margin-bottom: 10px;
    .question-node-item {
      color: #8590a6;
      font-size: 14px;
    }
  }
  .question-title {
    margin-bottom: 10px;
    .question-title-item {
      font-size: 20px;
      font-weight: 600;
      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
  .question-author {
    display: flex;
    // line-height: 24px;
    align-items: center;
    .authorInfo-avatar {
      .round {
        border-radius: 4px;
      }
    }
    .authorInfo-content {
      display: flex;
      align-items: flex-end;
      margin-left: 10px;
      color: #555;
      .authorInfo-name {
        font-size: 16px;
        font-weight: 600;
      }
      .authorInfo-description {
        &::before {
          content: "\FF0C";
        }
        font-size: 14px;
        font-weight: 400px;
      }
    }
  }
}
</style>



