<template>
<div class="container">
  <card>
    <div class="editor-container">
      <el-form :model="isModifyArticle ? selectedArticle : editorForm">
        <el-form-item class="editor-title-input">
          <el-input v-model="editorForm.title" placeholder="请输入标题" v-if="!isModifyArticle"></el-input>
          <el-input v-model="selectedArticle.title" placeholder="请输入标题" v-if="isModifyArticle"></el-input>
        </el-form-item>
        <el-form-item>
          <markdown-editor :configs="configs" class="forum-editor" v-model="editorForm.content.md" v-if="!isModifyArticle"></markdown-editor>
          <markdown-editor :configs="configs" class="forum-editor" v-model="selectedArticle.content.md" v-if="isModifyArticle"></markdown-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" v-if="!isModifyArticle">发布</el-button>
          <el-button type="primary" @click="submitEditForm" v-if="isModifyArticle">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </card>
</div>
</template>

<script>
import Card from '@/components/Card'
import $ from 'jquery'
import { postArticle, updateArticle } from '@/store/api'
import { markdownEditorConfigs } from '@/utils/config'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  name: 'questionEditor',
  components: {
    Card
  },
  computed: {
    ...mapGetters({
      selectedArticle: 'article/selectedArticle',
      profile: 'user/profile'
    }),
    'selectedArticle.title': {
      get: function () {
        return this.$store.state.article.selectedArticle.title
      },
      set: function (newValue) {
        this.$store.commit(`article/${types.ARTICLE_UPDATE_TITLE}`, newValue)
      }
    },
    'selectedArticle.content.md': {
      get: function () {
        return this.$store.state.article.selectedArticle.content.md
      },
      set: function (newValue) {
        this.$store.commit(`article/${types.ARTICLE_UPDATE_CONTENT}`, newValue)
      }
    },
    'isModifyArticle': function () {
      return JSON.stringify(this.selectedArticle) !== '{}'
    }
  },
  data () {
    return {
      editorForm: {
        imageUrl: '',
        title: '',
        content: {
          md: ''
        }
      },
      configs: {}
    }
  },
  methods: {
    handleUploadSuccess: function (res, file, fileList) {
      $('.editor-picture-uploader').css('background', `url("${res.url}") no-repeat center`)
      $('.el-upload__text').text('点击更换题图')
      this.editorForm.imageUrl = res.url
    },
    submitForm: function () {
      postArticle(this.editorForm)
        .then((body) => {
          if (body.success) {
            const newArticleCount = this.profile.articleCount + 1
            this.$store.dispatch('user/setArticleCount', { articleCount: newArticleCount })
            this.$message.success({
              message: '发表成功',
              duration: 1500
            })
            this.$router.push(`/forum/article/${body.articleId}`)
          } else {
            this.$message.error({
              message: body.message,
              duration: 1500
            })
          }
        })
    },
    submitEditForm: async function () {
      try {
        const body = await updateArticle(this.selectedArticle)
        if (!body.success) {
          throw body.message
        } else {
          this.$notify.success('文章修改成功。')
          this.$router.push(`/forum/article/${this.selectedArticle._id}`)
        }
      } catch (err) {
        this.$notify.error(err)
      }
    }
  },
  created () {
    this.configs = markdownEditorConfigs
  },
  destroyed () {
    this.$store.dispatch('article/setSelectedArticle', { selectedArticle: {} })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 86px auto 25px auto;;
}

.forum-editor {
  line-height: 1;
}

.editor-container {
  padding: 20px;
  .editor-title {
    text-align: center;
    margin-top: 40px;
    font-size: 24px;
  }
  .editor-subtitle {
    text-align: center;
  }
}

.editor-picture-uploader {
  text-align: center;
  background: #f7f8f9;
  border-radius: 8px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  color: #818b95;

  .el-upload__text {
    font-size: 20px;
  }

  .icon {
    font-size: 40px;
  }
}

.editor-title-input {
  margin-bottom: 0;
  transform: translateY(2px);
}
</style>
