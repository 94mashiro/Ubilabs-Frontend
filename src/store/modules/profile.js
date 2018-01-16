import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  profile: {},
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
        dispatch('setProfile', { profile: profile.result })
        dispatch('getProject', { userId, page: 1 })
        dispatch('getQuestion', { userId, page: 1 })
        dispatch('getArticle', { userId, page: 1 })
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
    state.profile = profile
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
