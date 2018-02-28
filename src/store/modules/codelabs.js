import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  isCreateDialogVisible: false,
  codelabs: [],
  codelab: {},
  isLoadingCodelabsList: false,
  selectedCodelab: {}
}

const getters = {
  isCreateDialogVisible: state => state.isCreateDialogVisible,
  codelabs: state => state.codelabs,
  codelab: state => state.codelab,
  isLoadingCodelabsList: state => state.isLoadingCodelabsList,
  selectedCodelab: state => state.selectedCodelab
}

const actions = {
  setIsCreateDialogVisible: ({ commit }, { isCreateDialogVisible }) => {
    commit(types.CODELABS_SET_ISCREATEDIALOGVISIBLE, isCreateDialogVisible)
  },
  getCodelabs: ({ commit, dispatch }, params) => {
    dispatch('setIsLoadingCodelabsList', { isLoadingCodelabsList: true })
    api.getCodelabs(params).then(body => {
      if (body.success) {
        commit(types.CODELABS_SET_CODELABS, body.result)
      } else {
        console.error(body.message)
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      dispatch('setIsLoadingCodelabsList', { isLoadingCodelabsList: false })
    })
  },
  setIsLoadingCodelabsList: ({ commit }, { isLoadingCodelabsList }) => {
    commit(types.CODELABS_SET_ISLOADINGCODELABSLIST, isLoadingCodelabsList)
  },
  setSelectedCodelab: ({ commit }, { selectedCodelab }) => {
    commit(types.CODELABS_SET_SELECTEDCODELAB, selectedCodelab)
  }
}

const mutations = {
  [types.CODELABS_SET_ISCREATEDIALOGVISIBLE]: (state, isCreateDialogVisible) => {
    state.isCreateDialogVisible = isCreateDialogVisible
  },
  [types.CODELABS_SET_ISLOADINGCODELABSLIST]: (state, isLoadingCodelabsList) => {
    state.isLoadingCodelabsList = isLoadingCodelabsList
  },
  [types.CODELABS_SET_CODELABS]: (state, codelabs) => {
    state.codelabs = codelabs
  },
  [types.CODELABS_SET_SELECTEDCODELAB]: (state, selectedCodelab) => {
    state.selectedCodelab = selectedCodelab
  },
  [types.CODELABS_UPDATE_TITLE]: (state, title) => {
    state.selectedCodelab.title = title
  },
  [types.CODELABS_UPDATE_NODE]: (state, node) => {
    state.selectedCodelab.node = node
  },
  [types.CODELABS_UPDATE_FILE]: (state, file) => {
    state.selectedCodelab.file = file
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
