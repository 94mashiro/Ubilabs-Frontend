import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import status from './modules/status'
import user from './modules/user'
import question from './modules/question'
import forum from './modules/forum'
import article from './modules/article'
import activity from './modules/activity'
import codelabs from './modules/codelabs'
import project from './modules/project'
import profile from './modules/profile'
import follow from './modules/follow'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    status,
    user,
    question,
    forum,
    article,
    activity,
    codelabs,
    project,
    profile,
    follow
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
