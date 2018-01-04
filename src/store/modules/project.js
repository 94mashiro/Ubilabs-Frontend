import * as types from '../mutation-types'
// import * as api from '../api'

const state = {
  isCreateDialogVisible: false,
  isLoadingProjectList: false
}

const getters = {
  isCreateDialogVisible: state => state.isCreateDialogVisible,
  isLoadingProjectList: state => state.isLoadingProjectList
}

const actions = {
  setIsCreateDialogVisible: ({ commit }, { isCreateDialogVisible }) => {
    commit(types.PROJECT_SET_ISCREATEDIALOGVISIBLE, isCreateDialogVisible)
  },
  setIsLoadingCodelabsList: ({ commit }, { isLoadingProjectList }) => {
    commit(types.PROJECT_SET_ISLOADINGPROJECTLIST, isLoadingProjectList)
  }
}

const mutations = {
  [types.PROJECT_SET_ISCREATEDIALOGVISIBLE]: (state, isCreateDialogVisible) => {
    state.isCreateDialogVisible = isCreateDialogVisible
  },
  [types.PROJECT_SET_ISLOADINGPROJECTLIST]: (state, isLoadingProjectList) => {
    state.isLoadingProjectList = isLoadingProjectList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
