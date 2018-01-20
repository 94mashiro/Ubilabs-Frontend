<template>
<div class="project-card-wrapper">
  <el-card :body-style="{padding: '0'}">
    <div class="card-container">
      <div class="project-image" v-if="project.imageUrls[0]">
        <img :src="project.imageUrls[0]" alt="">
      </div>
      <div class="project-meta">
        <div class="meta-top">
          <div class="project-title">
            <router-link :to="projectUrl">{{project.title}}</router-link>
          </div>
          <div class="project-description">
            <span>{{project.description}}</span>
          </div>
        </div>
        <div class="meta-bottom">
          <div class="project-leader">
            <span>发起者: {{project.leader.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'projectCard',
  props: ['project'],
  computed: {
    projectUrl: function () {
      return `/project/${this.project._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card-wrapper {
  margin-bottom: 20px;

  .card-container {
    display: flex;
    min-height: 150px;


    .project-image {
      width: 180px;
      height: 180px;
      overflow: hidden;
      img {
        min-width: 100%;
        height: 100%;
      }
    }

    .project-meta {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 25px;


      .project-title {
        font-size: 30px;
        font-weight: 600;
        a {
          text-decoration: none;
          color: #000;
        }
      }

      .project-description {
        color: #555;
        margin-top: 10px;
      }

      .project-leader {
        font-size: 14px;
      }
    }
  }
}
</style>
