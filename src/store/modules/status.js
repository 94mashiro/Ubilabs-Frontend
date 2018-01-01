import * as types from '../mutation-types'

const state = {
  isLogin: false,
  isLoading: true,
  isArticleStyle: false,
  uploadImages: []
}

const getters = {
  isLogin: (state) => state.isLogin,
  isLoading: (state) => state.isLoading,
  isArticleStyle: (state) => state.isArticleStyle,
  uploadImages: (state) => state.uploadImages
}

const actions = {
  setIsLogin: ({ commit }, { isLogin }) => {
    commit(types.SET_ISLOGIN, { isLogin })
  },
  setIsLoading: ({ commit }, { isLoading }) => {
    commit(types.SET_ISLOADING, { isLoading })
  },
  setIsArticleStyle: ({ commit }, { isArticleStyle }) => {
    commit(types.SET_ISARTICLESTYLE, isArticleStyle)
  },
  clearUploadImages: ({ commit }) => {
    commit(types.SET_STATUS_UPLOADIMAGES, [])
  },
  pushUploadImage: ({ commit, state }, { imageUrl }) => {
    const uploadImages = [].concat(state.uploadImages)
    uploadImages.push(imageUrl)
    commit(types.SET_STATUS_UPLOADIMAGES, uploadImages)
  },
  removeUploadImage: ({ commit, state }, { imageUrl }) => {
    const uploadImages = [].concat(state.uploadImages)
    uploadImages.splice(uploadImages.indexOf(imageUrl), 1)
    commit(types.SET_STATUS_UPLOADIMAGES, uploadImages)
  }
}

const mutations = {
  [types.SET_ISLOGIN]: (state, { isLogin }) => {
    state.isLogin = isLogin
  },
  [types.SET_ISLOADING]: (state, { isLoading }) => {
    state.isLoading = isLoading
  },
  [types.SET_ISARTICLESTYLE]: (state, isArticleStyle) => {
    state.isArticleStyle = isArticleStyle
  },
  [types.SET_STATUS_UPLOADIMAGES]: (state, uploadImages) => {
    state.uploadImages = uploadImages
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
