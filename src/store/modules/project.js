import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  isCreateDialogVisible: false,
  isLoadingProjectList: false,
  projects: [],
  project: {
    __v: '',
    _id: '',
    createdAt: '',
    chartOptions: [],
    description: '',
    gitId: 0,
    gitSSH: '',
    gitTitle: '',
    imageUrls: [],
    leader: {
      _id: '',
      avatar: '',
      email: '',
      name: ''
    },
    member: [],
    milestones: [],
    node: [],
    notes: [],
    story: {
      md: '',
      html: ''
    },
    title: '',
    updatedAt: ''
  },
  isLoadingProject: false,
  isAddMemberDialogVisible: false,
  isAddNoteDialogVisible: false,
  isAddMilestoneDialogVisible: false,
  projectNotes: [],
  isModifyMilestoneDialogVisible: false
}

const getters = {
  isCreateDialogVisible: state => state.isCreateDialogVisible,
  isLoadingProjectList: state => state.isLoadingProjectList,
  isLoadingProject: state => state.isLoadingProject,
  project: state => state.project,
  projects: state => state.projects,
  isAddMemberDialogVisible: state => state.isAddMemberDialogVisible,
  isAddNoteDialogVisible: state => state.isAddNoteDialogVisible,
  projectNotes: state => state.projectNotes,
  isAddMilestoneDialogVisible: state => state.isAddMilestoneDialogVisible,
  isModifyMilestoneDialogVisible: state => state.isModifyMilestoneDialogVisible
}

const actions = {
  initState: ({ commit }) => {
    const initState = {
      __v: '',
      _id: '',
      createdAt: '',
      chartOptions: [],
      description: '',
      gitId: 0,
      gitSSH: '',
      gitTitle: '',
      imageUrls: [],
      leader: {
        _id: '',
        avatar: '',
        email: '',
        name: ''
      },
      member: [],
      milestones: [],
      node: [],
      notes: [],
      story: {
        md: '',
        html: ''
      },
      title: '',
      updatedAt: ''
    }
    commit(types.PROJECT_SET_PROJECT, initState)
  },
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
  setChartOptions: ({ commit, state }) => {
    const getChartDateFormat = function (date) {
      const dateObject = new Date(date)
      return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`
    }
    const milestones = state.project.milestones
    const finishedMilestones = [].concat(milestones.filter(milestone => {
      return milestone.isFinished
    })).sort((a, b) => {
      return new Date(a.finishDate) - new Date(b.finishDate)
    })
    const unfinishedMilestones = milestones.filter(milestone => {
      return !milestone.isFinished
    }).sort((a, b) => {
      return new Date(a.deadline) - new Date(b.deadline)
    })
    const sortedMilestones = finishedMilestones.concat(unfinishedMilestones)
    const dataArray = [
      ['时间节点', '计划完成日期', '实际完成日期']
    ]
    sortedMilestones.forEach(ms => {
      if (ms.isFinished) {
        dataArray.push([ms.name, getChartDateFormat(ms.deadline), getChartDateFormat(ms.finishDate)])
      } else {
        dataArray.push([ms.name, getChartDateFormat(ms.deadline)])
      }
    })
    commit(types.PROJECT_SET_CHARTOPTIONS, dataArray)
  },
  getProject: async ({ commit, dispatch }, { projectId }) => {
    dispatch('initState')
    dispatch('setIsLoadingProject', { isLoadingProject: true })
    try {
      const projectBody = await api.getProject({ id: projectId })
      const notesBody = await api.getProjectNotes({ project_id: projectId })
      const milestonesBody = await api.getProjectMilestones({ project_id: projectId })
      if (projectBody.success && notesBody.success && milestonesBody.success) {
        commit(types.PROJECT_SET_PROJECT, projectBody.result)
        await dispatch('setProjectNotes', { projectNotes: notesBody.result })
        await dispatch('setProjectMilestones', { projectMilestones: milestonesBody.result })
        await dispatch('setChartOptions')
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
  },
  setIsAddMilestoneDialogVisible: ({ commit }, { isAddMilestoneDialogVisible }) => {
    commit(types.PROJECT_SET_ISADDMILESTONEDIALOGVISIBLE, isAddMilestoneDialogVisible)
  },
  setProjectMilestones: ({ commit }, { projectMilestones }) => {
    commit(types.PROJECT_SET_PROJECTMILESTONES, projectMilestones)
  },
  setIsModifyMilestoneDialogVisible: ({ commit }, { isModifyMilestoneDialogVisible }) => {
    commit(types.PROJECT_SET_ISMODIFYMILESTONEDIALOGVISIBLE, isModifyMilestoneDialogVisible)
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
    state.project = {...state.project, ...project}
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
    state.project.notes = projectNotes
  },
  [types.PROJECT_SET_ISADDMILESTONEDIALOGVISIBLE]: (state, isAddMilestoneDialogVisible) => {
    state.isAddMilestoneDialogVisible = isAddMilestoneDialogVisible
  },
  [types.PROJECT_SET_ISMODIFYMILESTONEDIALOGVISIBLE]: (state, isModifyMilestoneDialogVisible) => {
    state.isModifyMilestoneDialogVisible = isModifyMilestoneDialogVisible
  },
  [types.PROJECT_SET_PROJECTMILESTONES]: (state, projectMilestones) => {
    state.project.milestones = projectMilestones
  },
  [types.PROJECT_SET_CHARTOPTIONS]: (state, chartOptions) => {
    state.project.chartOptions = chartOptions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
