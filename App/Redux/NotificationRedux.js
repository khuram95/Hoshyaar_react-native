import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  NotificationRequest: ['payload', 'resolve', 'reject'],
  NotificationSuccess: null,
  NotificationFailure: ['error'],
  saveNotificationLocal: ['notification'],

  // add action here
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  notification:[],
  // form: { error: {}},
})

/* ------------- Reducers ------------- */

export const NotificationRequest = (state, action) => {
  return state.merge({ requesting: true, error: null })
}

export const NotificationSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const NotificationFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveNotificationLocal = (state, { notification }) =>{
  console.log(" save notification is : ",notification)
  return state.merge({ notification })}

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_REQUEST]: NotificationRequest,
  [Types.NOTIFICATION_SUCCESS]: NotificationSuccess,
  [Types.NOTIFICATION_FAILURE]: NotificationFailure,
  [Types.SAVE_NOTIFICATION_LOCAL]: saveNotificationLocal,


  // add reducer hook up here
})
