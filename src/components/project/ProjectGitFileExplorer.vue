<template>
<div class="file-explorer-wrapper">
  <div class="explorer-meta">
    <div class="git-branch">
      <p>当前分支: <span>master</span></p>
    </div>
    <div class="git-path">
      <p>当前路径: <span>/{{path}}</span></p>
      <el-button class="back-btn" size="mini" type="danger" @click="goBack" v-if="path !== ''">上一层</el-button>
    </div>
  </div>
  <el-table :data="this.sortedFiles" :stripe="true" :show-header="false" class="file-list">
    <el-table-column label="name">
      <template slot-scope="scope">
        <span class="type-folder" @click="changePath(scope.row.path)" v-if="scope.row.type==='tree'"><icon class="icon" name="folder" scale="2"></icon>  {{scope.row.name}}</span>
        <a :href="getDownloadPath(scope.row.path)" target="_blank" v-if="scope.row.type==='blob'"><icon class="icon" name="file" scale="1.5"></icon>  {{scope.row.name}}</a>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'projectGitFileExplorer',
  data () {
    return {
      path: '',
      files: []
    }
  },
  props: ['repoId'],
  computed: {
    sortedFiles: function () {
      return this.files.slice(0).sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'tree' ? -1 : 1
        } else {
          return a.name < b.name ? -1 : 1
        }
      })
    }
  },
  methods: {
    getFiles: function () {
      return axios.get(`http://localhost:32774/api/v4/projects/${this.repoId}/repository/tree?path=${this.path}`)
        .then(res => {
          this.files = res.data
        })
    },
    changePath: async function (path) {
      this.path = path
      await this.getFiles()
    },
    goBack: function () {
      this.path = this.path.split('/').slice(0, -1).join('/')
      if (this.path === '') this.path = ''
      this.getFiles()
    },
    getDownloadPath: function (path) {
      return `http://localhost:32774/api/v4/projects/${this.repoId}/repository/files/${encodeURIComponent(path)}/raw?ref=master`
    }
  },
  watch: {
    repoId: function (newVal, oldVal) {
      this.path = ''
      this.getFiles()
    }
  },
  created () {
    if (this.repoId) {
      this.getFiles()
    }
  }
}
</script>

<style lang="scss" scoped>
.explorer-meta {
  margin: 5px 0 0 6px;
  font-size: 14px;
  span {
    font-weight: 600;
  }
  .git-branch, .git-path {
    margin-bottom: 10px;
  }
  .git-path {
    display: flex;
    align-items: center;
    height: 18px;
    .back-btn {
      margin-left: 8px;
      padding: 2px;
    }
  }
}
.file-list {
  a {
    text-decoration: none;
    color: #606266;
  }
  .type-folder:hover {
    cursor: pointer;
  }
}
.icon {
  vertical-align: middle;
}
</style>
