<template>
<div class="content-wrapper" :class="{'is-collapsed': isCollapsed}">
  <div class="content-inner" @click="isCollapsed && switchCollapse()">
    <span class="content-text" v-if="isCollapsed">{{ collapsedContent }}</span>
    <span v-html="question.content.html" v-if="!isCollapsed" style="line-height: 1.6"></span>
    <el-button type="text" v-if="isCollapsed" @click="switchCollapse" class="collapsed-button button-plain">
       阅读全文
      <icon name="readmore">阅读全文</icon>
    </el-button>
  </div>
  <div class="question-actions">
    <button class="button-plain question-actions-item"><span><icon class="icon" name="star" :scale="2"></icon>关注问题</span></button>
    <button class="button-plain question-actions-item" @click="navigateQuestion()"><span><icon class="icon" name="reply" :scale="1.7"></icon>{{question.answers}}条回答</span></button>
    <button class="button-plain question-actions-item"><span><icon class="icon" name="police" :scale="2"></icon>举报</span></button>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'answerCardContent',
  props: ['question'],
  data () {
    return {
      isCollapsed: true
    }
  },
  computed: {
    buttonText: function () {
      return this.isCollapsed ? '阅读全文' : '折叠'
    },
    collapsedContent: function () {
      const maxLength = 100
      const htmlText = $(this.question.content.html).text()
      const contentLength = htmlText.length
      return contentLength > maxLength ? htmlText.substring(0, maxLength) + '...' : htmlText.substring(0, contentLength * 0.9) + '...'
    }
  },
  methods: {
    switchCollapse () {
      this.isCollapsed = !this.isCollapsed
    },
    navigateQuestion () {
      this.$router.push(this.question.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin-top: 15px;
  width: 100%;
  word-break: break-word;
  * {
    font-weight: 400;
  }
  .collapsed-button {
    font-size: 16px;
    margin-left: 5px;
    line-height: 1.5;
    color: #13227a;
  }
}

.is-collapsed > .content-inner:hover {
  cursor: pointer;
  color: #666;
}

.question-actions {
  margin-top: 20px;
  display: flex;
}

.question-actions-item {
  margin-right: 20px;
}

.icon {
  margin-right: 3px;
}

.content-text {
  line-height: 1.5;
}

.button-plain {
  border: 0;
  padding: 0;
  color: #8590a6;
  background: #fff;
  span {
    font-size: 15px;
    font-weight: 600;
  }
  &:active, &:focus {
    outline: none;
  }
  &:hover {
    color: #666;
  }
}
</style>

