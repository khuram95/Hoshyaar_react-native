import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSchoolsDataLocal: ['allSchoolsData'],
  allSchoolsDataRequest: ['payload', 'resolve', 'reject'],
  allSchoolsDataSuccess: null,
  allSchoolsDataFailure: ['error'],
  // add action here
})

export const SchoolTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    allSchoolsData: []
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const allSchoolsDataRequest = (state, action) =>{
  console.log("helo report redux");
  return state.merge({ requesting: true, error: null })
}

export const allSchoolsDataSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const allSchoolsDataFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveSchoolsDataLocal = (state, { allSchoolsData }) =>
    state.merge({ allSchoolsData })
// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_SCHOOLS_DATA_REQUEST]: allSchoolsDataRequest,
  [Types.ALL_SCHOOLS_DATA_SUCCESS]: allSchoolsDataSuccess,
  [Types.ALL_SCHOOLS_DATA_FAILURE]: allSchoolsDataFailure,
  [Types.SAVE_SCHOOLS_DATA_LOCAL]: saveSchoolsDataLocal,
  // add reducer hook up here
})
