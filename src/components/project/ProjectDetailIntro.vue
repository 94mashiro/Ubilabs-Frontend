<template>
  <div class="project-detail-intro-wrapper">
    <div class="project-carousel" v-if="project.imageUrls.length > 0">
      <el-carousel type="card">
        <el-carousel-item v-for="url in project.imageUrls" :key="url" class="project-carousel-wrapper">
          <img :src="url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="project-collapse-wrapper">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="title">
          <div slot="title" class="collapse-title">项目名称</div>
          <span>{{project.title}}</span>
        </el-collapse-item>
        <el-collapse-item name="node">
          <div slot="title" class="collapse-title">选用技术</div>
          <el-tag v-for="node in project.node" :key="node._id" size="small" class="node-tag"><span>{{node.name}}</span></el-tag>
        </el-collapse-item>
        <el-collapse-item name="codelab">
          <div slot="title" class="collapse-title">Codelab</div>
          <ul>
            <li v-for="codelab in project.codelab" :key="codelab._id"><a class="codelab-url" target="_blank" :href="getCodelabUrl(codelab)">{{codelab.title}}</a></li>
          </ul>
        </el-collapse-item>
        <el-collapse-item name="leader">
          <div slot="title" class="collapse-title">项目负责人</div>
          <avatar :src="project.leader.avatar" :username="project.leader.name"></avatar>
          <span>{{project.leader.name}}</span>
        </el-collapse-item>
        <el-collapse-item name="story">
          <div slot="title" class="collapse-title">项目故事版</div>
          <div class="markdown-body project-story-markdown" v-html="project.story.html" v-if="project.story"></div>
          <span v-if="!project.story">暂无</span>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'
export default {
  name: 'projectDetailIntro',
  components: {
    Avatar
  },
  methods: {
    getCodelabUrl: function (codelab) {
      return `http://bs.mashiro.wang:3000/gitbook/${codelab._id}`
    }
  },
  computed: {
    ...mapGetters({
      project: 'project/project'
    }),
    nodeString: function () {
      if (this.project.node.length > 0) {
        const nodes = []
        this.project.node.forEach(node => {
          nodes.push(node.name)
        })
        let nodeString = nodes.join('、')
        return nodeString.substring(0, nodeString.length)
      }
      return '暂无填写'
    }
  },
  data () {
    return {
      activeNames: ['title', 'node', 'leader', 'story', 'codelab']
    }
  }
}
</script>

<style lang="scss" scoped>
.project-detail-intro-wrapper {
  display: flex;
  flex-direction: column;

  .project-carousel-wrapper {
    display: flex;
    justify-content: center;

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .project-collapse-wrapper {
    padding-top: 20px;
    width: 800px;
    margin: 0 auto;
    span {
       font-size: 14px;
    }
  }

  .project-title {
    margin-top: 20px;
  }

  .node-tag {
    margin-right: 10px;
  }

  .collapse-title {
    font-size: 18px;
    font-weight: 600;
  }

  .project-title, .project-node, .project-leader, .project-story {
    font-size: 14px;
    margin-bottom: 15px;
    color: #333;
  }

  .project-story-markdown {
    font-size: 14px;
    width: 90%;
    margin: 10px auto 0;
  }

  .codelab-url {
    font-size: 14px;
    color: #333;
    text-decoration: none;
  }
}



</style>
