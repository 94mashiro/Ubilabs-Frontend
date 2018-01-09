import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  isCreateDialogVisible: false,
  isLoadingProjectList: false,
  projects: [],
  project: {},
  isLoadingProject: false,
  isAddMemberDialogVisible: false
}

const getters = {
  isCreateDialogVisible: state => state.isCreateDialogVisible,
  isLoadingProjectList: state => state.isLoadingProjectList,
  isLoadingProject: state => state.isLoadingProject,
  project: state => state.project,
  projects: state => state.projects,
  isAddMemberDialogVisible: state => state.isAddMemberDialogVisible
}

const actions = {
  setIsCreateDialogVisible: ({ commit }, { isCreateDialogVisible }) => {
    commit(types.PROJECT_SET_ISCREATEDIALOGVISIBLE, isCreateDialogVisible)
  },
  setIsLoadingProjectList: ({ commit }, { isLoadingProjectList }) => {
    commit(types.PROJECT_SET_ISLOADINGPROJECTLIST, isLoadingProjectList)
  },
  setIsLoadingProject: ({ commit }, { isLoadingProject }) => {
    commit(types.PROJECT_SET_ISLOADINGPROJECT, isLoadingProject)
  },
  getProjects: async ({ commit, dispatch }) => {
    try {
      dispatch('setIsLoadingProjectList', { isLoadingProjectList: true })
      const body = await api.getProject()
      if (body.success) {
        commit(types.PROJECT_SET_PROJECTS, body.result)
      } else {
        console.error(body.message)
      }
    } catch (err) {
      console.error(err)
    } finally {
      dispatch('setIsLoadingProjectList', { isLoadingProjectList: false })
    }
  },
  getProject: async ({ commit, dispatch }, { projectId }) => {
    dispatch('setIsLoadingProject', { isLoadingProject: true })
    try {
      const body = await api.getProject({ id: projectId })
      if (body.success) {
        commit(types.PROJECT_SET_PROJECT, body.result)
      } else {
        console.error(body.message)
      }
    } catch (err) {
      console.error(err)
    } finally {
      dispatch('setIsLoadingProject', { isLoadingProject: false })
    }
  },
  setIsAddMemberDialogVisible: ({ commit }, { isAddMemberDialogVisible }) => {
    commit(types.PROJECT_SET_ISADDMEMBERDIALOGVISIBLE, isAddMemberDialogVisible)
  }
}

const mutations = {
  [types.PROJECT_SET_ISCREATEDIALOGVISIBLE]: (state, isCreateDialogVisible) => {
    state.isCreateDialogVisible = isCreateDialogVisible
  },
  [types.PROJECT_SET_ISLOADINGPROJECTLIST]: (state, isLoadingProjectList) => {
    state.isLoadingProjectList = isLoadingProjectList
  },
  [types.PROJECT_SET_PROJECTS]: (state, projects) => {
    state.projects = projects
  },
  [types.PROJECT_SET_PROJECT]: (state, project) => {
    state.project = project
  },
  [types.PROJECT_SET_ISLOADINGPROJECT]: (state, isLoadingProject) => {
    state.isLoadingProject = isLoadingProject
  },
  [types.PROJECT_SET_ISADDMEMBERDIALOGVISIBLE]: (state, isAddMemberDialogVisible) => {
    state.isAddMemberDialogVisible = isAddMemberDialogVisible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
