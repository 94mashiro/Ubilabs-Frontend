import * as types from '../mutation-types'
import * as api from '../api'
const state = {
  displayMode: 'question',
  questionNodes: [],
  displayNode: '',
  isLoadingQuestionNodes: false,
  questions: [],
  articles: [],
  isLoadingList: false,
  isQuestionDialogVisible: false
}

const getters = {
  displayMode: state => state.displayMode,
  questionNodes: state => state.questionNodes,
  displayNode: state => state.displayNode,
  isLoadingQuestionNodes: state => state.isLoadingQuestionNodes,
  questions: state => state.questions,
  articles: state => state.articles,
  isLoadingList: state => state.isLoadingList,
  isQuestionDialogVisible: (state) => state.isQuestionDialogVisible
}

const actions = {
  setDisplayMode: ({ commit, dispatch, state }, { displayMode }) => {
    commit(types.FORUM_SET_DISPLAYMODE, displayMode)
    if (displayMode === 'question') {
      dispatch('getQuestions', { displayNode: state.displayNode, page: 1 })
    } else {
      dispatch('getArticles', { page: 1 })
    }
  },
  getQuestionNodes: async ({ commit }) => {
    commit(types.FORUM_SET_ISLOADINGQUESTIONNODES, true)
    try {
      const body = await api.getNodes()
      if (body.success) {
        commit(types.FORUM_SET_QUESTIONNODES, body.result)
      } else {
        throw body.message
      }
    } catch (err) {
      console.error(err.message || err)
    } finally {
      commit(types.FORUM_SET_ISLOADINGQUESTIONNODES, false)
    }
  },
  setDisplayNode: async ({ commit, dispatch }, { displayNode }) => {
    commit(types.FORUM_SET_DISPLAY_NODE, displayNode)
    await dispatch('getQuestions', { nodeId: displayNode, page: 1 })
  },
  getQuestions: async ({ commit }, { nodeId, page }) => {
    commit(types.FORUM_SET_ISLOADINGLIST, true)
    try {
      if (nodeId === void 0) {
        nodeId = ''
      }
      const body = await api.getQuestions({node_id: nodeId, page})
      if (body.success) {
        commit(types.FORUM_SET_QUESTIONS, body.result)
      } else {
        console.error(body.message)
      }
    } catch (err) {
      console.error(err)
    } finally {
      commit(types.FORUM_SET_ISLOADINGLIST, false)
    }
  },
  getArticles: ({ commit, dispatch }, { page }) => {
    commit(types.FORUM_SET_ISLOADINGLIST, true)
    api.getArticles({ page })
      .then(async body => {
        if (body.success) {
          commit(types.FORUM_SET_ARTICLES, body.result)
        } else {
          throw body.message
        }
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        commit(types.FORUM_SET_ISLOADINGLIST, false)
      })
  },
  setIsQuestionDialogVisible: ({ commit }, { isQuestionDialogVisible }) => {
    commit(types.FORUM_SET_ISQUESTIONDIALOGVISIBLE, isQuestionDialogVisible)
  }
}

const mutations = {
  [types.FORUM_SET_DISPLAYMODE]: (state, displayMode) => {
    state.displayMode = displayMode
  },
  [types.FORUM_SET_QUESTIONNODES]: (state, questionNodes) => {
    state.questionNodes = questionNodes
  },
  [types.FORUM_SET_DISPLAY_NODE]: (state, displayNode) => {
    state.displayNode = displayNode
  },
  [types.FORUM_SET_ISLOADINGQUESTIONNODES]: (state, isLoadingQuestionNodes) => {
    state.isLoadingQuestionNodes = isLoadingQuestionNodes
  },
  [types.FORUM_SET_ISLOADINGLIST]: (state, isLoadingList) => {
    state.isLoadingList = isLoadingList
  },
  [types.FORUM_SET_QUESTIONS]: (state, questions) => {
    state.questions = questions
  },
  [types.FORUM_SET_ARTICLES]: (state, articles) => {
    state.articles = articles
  },
  [types.FORUM_SET_ISQUESTIONDIALOGVISIBLE]: (state, isQuestionDialogVisible) => {
    state.isQuestionDialogVisible = isQuestionDialogVisible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
