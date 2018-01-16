<template>
  <div class="author-info-wrapper">
    <span class="author-avatar">
      <img class="author-avatar-wrapper" :src="display.avatar" :alt="display.name" :width="avatarSize" :height="avatarSize">
    </span>
    <div class="author-info">
      <div class="author-info-head">
        <!-- <span>{{display.name}}</span> -->
        <router-link :to="display.url">{{display.name}}</router-link>
      </div>
      <div class="author-info-detail" v-if="!this.mini && display.description">
        <span>{{display.description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'authorInfo',
  props: {
    author: {
      type: Object
    },
    mini: {
      type: Boolean,
      default: false
    },
    avatarSize: {
      type: Number,
      default: 38
    }
  },
  data () {
    return {
      display: {
        name: '',
        description: '',
        avatar: '',
        url: ''
      }
    }
  },
  computed: mapGetters({
    profile: 'user/profile'
  }),
  created () {
    if (!this.author) {
      this.display.name = this.profile.name
      this.display.description = this.profile.description
      this.display.avatar = this.profile.avatar
      this.display.url = `/profile/${this.profile._id}`
    } else {
      this.display.name = this.author.name
      this.display.description = this.author.description
      this.display.avatar = this.author.avatar
      this.display.url = `/profile/${this.author._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.author-info-wrapper {
  display: flex;
}

.author-avatar-wrapper {
  background: #fff;
  border-radius: 5px;
}

.answer-editor-header {
  display: flex;
  margin-top: 10px;
  align-items: center;
}
.author-info {
  margin-left: 10px;
  line-height: 1.4;
  .author-info-head a {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    text-decoration: none;
  }
  .author-info-detail {
    font-size: 14px;
  }
}
</style>

