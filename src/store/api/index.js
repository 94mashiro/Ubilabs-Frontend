import axios from 'axios'
require('promise.prototype.finally').shim()

export const getUserProfile = () => {
  return axios.get('/api/user/checkSession')
    .then((res) => {
      return res.data
    })
}

export const logout = () => {
  return axios.get('/auth/logout')
    .then((res) => {
      return res.data
    })
}

export const updatePassword = (data) => {
  return axios.patch(
    '/api/user/updatePassword',
    data
  ).then((res) => {
    return res.data
  })
}

export const getNodes = () => {
  return axios.get('/api/forum/getNodes')
    .then((res) => {
      return res.data
    })
}

export const getQuestions = (params) => {
  const paramsArr = []
  for (let key in params) {
    paramsArr.push(`${key}=${params[key]}`)
  }
  const paramsStr = `${paramsArr.join('&')}`
  const fetchUrl = params ? `/api/forum/getQuestions?${paramsStr}` : `/api/forum/getQuestions`
  return axios.get(fetchUrl)
    .then((res) => {
      return res.data
    })
}

export const getArticles = () => {
  return axios.get('/api/forum/articles')
    .then((res) => {
      return res.data
    })
}

export const getQuestion = (id) => {
  return axios.get(`/api/forum/getQuestion?id=${id}`)
    .then((res) => {
      return res.data
    })
}

export const postQuestion = (data) => {
  return axios.post(
    '/api/forum/postQuestion',
    data
  ).then((res) => {
    return res.data
  })
}

export const postArticle = (data) => {
  return axios.post(
    '/api/forum/postArticle',
    data
  ).then((res) => {
    return res.data
  })
}

export const getAnswers = (id) => {
  return axios.get(`/api/forum/getAnswers?id=${id}`)
    .then((res) => {
      return res.data
    })
}

export const postAnswer = (data) => {
  return axios.post(
    '/api/forum/postAnswer',
    data
  ).then((res) => {
    return res.data
  })
}

export const updateProfile = (data) => {
  return axios.patch(
    '/api/user/updateProfile',
    data
  ).then((res) => {
    return res.data
  })
}

export const patchAnswer = (data) => {
  return axios.patch(
    '/api/forum/answer',
    data
  ).then(res => {
    return res.data
  })
}

export const postComment = (data) => {
  return axios.post(
    '/api/forum/comment',
    data
  ).then(res => {
    return res.data
  })
}

export const getComments = (id) => {
  return axios.get(`/api/forum/comments?id=${id}`)
    .then(res => {
      return res.data
    })
}

export const getArticle = (id) => {
  return axios.get(`/api/forum/article?id=${id}`)
    .then(res => {
      return res.data
    })
}

export const postActivity = (data) => {
  return axios.post(
    '/api/activity',
    data
  ).then(res => {
    return res.data
  })
}

export const getActivity = (params) => {
  const paramsArr = []
  for (let key in params) {
    paramsArr.push(`${key}=${params[key]}`)
  }
  const paramsStr = `${paramsArr.join('&')}`
  const fetchUrl = params ? `/api/activity?${paramsStr}` : `/api/activity/`
  return axios.get(fetchUrl)
    .then(res => {
      return res.data
    })
}

export const postCodelab = (data) => {
  return axios.post(
    '/api/codelabs',
    data
    // headers: {'content-type': 'multipart/form-data'}
  ).then(res => {
    return res.data
  })
}

export const getCodelabs = (params) => {
  const paramsArr = []
  for (let key in params) {
    paramsArr.push(`${key}=${params[key]}`)
  }
  const paramsStr = `${paramsArr.join('&')}`
  const fetchUrl = params ? `/api/codelabs?${paramsStr}` : `/api/codelabs/`
  return axios.get(fetchUrl)
    .then(res => {
      return res.data
    })
}

export const postProject = (data) => {
  return axios.post(
    '/api/project',
    data
  ).then(res => {
    return res.data
  })
}

export const getProject = (params) => {
  const paramsArr = []
  for (let key in params) {
    paramsArr.push(`${key}=${params[key]}`)
  }
  const paramsStr = `${paramsArr.join('&')}`
  const fetchUrl = params ? `/api/project?${paramsStr}` : `/api/project/`
  return axios.get(fetchUrl)
    .then(res => {
      return res.data
    })
}

export const updateSSHKey = (token, body) => {
  return axios.post(
    'http://localhost:32774/api/v4/user/keys',
    body,
    {
      headers: { 'PRIVATE-TOKEN': token },
      validateStatus: function (status) {
        return true
      }
    }
  ).then(res => {
    return res.data
  })
}

export const getProfile = (params) => {
  const paramsArr = []
  for (let key in params) {
    paramsArr.push(`${key}=${params[key]}`)
  }
  const paramsStr = `${paramsArr.join('&')}`
  const fetchUrl = params ? `/api/user/profile?${paramsStr}` : `/api/user/profile/`
  return axios.get(fetchUrl)
    .then(res => {
      return res.data
    })
}

export const postMember = (data) => {
  return axios.post(
    '/api/project/member',
    data
  ).then(res => {
    return res.data
  })
}
