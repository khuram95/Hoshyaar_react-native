import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSchoolDetailDataLocal: ['SchoolDetailData'],
  SchoolDetailDataRequest: ['payload', 'resolve', 'reject'],
  SchoolDetailDataSuccess: null,
  SchoolDetailDataFailure: ['error'],
  // add action here
})

export const SchoolDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    SchoolDetailData: []
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const SchoolDetailDataRequest = (state, action) =>{
  return state.merge({ requesting: true, error: null })
}

export const SchoolDetailDataSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const SchoolDetailDataFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveSchoolDetailDataLocal = (state, { SchoolDetailData }) =>
    state.merge({ SchoolDetailData })
// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SCHOOL_DETAIL_DATA_REQUEST]: SchoolDetailDataRequest,
  [Types.SCHOOL_DETAIL_DATA_SUCCESS]: SchoolDetailDataSuccess,
  [Types.SCHOOL_DETAIL_DATA_FAILURE]: SchoolDetailDataFailure,
  [Types.SAVE_SCHOOL_DETAIL_DATA_LOCAL]: saveSchoolDetailDataLocal,
  // add reducer hook up here
})
