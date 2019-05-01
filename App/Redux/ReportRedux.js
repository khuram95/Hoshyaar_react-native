import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createReportRequest: ['payload', 'resolve', 'reject'],
  createReportSuccess: null,
  createReportFailure: ['error'],

  allReportsRequest: ['payload', 'resolve', 'reject'],
  allReportsSuccess: null,
  allReportsFailure: ['error'],
  saveAllReportsLocal: ['allReports'],

  myReportsRequest: ['payload', 'resolve', 'reject'],
  myReportsSuccess: null,
  myReportsFailure: ['error'],
  saveMyReportsLocal: ['myReports'],

  commentsRequest: ['payload', 'resolve', 'reject'],
  commentsSuccess: null,
  commentsFailure: ['error'],

  reportReactionsRequest: ['payload', 'resolve', 'reject'],
  reportReactionsSuccess: null,
  reportReactionsFailure: ['error'],

  reportReactionsRequest: ['payload', 'resolve', 'reject'],
  reportReactionsSuccess: null,
  reportReactionsFailure: ['error'],

  saveReportText: ['text'],
  saveReportImageLocal: ['images'],
  saveSingleReport: ['singleReport']
  // add action here
})

export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allReports: [],
  myReports: [],
  text: '',
  images: {},
  singleReport: {},
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const createReportRequest = (state, action) =>
  state.merge({ requesting: true, error: null })
export const createReportSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })
export const createReportFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const commentsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })
export const commentsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })
export const commentsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const reportReactionsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })
export const reportReactionsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })
export const reportReactionsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const allReportsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })
export const allReportsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })
export const allReportsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })
export const saveAllReportsLocal = (state, { allReports }) =>
  state.merge({ allReports })

export const myReportsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })
export const myReportsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })
export const myReportsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })
export const saveMyReportsLocal = (state, { myReports }) =>
  state.merge({ myReports })

export const saveReportText = (state, { text }) => state.setIn(['report', 'text'], { text })

export const saveReportImageLocal = (state, { images }) => {
  console.log('save images', images)
  return state.setIn(['report', 'images'], { images })
}

export const saveSingleReport = (state, { singleReport }) =>
  state.merge({ singleReport })
// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_REPORT_REQUEST]: createReportRequest,
  [Types.CREATE_REPORT_SUCCESS]: createReportSuccess,
  [Types.CREATE_REPORT_FAILURE]: createReportFailure,

  [Types.COMMENTS_REQUEST]: commentsRequest,
  [Types.COMMENTS_SUCCESS]: commentsSuccess,
  [Types.COMMENTS_FAILURE]: commentsFailure,

  [Types.REPORT_REACTIONS_REQUEST]: reportReactionsRequest,
  [Types.REPORT_REACTIONS_SUCCESS]: reportReactionsSuccess,
  [Types.REPORT_REACTIONS_FAILURE]: reportReactionsFailure,

  [Types.ALL_REPORTS_REQUEST]: allReportsRequest,
  [Types.ALL_REPORTS_SUCCESS]: allReportsSuccess,
  [Types.ALL_REPORTS_FAILURE]: allReportsFailure,
  [Types.SAVE_ALL_REPORTS_LOCAL]: saveAllReportsLocal,

  [Types.MY_REPORTS_REQUEST]: myReportsRequest,
  [Types.MY_REPORTS_SUCCESS]: myReportsSuccess,
  [Types.MY_REPORTS_FAILURE]: myReportsFailure,
  [Types.SAVE_MY_REPORTS_LOCAL]: saveMyReportsLocal,

  [Types.SAVE_REPORT_TEXT]: saveReportText,
  [Types.SAVE_REPORT_IMAGE_LOCAL]: saveReportImageLocal,

  [Types.SAVE_SINGLE_REPORT]: saveSingleReport,
  // add reducer hook up here
})
