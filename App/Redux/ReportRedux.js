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
  // add action here
})

export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allReports: [],
})

/* ------------- Reducers ------------- */

export const createReportRequest = (state, action) =>
  state.merge({ requesting: true, error: null })


export const createReportSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const createReportFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const allReportsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })


export const allReportsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const allReportsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveAllReportsLocal = (state, { allReports }) =>
  state.merge({ allReports })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_REPORT_REQUEST]: createReportRequest,
  [Types.CREATE_REPORT_SUCCESS]: createReportSuccess,
  [Types.CREATE_REPORT_FAILURE]: createReportFailure,
  [Types.ALL_REPORTS_REQUEST]: allReportsRequest,
  [Types.ALL_REPORTS_SUCCESS]: allReportsSuccess,
  [Types.ALL_REPORTS_FAILURE]: allReportsFailure,
  [Types.SAVE_ALL_REPORTS_LOCAL]: saveAllReportsLocal,
  // add reducer hook up here
})
