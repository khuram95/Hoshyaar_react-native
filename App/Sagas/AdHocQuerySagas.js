import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import {
  parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage
} from './Shared'
import Actions from '../Redux/Actions'

function* makeComparisonRequest(api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.comparison, payload)
  console.log('Comparison: ', response)
  console.log('Comparison data: ', payload)
  if (response.ok) {
    console.log('Comparison Responce: ', response.data)
    yield put(Actions.ComparisonSuccess())
    yield put(Actions.saveComparisonLocal(response.data))
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.ComparisonFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeComparisonRequest,
  // EXPORT_SAGA_ACTION
}
