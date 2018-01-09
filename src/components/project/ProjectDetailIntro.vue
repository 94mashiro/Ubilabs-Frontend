<template>
  <div class="project-detail-intro-wrapper">
    <div class="project-carousel" v-if="project.imageUrls.length > 0">
      <el-carousel>
        <el-carousel-item v-for="url in project.imageUrls" :key="url" class="project-carousel-wrapper">
          <img :src="url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="project-title">
      <span>项目名称: {{project.title}}</span>
    </div>
    <div class="project-node">
      <span>选用技术: {{nodeString}}</span>
    </div>
    <div class="project-leader">
      <span>项目负责人: {{project.leader.name}}</span>
    </div>
    <div class="project-story">
      <span>项目故事版:</span>
      <div class="markdown-body" v-html="project.story.html" v-if="project.story"></div>
      <span v-if="!project.story">暂无</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'projectDetailIntro',
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
  }

  .project-title {
    margin-top: 20px;
  }

  .project-title, .project-node, .project-leader, .project-story {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
  }
}



</style>
