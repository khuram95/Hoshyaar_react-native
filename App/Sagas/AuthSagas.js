import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage } from './Shared'
import Actions from '../Redux/Actions'

function * makeLoginRequest (api, action) {
  const { payload: { email, password }, resolve, reject } = action
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
    yield removeUserFromLocalStorage()
    return resolve()
  } else {
    return reject()
  }
}

// ADD_SAGA_ACTION

export default {
  makeLoginRequest,
  makeSignoutRequest,
  // EXPORT_SAGA_ACTION
}
