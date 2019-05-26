import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ComparisonRequest: ['payload', 'resolve', 'reject'],
  ComparisonSuccess: null,
  ComparisonFailure: ['error'],
  saveComparisonLocal: ['comparison'],

  // add action here
})

export const ComparisonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  comparison:[],
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const ComparisonRequest = (state, action) => {
  return state.merge({ requesting: true, error: null })
}

export const ComparisonSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const ComparisonFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveComparisonLocal = (state, { comparison }) =>{
  console.log(" save comparison is : ",comparison)
  return state.merge({ comparison })}

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMPARISON_REQUEST]: ComparisonRequest,
  [Types.COMPARISON_SUCCESS]: ComparisonSuccess,
  [Types.COMPARISON_FAILURE]: ComparisonFailure,
  [Types.SAVE_COMPARISON_LOCAL]: saveComparisonLocal,


  // add reducer hook up here
})
