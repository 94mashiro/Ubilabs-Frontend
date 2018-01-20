import * as types from '../mutation-types'
import * as api from '../api'

const state = {
  question: {},
  answers: [],
  isShowEditor: false,
  isAnswered: false,
  isLoading: false,
  selectedAnswer: false,
  isAnswerCommentVisible: false,
  answerComments: [],
  isModifyQuestionDialogVisible: false,
  selectedQuestion: {}
}

const getters = {
  question: state => state.question,
  answers: state => state.answers,
  isShowEditor: state => state.isShowEditor,
  isAnswered: state => state.isAnswered,
  isLoading: state => state.isLoading,
  selectedAnswer: state => state.selectedAnswer,
  isAnswerCommentVisible: state => state.isAnswerCommentVisible,
  answerComments: state => state.answerComments,
  isModifyQuestionDialogVisible: (state) => state.isModifyQuestionDialogVisible,
  selectedQuestion: state => state.selectedQuestion
}

const actions = {
  getQuestion: async ({ commit, dispatch, rootState }, { questionId, userId }) => {
    dispatch('setIsLoading', { isLoading: true })
    dispatch('setIsShowEditor', {isShowEditor: false})
    dispatch('setSelectedAnswer', { selectedAnswer: {} })
    dispatch('setIsAnswerCommentVisible', { isAnswerCommentVisible: false })
    dispatch('setIsModifyQuestionDialogVisible', { isModifyQuestionDialogVisible: false })
    dispatch('setSelectedQuestion', { selectedQuestion: {} })
    dispatch('setIsAnswered', { isAnswered: false })
    try {
      if (!rootState.forum.questionNodes.length) {
        dispatch('forum/getQuestionNodes', null, { root: true })
      }
      const { question } = await api.getQuestion(questionId)
      const { answers } = await api.getAnswers(questionId)
      commit(types.QUESTION_SET_QUESTION, question)
      commit(types.QUESTION_SET_ANSWERS, answers)
      for (let answer of question.answer) {
        if (answer.author._id === userId) {
          dispatch('setIsAnswered', { isAnswered: true })
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      dispatch('setIsShowEditor', { isShowEditor: false })
      dispatch('setIsLoading', { isLoading: false })
    }
  },
  setIsShowEditor: ({ commit }, { isShowEditor }) => {
    commit(types.QUESTION_SET_ISSHOWEDITOR, isShowEditor)
  },
  setIsAnswered: ({ commit }, { isAnswered }) => {
    commit(types.QUESTION_SET_ISANSWERED, isAnswered)
  },
  setIsLoading: ({ commit }, { isLoading }) => {
    commit(types.QUESTION_SET_ISLOADING, isLoading)
  },
  setSelectedAnswer: ({ commit }, { selectedAnswer }) => {
    commit(types.QUESTION_SET_SELECTEDANSWER, selectedAnswer)
  },
  setIsAnswerCommentVisible: ({ commit }, { isAnswerCommentVisible }) => {
    commit(types.QUESTION_SET_ISANSWERCOMMENTVISIBLE, isAnswerCommentVisible)
  },
  getAnswerComments: async ({ commit, state }) => {
    const { comments } = await api.getComments(state.selectedAnswer._id)
    console.log(state.selectedAnswer._id, comments)
    commit(types.QUESTION_SET_ANSWERCOMMENTS, comments)
  },
  setIsModifyQuestionDialogVisible: ({ commit }, { isModifyQuestionDialogVisible }) => {
    commit(types.QUESTION_SET_ISMODIFYQUESTIONDIALOGVISIBLE, isModifyQuestionDialogVisible)
  },
  setSelectedQuestion: ({ commit }, { selectedQuestion }) => {
    commit(types.QUESTION_SET_SELECTEDQUESTION, {
      _id: selectedQuestion._id,
      title: selectedQuestion.title,
      content: selectedQuestion.content,
      node: (selectedQuestion.node && selectedQuestion.node._id) || ''
    })
  }
}

const mutations = {
  [types.QUESTION_SET_QUESTION]: (state, question) => {
    state.question = question
  },
  [types.QUESTION_SET_ANSWERS]: (state, answers) => {
    state.question.answer = answers
  },
  [types.QUESTION_SET_ISANSWERED]: (state, isAnswered) => {
    state.isAnswered = isAnswered
  },
  [types.QUESTION_SET_ISLOADING]: (state, isLoading) => {
    state.isLoading = isLoading
  },
  [types.QUESTION_SET_ISSHOWEDITOR]: (state, isShowEditor) => {
    state.isShowEditor = isShowEditor
  },
  [types.QUESTION_SET_SELECTEDANSWER]: (state, selectedAnswer) => {
    state.selectedAnswer = selectedAnswer
  },
  [types.QUESTION_SET_ISANSWERCOMMENTVISIBLE]: (state, isAnswerCommentVisible) => {
    state.isAnswerCommentVisible = isAnswerCommentVisible
  },
  [types.QUESTION_SET_ANSWERCOMMENTS]: (state, answerComments) => {
    state.answerComments = answerComments
  },
  [types.QUESTION_SET_ISMODIFYQUESTIONDIALOGVISIBLE]: (state, isModifyQuestionDialogVisible) => {
    state.isModifyQuestionDialogVisible = isModifyQuestionDialogVisible
  },
  [types.QUESTION_SET_SELECTEDQUESTION]: (state, selectedQuestion) => {
    state.selectedQuestion = selectedQuestion
  },
  [types.QUESTION_UPDATE_TITLE]: (state, title) => {
    state.selectedQuestion.title = title
  },
  [types.QUESTION_UPDATE_CONTENT]: (state, content) => {
    state.selectedQuestion.content.md = content
  },
  [types.QUESTION_UPDATE_NODE]: (state, node) => {
    state.selectedQuestion.node = node
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
