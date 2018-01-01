import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  profile: {}
}

const getters = {
  profile: state => state.profile
}

const actions = {
  getUserProfile: ({ commit }) => {
    commit(`status/${types.SET_ISLOADING}`, { isLoading: true }, { root: true })
    api.getUserProfile().then(profile => {
      commit(types.CHECK_USERPROFILE, { profile })
      commit(`status/${types.SET_ISLOGIN}`, { isLogin: true }, { root: true })
    }).catch(() => {
      commit(types.CHECK_USERPROFILE, {})
      commit(`status/${types.SET_ISLOGIN}`, { isLogin: false }, { root: true })
    }).finally(() => {
      commit(`status/${types.SET_ISLOADING}`, { isLoading: false }, { root: true })
    })
  }
}

const mutations = {
  [types.CHECK_USERPROFILE]: (state, { profile }) => {
    state.profile = profile
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
