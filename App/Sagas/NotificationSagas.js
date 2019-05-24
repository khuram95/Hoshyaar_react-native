import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import {
  parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage
} from './Shared'
import Actions from '../Redux/Actions'

function* makeNotificationRequest(api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.notification, payload)
  console.log('Notification: ', response)
  console.log('Notification data: ', payload)
  if (response.ok) {
    console.log('Notification Responce: ', response.data)
    yield put(Actions.NotificationSuccess())
    yield put(Actions.saveNotificationLocal(response.data))
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.NotificationFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeNotificationRequest,
  // EXPORT_SAGA_ACTION
}
