import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import {
  parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage
} from './Shared'
import Actions from '../Redux/Actions'

function* makeLoginRequest(api, action) {
  const { phone_number, password, resolve, reject } = action
  const response = yield call(api.login, phone_number, password)
  if (response.ok && response.data.data) {
    const headers = get(response, 'headers')
    const user = get(response, 'data.data')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }
    yield put(Actions.saveUser(currentUser))
    // yield saveUserToLocalStorage(currentUser)
    yield put(Actions.loginSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.addErrorLocal(response.data.errors[0]))
    yield put(Actions.loginFailure(error))
    return reject(error)
  }
}

export function* makeSignoutRequest(api, action) {
  const { resolve, reject } = action
  const headers = yield call(getAuthHeaders)
  const response = yield call(api.signout, headers)
  yield put(Actions.saveUser({}))
  if (response.ok) {
    return resolve()
  } else {
    return reject()
  }
}

function* makeSignupRequest(api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.signup, payload)
  if (response.ok) {
    const user = get(response, 'data')
    const headers = get(response, 'headers')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }
    yield put(Actions.saveUser(currentUser))
    // yield saveUserToLocalStorage(currentUser)
    yield put(Actions.signupSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.signupFailure(error))
    return reject(error)
  }
}

function* makeOneSignalRequest(api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.oneSignal, payload)
  if (response.ok) {
    yield put(Actions.oneSignalSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.oneSignalFailure(error))
    return reject(error)
  }
}

function* makeVerifyPhoneNumberRequest(api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.verifyOtp, payload)
  if (response.ok) {
    const user = get(response, 'data')
    const headers = get(response, 'headers')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }
    yield put(Actions.saveUser(currentUser))
    yield put(Actions.verifyPhoneNumberSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.verifyPhoneNumberFailure(error))
    return reject(error)
  }
}

function* makeChangePasswordRequest(api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.changePassword, payload)
  if (response.ok) {
    yield put(Actions.changePasswordSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.changePasswordFailure(error))
    return reject(error)
  }
}



// ADD_SAGA_ACTION

export default {
  makeLoginRequest,
  makeSignoutRequest,
  makeSignupRequest,
  makeVerifyPhoneNumberRequest,
  makeOneSignalRequest,
  makeChangePasswordRequest,
  // EXPORT_SAGA_ACTION
}
