import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  profile: {
    __v: '',
    _id: '',
    articleCount: 0,
    avatar: '',
    createdAt: '',
    description: '',
    email: '',
    gitlabId: '',
    gitlabSSHKey: '',
    gitlabToken: '',
    isAdmin: false,
    name: '',
    projectCount: 0,
    questionCount: 0,
    following: [],
    follower: []
  }
}

const getters = {
  profile: state => state.profile
}

const actions = {
  getUserProfile: ({ commit, dispatch }) => {
    commit(`status/${types.SET_ISLOADING}`, { isLoading: true }, { root: true })
    api.getUserProfile().then(profile => {
      commit(types.CHECK_USERPROFILE, { profile })
      dispatch('getFollowing', { userId: profile._id })
      dispatch('getFollower', { userId: profile._id })
      dispatch('follow/getRss', { userId: profile._id }, { root: true })
      commit(`status/${types.SET_ISLOGIN}`, { isLogin: true }, { root: true })
    }).catch(() => {
      commit(types.CHECK_USERPROFILE, {})
      commit(`status/${types.SET_ISLOGIN}`, { isLogin: false }, { root: true })
    }).finally(() => {
      commit(`status/${types.SET_ISLOADING}`, { isLoading: false }, { root: true })
    })
  },
  getFollowing: async ({ dispatch }, { userId }) => {
    try {
      const body = await api.getFollow({ follower_id: userId })
      if (!body.success) {
        throw body.message
      } else {
        dispatch('setFollowing', { following: body.result })
      }
    } catch (err) {
      console.error(err.message || err)
    }
  },
  getFollower: async ({ dispatch }, { userId }) => {
    try {
      const body = await api.getFollow({ following_id: userId })
      if (!body.success) {
        throw body.message
      } else {
        dispatch('setFollower', { follower: body.result })
      }
    } catch (err) {
      console.error(err.message || err)
    }
  },
  setFollowing: ({ commit }, { following }) => {
    commit(types.USER_SET_FOLLOWING, following)
  },
  setFollower: ({ commit }, { follower }) => {
    commit(types.USER_SET_FOLLOWER, follower)
  },
  setProjectCount: ({ commit }, { projectCount }) => {
    commit(types.USER_SET_PROJECTCOUNT, projectCount)
  },
  setQuestionCount: ({ commit }, { questionCount }) => {
    commit(types.USER_SET_QUESTIONCOUNT, questionCount)
  },
  setArticleCount: ({ commit }, { articleCount }) => {
    commit(types.USER_SET_ARTICLECOUNT, articleCount)
  }
}

const mutations = {
  [types.CHECK_USERPROFILE]: (state, { profile }) => {
    state.profile = {...state.profile, ...profile}
  },
  [types.USER_SET_FOLLOWING]: (state, following) => {
    state.profile.following = following
  },
  [types.USER_SET_FOLLOWER]: (state, follower) => {
    state.profile.follower = follower
  },
  [types.USER_SET_PROJECTCOUNT]: (state, projectCount) => {
    state.profile.projectCount = projectCount
  },
  [types.USER_SET_QUESTIONCOUNT]: (state, questionCount) => {
    state.profile.questionCount = questionCount
  },
  [types.USER_SET_ARTICLECOUNT]: (state, articleCount) => {
    state.profile.articleCount = articleCount
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
