import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  isCreateDialogVisible: false,
  isLoadingProjectList: false,
  projects: [],
  project: {},
  isLoadingProject: false,
  isAddMemberDialogVisible: false,
  isAddNoteDialogVisible: false,
  projectNotes: []
}

const getters = {
  isCreateDialogVisible: state => state.isCreateDialogVisible,
  isLoadingProjectList: state => state.isLoadingProjectList,
  isLoadingProject: state => state.isLoadingProject,
  project: state => state.project,
  projects: state => state.projects,
  isAddMemberDialogVisible: state => state.isAddMemberDialogVisible,
  isAddNoteDialogVisible: state => state.isAddNoteDialogVisible,
  projectNotes: state => state.projectNotes
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
      const projectBody = await api.getProject({ id: projectId })
      const notesBody = await api.getProjectNotes({ project_id: projectId })
      if (projectBody.success && notesBody.success) {
        commit(types.PROJECT_SET_PROJECT, projectBody.result)
        dispatch('setProjectNotes', { projectNotes: notesBody.result })
      }
    } catch (err) {
      console.error(err)
    } finally {
      dispatch('setIsLoadingProject', { isLoadingProject: false })
    }
  },
  setIsAddMemberDialogVisible: ({ commit }, { isAddMemberDialogVisible }) => {
    commit(types.PROJECT_SET_ISADDMEMBERDIALOGVISIBLE, isAddMemberDialogVisible)
  },
  setIsAddNoteDialogVisible: ({ commit }, { isAddNoteDialogVisible }) => {
    commit(types.PROJECT_SET_ISADDNOTEDIALOGVISIBLE, isAddNoteDialogVisible)
  },
  setProjectNotes: ({ commit }, { projectNotes }) => {
    commit(types.PROJECT_SET_PROJECTNOTES, projectNotes)
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
  },
  [types.PROJECT_SET_ISADDNOTEDIALOGVISIBLE]: (state, isAddNoteDialogVisible) => {
    state.isAddNoteDialogVisible = isAddNoteDialogVisible
  },
  [types.PROJECT_SET_PROJECTNOTES]: (state, projectNotes) => {
    state.projectNotes = projectNotes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
