import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  profile: {
    _id: '',
    articleCount: '',
    avatar: '',
    email: '',
    gitlabId: '',
    name: '',
    projectCount: '',
    questionCount: '',
    following: [],
    follower: [],
    isFollowing: false
  },
  project: {},
  question: {},
  article: {},
  isLoading: false
}

const getters = {
  profile: state => state.profile,
  project: state => state.project,
  question: state => state.question,
  article: state => state.article,
  isLoading: state => state.isLoading
}

const actions = {
  getProfile: async ({ dispatch }, { userId }) => {
    try {
      dispatch('setIsLoading', { isLoading: true })
      const profile = await api.getProfile({ user_id: userId })
      if (profile.success) {
        await dispatch('setProfile', { profile: profile.result })
        await dispatch('getFollower', { userId })
        await dispatch('getFollowing', { userId })
        await dispatch('setIsFollowing')
        await dispatch('getProject', { userId, page: 1 })
        await dispatch('getQuestion', { userId, page: 1 })
        await dispatch('getArticle', { userId, page: 1 })
      } else {
        throw new Error('api fetch error')
      }
    } catch (err) {
      console.error(err.message || err.toString() || err)
    } finally {
      dispatch('setIsLoading', { isLoading: false })
    }
  },
  getProject: async ({ dispatch }, { userId, page }) => {
    try {
      const body = await api.getProject({ user_id: userId, page })
      if (!body.success) {
        throw body.message
      } else {
        dispatch('setProject', { project: body.result })
      }
    } catch (err) {
      console.error(err.message || err)
    }
  },
  getQuestion: async ({ dispatch }, { userId, page }) => {
    try {
      const body = await api.getQuestions({ user_id: userId, page })
      if (!body.success) {
        throw body.message
      } else {
        dispatch('setQuestion', { question: body.result })
      }
    } catch (err) {
      console.error(err.message || err)
    }
  },
  getArticle: async ({ dispatch }, { userId, page }) => {
    try {
      const body = await api.getArticles({ user_id: userId, page, paginate: 1 })
      if (!body.success) {
        throw body.message
      } else {
        dispatch('setArticle', { article: body.result })
      }
    } catch (err) {
      console.error(err.message || err)
    }
  },
  getFollowing: async ({ dispatch }, { userId }) => {
    try {
      const body = await api.getFollow({ follower_id: userId })
      if (!body.success) {
        throw body.message
      } else {
        const followingList = body.result.map(result => {
          return {
            ...result.following
          }
        })
        dispatch('setFollowing', { following: followingList })
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
        const followerList = body.result.map(result => {
          return {
            ...result.follower
          }
        })
        await dispatch('setFollower', { follower: followerList })
      }
    } catch (err) {
      console.error(err.message || err)
    }
  },
  setIsFollowing: ({ commit, state, rootState }) => {
    const followerList = state.profile.follower
    if (!rootState.status.isLogin) {
      commit(types.PROFILE_SET_ISFOLLOWING, { isFollowing: false })
    } else {
      const myId = rootState.user.profile._id
      const isFollowing = followerList.filter(user => user._id === myId).length > 0
      commit(types.PROFILE_SET_ISFOLLOWING, isFollowing)
    }
  },
  setFollowing: ({ commit }, { following }) => {
    commit(types.PROFILE_SET_FOLLOWING, following)
  },
  setFollower: ({ commit }, { follower }) => {
    commit(types.PROFILE_SET_FOLLOWER, follower)
  },
  setProfile: ({ commit }, { profile }) => {
    commit(types.PROFILE_SET_PROFILE, profile)
  },
  setProject: ({ commit }, { project }) => {
    commit(types.PROFILE_SET_PROJECT, project)
  },
  setIsLoading: ({ commit }, { isLoading }) => {
    commit(types.PROFILE_SET_ISLOADING, isLoading)
  },
  setQuestion: ({ commit }, { question }) => {
    commit(types.PROFILE_SET_QUESTION, question)
  },
  setArticle: ({ commit }, { article }) => {
    commit(types.PROFILE_SET_ARTICLE, article)
  }
}

const mutations = {
  [types.PROFILE_SET_PROFILE]: (state, profile) => {
    state.profile = {...state.profile, ...profile}
  },
  [types.PROFILE_SET_ISLOADING]: (state, isLoading) => {
    state.isLoading = isLoading
  },
  [types.PROFILE_SET_PROJECT]: (state, project) => {
    state.project = project
  },
  [types.PROFILE_SET_QUESTION]: (state, question) => {
    state.question = question
  },
  [types.PROFILE_SET_ARTICLE]: (state, article) => {
    state.article = article
  },
  [types.PROFILE_SET_FOLLOWING]: (state, following) => {
    state.profile.following = following
  },
  [types.PROFILE_SET_FOLLOWER]: (state, follower) => {
    state.profile.follower = follower
  },
  [types.PROFILE_SET_ISFOLLOWING]: (state, isFollowing) => {
    state.profile.isFollowing = isFollowing
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
