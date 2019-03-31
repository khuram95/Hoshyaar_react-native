import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSchoolsDataLocal: ['allSchoolsData'],
  allSchoolsDataRequest: ['payload', 'resolve', 'reject'],
  allSchoolsDataSuccess: null,
  allSchoolsDataFailure: ['error'],
  uniqueSchoolsDataRequest: ['payload', 'resolve', 'reject'],
  uniqueSchoolsDataSuccess: null,
  uniqueSchoolsDataFailure: ['error'],
  saveUniqueSchoolsDataLocal: ['uniqueSchoolsData']


  // add action here
})

export const SchoolTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    allSchoolsData: [],
    uniqueSchoolsData: [],
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const allSchoolsDataRequest = (state, action) =>{
  return state.merge({ requesting: true, error: null })
}

export const allSchoolsDataSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const allSchoolsDataFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveSchoolsDataLocal = (state, { allSchoolsData }) =>
    state.merge({ allSchoolsData })

export const uniqueSchoolsDataRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const uniqueSchoolsDataSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const uniqueSchoolsDataFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveUniqueSchoolsDataLocal = (state, { uniqueSchoolsData }) =>
    state.merge({ uniqueSchoolsData })
    // add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_SCHOOLS_DATA_REQUEST]: allSchoolsDataRequest,
  [Types.ALL_SCHOOLS_DATA_SUCCESS]: allSchoolsDataSuccess,
  [Types.ALL_SCHOOLS_DATA_FAILURE]: allSchoolsDataFailure,
  [Types.SAVE_SCHOOLS_DATA_LOCAL]: saveSchoolsDataLocal,
  [Types.UNIQUE_SCHOOLS_DATA_REQUEST]: uniqueSchoolsDataRequest,
  [Types.UNIQUE_SCHOOLS_DATA_SUCCESS]: uniqueSchoolsDataSuccess,
  [Types.UNIQUE_SCHOOLS_DATA_FAILURE]: uniqueSchoolsDataFailure,
  [Types.SAVE_UNIQUE_SCHOOLS_DATA_LOCAL]: saveUniqueSchoolsDataLocal,
  // add reducer hook up here
})
