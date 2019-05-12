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
  saveUniqueSchoolsDataLocal: ['uniqueSchoolsData'],
  getDistrictsRequest: ['payload', 'resolve', 'reject'],
  getDistrictsSuccess: null,
  getDistrictsFailure: ['error'],
  saveDistrictsLocal: ['districts'],
  getTehsilsRequest: ['payload', 'resolve', 'reject'],
  getTehsilsSuccess: null,
  getTehsilsFailure: ['error'],
  saveTehsilsLocal: ['tehsils'],

  // add action here
})

export const SchoolTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    allSchoolsData: [],
    districts: [],
    tehsils: [],
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

export const saveDistrictsLocal = (state, { districts }) =>
  state.merge({ districts })

export const saveTehsilsLocal = (state, { tehsils }) =>{
  console.log('save local: ', tehsils)
  return state.merge({ tehsils })}

export const getDistrictsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const getDistrictsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const getDistrictsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const getTehsilsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const getTehsilsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })
  
export const getTehsilsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

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
  [Types.SAVE_DISTRICTS_LOCAL]: saveDistrictsLocal,
  [Types.SAVE_TEHSILS_LOCAL]: saveTehsilsLocal,
  [Types.GET_DISTRICTS_REQUEST]: getDistrictsRequest,
  [Types.GET_DISTRICTS_SUCCESS]: getDistrictsSuccess,
  [Types.GET_DISTRICTS_FAILURE]: getDistrictsFailure,
  [Types.GET_TEHSILS_REQUEST]: getTehsilsRequest,
  [Types.GET_TEHSILS_SUCCESS]: getTehsilsSuccess,
  [Types.GET_TEHSILS_FAILURE]: getTehsilsFailure,
  // add reducer hook up here
})
