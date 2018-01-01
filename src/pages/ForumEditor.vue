<template>
<div class="container">
  <card>
    <div class="editor-container">
      <el-form :model="editorForm">
        <el-form-item>
          <el-upload method="POST" class="editor-picture-uploader" action="/api/system/postPicture" name="file" :show-file-list="false" :on-success="handleUploadSuccess">
            <i class="el-icon-upload icon"></i>
            <div class="el-upload__text">点击上传题图</div>
            <i class="el-icon delete icon" style="display: none" @click="deleteImage"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="editor-title-input">
          <el-input v-model="editorForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item>
          <markdown-editor :configs="configs" class="forum-editor" v-model="editorForm.content.md"></markdown-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </card>
</div>
</template>

<script>
import Card from '@/components/Card'
import $ from 'jquery'
import { postArticle } from '@/store/api'
import { markdownEditorConfigs } from '@/utils/config'
export default {
  name: 'questionEditor',
  components: {
    Card
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
      // console.log(res, file, fileList)
      $('.editor-picture-uploader').css('background', `url("${res.url}") no-repeat center`)
      $('.el-upload__text').text('点击更换题图')
      this.editorForm.imageUrl = res.url
    },
    submitForm: function () {
      postArticle(this.editorForm)
        .then((body) => {
          if (body.success) {
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
    deleteImage: function () {
      console.log('delete it')
    }
  },
  created () {
    this.configs = markdownEditorConfigs
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
