import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

import * as api from '../store/api'

const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Setting = () => import('@/pages/Setting')
const Forum = () => import('@/pages/Forum')
const ForumEditor = () => import('@/pages/ForumEditor')
const Article = () => import('@/pages/Article')
const Question = () => import('@/pages/Question')
const Activity = () => import('@/pages/Activity')
const ActivityDetail = () => import('@/pages/ActivityDetail')
const Codelabs = () => import('@/pages/Codelabs')
const Project = () => import('@/pages/Project')
const ProjectDetail = () => import('@/pages/ProjectDetail')
const Profile = () => import('@/pages/Profile')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Project',
    component: Project
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { shouldNotLogin: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { shouldNotLogin: true }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: { requiresAuth: true }
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/forum/editor',
    name: 'Editor',
    component: ForumEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/forum/question/:id',
    name: 'Question',
    component: Question
  },
  {
    path: '/forum/article/:id',
    name: 'Article',
    component: Article,
    meta: { isWhiteBackground: true }
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/activity/:id',
    name: 'ActivityDetail',
    component: ActivityDetail,
    meta: { isWhiteBackground: true }
  },
  {
    path: '/codelabs',
    name: 'Codelabs',
    component: Codelabs
  },
  {
    path: '/project/:id',
    redirect: '/project/:id/intro'
  },
  {
    path: '/project/:id/:tab',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  }
]

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.shouldNotLogin)) {
    api.getUserProfile().then(() => {
      next({
        path: '/'
      })
    }).catch(() => {
      next()
    })
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    api.getUserProfile().then(() => {
      next()
    }).catch(() => {
      next({
        path: '/login'
      })
    })
  } else if (to.matched.some(record => record.meta.isWhiteBackground)) {
    if (Store.state.status.isArticleStyle === false) {
      Store.dispatch('status/setIsArticleStyle', {isArticleStyle: true})
    }
    next()
  } else {
    if (Store.state.status.isArticleStyle === true) {
      Store.dispatch('status/setIsArticleStyle', {isArticleStyle: false})
    }
    next()
  }
})

export default router
