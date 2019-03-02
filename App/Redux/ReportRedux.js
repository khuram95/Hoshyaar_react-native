import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createReportRequest: ['payload', 'resolve', 'reject'],
  createReportSuccess: null,
  createReportFailure: ['error'],
  // add action here
})

export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const createReportRequest = (state, action) =>{
  console.log("helo report redux");
  return state.merge({ requesting: true, error: null })
}

export const createReportSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const createReportFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_REPORT_REQUEST]: createReportRequest,
  [Types.CREATE_REPORT_SUCCESS]: createReportSuccess,
  [Types.CREATE_REPORT_FAILURE]: createReportFailure,
  // add reducer hook up here
})
