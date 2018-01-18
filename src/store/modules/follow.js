import * as api from '../api'
import * as types from '../mutation-types'
const state = {
  rss: [],
  isLoadingRss: false
}

const getters = {
  rss: state => state.rss,
  isLoadingRss: state => state.isLoadingRss
}

const actions = {
  setIsLoadingRss: ({ commit }, { isLoadingRss }) => {
    commit(types.FOLLOW_SET_ISLOADINGRSS, isLoadingRss)
  },
  setRss: ({ commit }, { rss }) => {
    commit(types.FOLLOW_SET_RSS, rss)
  },
  getRss: async ({ dispatch }, { userId }) => {
    try {
      dispatch('setIsLoadingRss', { isLoadingRss: true })
      const body = await api.getRss({ user_id: userId })
      if (!body.success) {
        throw body.message
      } else {
        dispatch('setRss', { rss: body.result })
      }
    } catch (err) {
      console.error(err.message || err)
    } finally {
      dispatch('setIsLoadingRss', { isLoadingRss: false })
    }
  },
  follow: async ({ dispatch, rootState }, { followerId, followingId }) => {
    try {
      const postBody = {
        followId: followingId
      }
      const body = await api.postFollow(postBody)
      if (!body.success) {
        throw body.message
      } else {
        const followerList = [].concat(rootState.profile.profile.follower)
        const followingList = [].concat(rootState.user.profile.following)
        const {result: followerProfile} = await api.getProfile({ user_id: followerId })
        const {result: followingProfile} = await api.getProfile({ user_id: followingId })
        followerList.push(followerProfile)
        followingList.push(followingProfile)
        dispatch('profile/setFollower', { follower: followerList }, { root: true })
        dispatch('user/setFollowing', { following: followingList }, { root: true })
        dispatch('profile/setIsFollowing', null, { root: true })
      }
    } catch (err) {
      throw err.message || err
    }
  },
  unfollow: async ({ dispatch, rootState }, { followerId, followingId }) => {
    try {
      const body = await api.deleteFollow({ user_id: followingId })
      if (!body.success) {
        throw body.message
      } else {
        const followerList = [].concat(rootState.profile.profile.follower).filter(user => {
          return user._id !== followerId
        })
        const followingList = [].concat(rootState.user.profile.following).filter(user => {
          return user._id !== followingId
        })
        dispatch('profile/setFollower', { follower: followerList }, { root: true })
        dispatch('user/setFollowing', { following: followingList }, { root: true })
        dispatch('profile/setIsFollowing', null, { root: true })
      }
    } catch (err) {
      throw err.message || err
    }
  }
}

const mutations = {
  [types.FOLLOW_SET_ISLOADINGRSS]: (state, isLoadingRss) => {
    state.isLoadingRss = isLoadingRss
  },
  [types.FOLLOW_SET_RSS]: (state, rss) => {
    state.rss = rss
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
