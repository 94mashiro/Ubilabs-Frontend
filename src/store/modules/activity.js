import * as types from '../mutation-types'
import * as api from '@/store/api'

const state = {
  activities: [],
  activity: {},
  filterMode: 'all',
  isCreateDialogVisible: false,
  isLoading: false,
  isActivityDetailLoading: false,
  comments: []
}

const getters = {
  activities: (state) => state.activities,
  activity: (state) => state.activity,
  filterMode: (state) => state.filterMode,
  isCreateDialogVisible: (state) => state.isCreateDialogVisible,
  isLoading: (state) => state.isLoading,
  isActivityDetailLoading: (state) => state.isActivityDetailLoading,
  comments: (state) => state.comments
}

const actions = {
  getActivities: ({ commit, dispatch }) => {
    dispatch('setIsLoading', { isLoading: true })
    api.getActivity().then(body => {
      if (body.success) {
        commit(types.ACTIVITY_SET_ACTIVITIES, body.activities)
      } else {
        console.error(body.message)
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      dispatch('setIsLoading', { isLoading: false })
    })
  },
  setFilterMode: ({ commit }, { filterMode }) => {
    commit(types.ACTIVITY_SET_FILTERMODE, filterMode)
  },
  setIsCreateDialogVisible: ({ commit }, { isCreateDialogVisible }) => {
    commit(types.ACTIVITY_SET_ISCREATEDIALOGVISIBLE, isCreateDialogVisible)
  },
  setIsLoading: ({ commit }, { isLoading }) => {
    commit(types.ACTIVITY_SET_ISLOADING, isLoading)
  },
  getActivity: ({ commit, dispatch }, { activityId }) => {
    dispatch('setIsActivityDetailLoading', { isActivityDetailLoading: true })
    api.getActivity({ id: activityId }).then(body => {
      dispatch('getComments', { activityId })
      if (body.success) {
        commit(types.ACTIVITY_SET_ACTIVITY, body.activity)
      } else {
        console.error(body.message)
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      dispatch('setIsActivityDetailLoading', { isActivityDetailLoading: false })
    })
  },
  setIsActivityDetailLoading: ({ commit }, { isActivityDetailLoading }) => {
    commit(types.ACTIVITY_SET_ISACTIVITYDETAILLOADING, isActivityDetailLoading)
  },
  getComments: ({ commit }, { activityId }) => {
    api.getComments(activityId).then(body => {
      if (body.success) {
        commit(types.ACTIVITY_SET_COMMENTS, body.comments)
      } else {
        console.error()
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

const mutations = {
  [types.ACTIVITY_SET_FILTERMODE]: (state, filterMode) => {
    state.filterMode = filterMode
  },
  [types.ACTIVITY_SET_ISCREATEDIALOGVISIBLE]: (state, isCreateDialogVisible) => {
    state.isCreateDialogVisible = isCreateDialogVisible
  },
  [types.ACTIVITY_SET_ACTIVITIES]: (state, activities) => {
    state.activities = activities
  },
  [types.ACTIVITY_SET_ISLOADING]: (state, isLoading) => {
    state.isLoading = isLoading
  },
  [types.ACTIVITY_SET_ACTIVITY]: (state, activity) => {
    state.activity = activity
  },
  [types.ACTIVITY_SET_ISACTIVITYDETAILLOADING]: (state, isActivityDetailLoading) => {
    state.isActivityDetailLoading = isActivityDetailLoading
  },
  [types.ACTIVITY_SET_COMMENTS]: (state, comments) => {
    state.comments = comments
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
