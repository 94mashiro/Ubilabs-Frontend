<template>
  <div class="activity-comment-wrapper">
    <div class="comment-list-header">
      <span class="list-toolbar">
        <span class="comment-count">{{comments.length}}条评论</span>
      </span>
      <span class="header-line"></span>
    </div>
    <div class="comment-list">
      <div class="comment-item" v-for="(comment, idx) in comments" :key="comment._id" >
        <div class="comment-meta">
          <author-info :author="comment.author"></author-info>
          <div class="comment-floor">
            {{`#${idx+1}`}}
          </div>
        </div>
        <div class="comment-content markdown-body" v-html="comment.content.html"></div>
      </div>
    </div>
    <div class="comment-editor-wrapper" v-if="isLogin">
      <el-input type="textarea" resize="none" v-model="postBody.content.md" placeholder="请输入评论内容"></el-input>
      <el-button type="primary" class="submit-btn" @click="submitForm">发表评论</el-button>
    </div>
  </div>
</template>

<script>
import AuthorInfo from '@/components/forum/AuthorInfo'
import { mapGetters } from 'vuex'
import { postComment } from '@/store/api'
export default {
  name: 'activityDetailComment',
  components: {
    AuthorInfo
  },
  data () {
    return {
      postBody: {
        activity: this.$route.params.id,
        content: {
          md: ''
        }
      }
    }
  },
  computed: mapGetters({
    'comments': 'activity/comments',
    'isLogin': 'status/isLogin'
  }),
  methods: {
    submitForm () {
      postComment(this.postBody).then(body => {
        if (body.success) {
          this.$message.success('评论发表成功')
          this.postBody.content.md = ''
          this.$store.dispatch('activity/getActivity', { activityId: this.$route.params.id })
        } else {
          this.$message.error(`评论发表失败: ${body.message}`)
        }
      }).catch(err => {
        this.$message.error(`评论发表失败: ${err}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-comment-wrapper {
  margin: 50px 0;
}
.comment-list-header {
  position: relative;
  margin-bottom: 20px;
}
.comment-item {
  margin-bottom: 10px;
}
.comment-item:not(:last-child) {
  padding-bottom: 10px;
  border-bottom: 1px solid #e3e6ee;
}
.comment-meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .comment-floor {
    font-size: 16px;
    font-weight: 600;
    line-height: 50px;
  }
}
.comment-content {
  // margin-top: 5px;
  font-size: 14px;
}
.list-toolbar {
  position: relative;
  z-index: 2;
  background: #fff;
  padding-right: 15px;
  font-weight: 600;
}
.header-line {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  color: #f0f0f0;
  background: #f0f0f0;
  z-index: 1;
}
.comment-editor-wrapper {
  display: flex;
  flex-direction: row;

  .submit-btn {
    margin-left: 15px;
  }
}
</style>

