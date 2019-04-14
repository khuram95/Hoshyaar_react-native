import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage } from './Shared'
import Actions from '../Redux/Actions'

function * makeLoginRequest (api, action) {
  const { email, password, resolve, reject } = action
  const response = yield call(api.login, email, password)
  if (response.ok) {
    const headers = get(response, 'headers')
    const user = get(response, 'data.data')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }
    yield put(Actions.saveUser(currentUser))
    yield saveUserToLocalStorage(currentUser)
    yield put(Actions.loginSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.loginFailure(error))
    return reject(error)
  }
}

export function * makeSignoutRequest (api, action) {
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

function * makeSignupRequest (api, action) {
  console.log("Signup Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.signup, payload)
  if (response.ok) {
    const user = get(response, 'data')
    console.log("Signup Responce  Sagas : " ,response)
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

function * makeVerifyPhoneNumberRequest (api, action) {
  console.log("VerifyPhoneNumberRequest Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.verifyOtp, payload)
  if (response.ok) {
    const user = get(response, 'data')
    console.log("makeVerifyPhoneNumberRequest Responce  Sagas : " ,response)
    const headers = get(response, 'headers')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }
    yield put(Actions.saveUser(currentUser))
    // yield saveUserToLocalStorage(currentUser)
     yield put(Actions.verifyPhoneNumberSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.verifyPhoneNumberFailure(error))
    return reject(error)
  }
}





// ADD_SAGA_ACTION

export default {
  makeLoginRequest,
  makeSignoutRequest,
  makeSignupRequest,
  makeVerifyPhoneNumberRequest
  // EXPORT_SAGA_ACTION
}
