import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeEmail: ['email'],
  changePassword: ['password'],
  saveUser: ['currentUser'],
  loginRequest: ['email', 'password', 'resolve', 'reject'],
  loginSuccess: null,
  loginFailure: ['error'],
  signoutRequest: ['resolve', 'reject'],
  signoutSuccess: null,

  // add action here
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // form: { error: {}},

  // // for login
  form: { error: {}, email: 'host@safe.com', password: 'password'},
  currentUser: {},
})

/* ------------- Reducers ------------- */

export const changeEmail = (state, { email }) =>
  state.setIn(['form', 'email'], email)

export const changePassword = (state, { password }) =>
  state.setIn(['form', 'password'], password)

export const loginRequest = (state, action) =>
  state.merge({ loggingIn: true, error: null })

export const saveUser = (state, { currentUser }) =>
  state.merge({ currentUser })

export const loginSuccess = (state, action) =>
  state.merge({ loggingIn: false, error: null })

export const loginFailure = (state, { error }) =>
  state.merge({ loggingIn: false, error })

export const signoutRequest = (state, action) => state

export const signoutSuccess = (state, action) =>
  state.merge({})

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_EMAIL]: changeEmail,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.SAVE_USER]: saveUser,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNOUT_REQUEST]: signoutRequest,
  [Types.SIGNOUT_SUCCESS]: signoutSuccess,
  // add reducer hook up here
})
