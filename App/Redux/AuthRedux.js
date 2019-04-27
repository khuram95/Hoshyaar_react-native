import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changePhoneNumber: ['phone_number'],
  changePassword: ['password'],
  saveUser: ['currentUser'],

  loginRequest: ['phone_number', 'password', 'resolve', 'reject'],
  loginSuccess: null,
  loginFailure: ['error'],

  signoutRequest: ['resolve', 'reject'],
  signoutSuccess: null,

  signupRequest: ['payload','resolve', 'reject'],
  signupSuccess: null,
  signupFailure: ['error'],

  verifyPhoneNumberRequest: ['payload','resolve', 'reject'],
  verifyPhoneNumberSuccess: null,
  verifyPhoneNumberFailure: ['error'],


  // add action here
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // form: { error: {}},

  // // for login
  form: { error: {}, phone_number: 'host@safe.com', password: 'password'},
  currentUser: {},
})

/* ------------- Reducers ------------- */

export const changePhoneNumber = (state, { phone_number }) =>
  state.setIn(['form', 'phone_number'], phone_number)

export const changePassword = (state, { password }) =>
  state.setIn(['form', 'password'], password)

export const loginRequest = (state, action) =>
  state.merge({ loggingIn: true, error: null })

export const saveUser = (state, { currentUser })=>
  state.merge({ currentUser })

export const loginSuccess = (state, action) =>
  state.merge({ loggingIn: false, error: null })

export const loginFailure = (state, { error }) =>
  state.merge({ loggingIn: false, error })

export const signoutRequest = (state, action) => state

export const signoutSuccess = (state, action) =>
  state.merge({})



  export const signupRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const signupSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const signupFailure = (state, { error }) =>
  state.merge({ requesting: false, error })


export const verifyPhoneNumberRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const verifyPhoneNumberSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const verifyPhoneNumberFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_PHONE_NUMBER]: changePhoneNumber,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.SAVE_USER]: saveUser,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNOUT_REQUEST]: signoutRequest,
  [Types.SIGNOUT_SUCCESS]: signoutSuccess,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.VERIFY_PHONE_NUMBER_REQUEST]: verifyPhoneNumberRequest,
  [Types.VERIFY_PHONE_NUMBER_SUCCESS]: verifyPhoneNumberSuccess,
  [Types.VERIFY_PHONE_NUMBER_FAILURE]: verifyPhoneNumberFailure,
  // add reducer hook up here
})
