import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  isCreateDialogVisible: false,
  codelabs: [],
  codelab: {},
  isLoadingCodelabsList: false
}

const getters = {
  isCreateDialogVisible: state => state.isCreateDialogVisible,
  codelabs: state => state.codelabs,
  codelab: state => state.codelab,
  isLoadingCodelabsList: state => state.isLoadingCodelabsList
}

const actions = {
  setIsCreateDialogVisible: ({ commit }, { isCreateDialogVisible }) => {
    commit(types.CODELABS_SET_ISCREATEDIALOGVISIBLE, isCreateDialogVisible)
  },
  getCodelabs: ({ commit, dispatch }) => {
    dispatch('setIsLoadingCodelabsList', { isLoadingCodelabsList: true })
    api.getCodelabs().then(body => {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
