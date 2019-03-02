import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage } from './Shared'
import Actions from '../Redux/Actions'

function * makeCreateReportRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.createReport, payload)
  console.log('response: ', response)
  console.log('data: ', payload)
  if (response.ok) {
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.createReportFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
    makeCreateReportRequest,
  // EXPORT_SAGA_ACTION
}
