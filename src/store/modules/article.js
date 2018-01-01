import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  article: {},
  comments: [],
  isLoading: false,
  isCommentEditorDialogVisible: false
}

const getters = {
  article: state => state.article,
  comments: state => state.comments,
  isLoading: state => state.isLoading,
  isCommentEditorDialogVisible: state => state.isCommentEditorDialogVisible
}

const actions = {
  getArticle: async ({ commit, dispatch }, { articleId }) => {
    try {
      dispatch('setIsLoading', { isLoading: true })
      dispatch('setIsCommentEditorDialogVisible', { isCommentEditorDialogVisible: false })
      const { article } = await api.getArticle(articleId)
      commit(types.ARTICLE_SET_ARTICLE, article)
      const { comments } = await api.getComments(articleId)
      commit(types.ARTICLE_SET_COMMENTS, comments)
      dispatch('setIsLoading', { isLoading: false })
    } catch (err) {
      console.error(err)
    }
  },
  setIsLoading: ({ commit }, { isLoading }) => {
    commit(types.ARTICLE_SET_ISLOADING, isLoading)
  },
  setIsCommentEditorDialogVisible: ({ commit }, { isCommentEditorDialogVisible }) => {
    commit(types.ARTICLE_SET_ISCOMMENTEDITORDIALOGVISIBLE, isCommentEditorDialogVisible)
  }
}

const mutations = {
  [types.ARTICLE_SET_ARTICLE]: (state, article) => {
    state.article = article
  },
  [types.ARTICLE_SET_COMMENTS]: (state, comments) => {
    state.comments = comments
  },
  [types.ARTICLE_SET_ISLOADING]: (state, isLoading) => {
    state.isLoading = isLoading
  },
  [types.ARTICLE_SET_ISCOMMENTEDITORDIALOGVISIBLE]: (state, isCommentEditorDialogVisible) => {
    state.isCommentEditorDialogVisible = isCommentEditorDialogVisible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
