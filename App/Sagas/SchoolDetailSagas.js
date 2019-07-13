import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage } from './Shared'
import Actions from '../Redux/Actions'

function * makeSchoolDetailDataRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.SchoolDetailData, payload)
  console.log('response of schools: ', response)
  console.log('data: ', payload)
  if (response.ok) {
    yield put(Actions.saveSchoolDetailDataLocal(response.data))
    yield put(Actions.SchoolDetailDataSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.SchoolDetailDataFailure(error))
    return reject(error)
  }
}

function * makeMarkVerifiedRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.markVerified, payload)
  if (response.ok) {
    console.log("Mark Verified! " , response.data)
    yield put(Actions.markVerifiedSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.markVerifiedFailure(error))
    return reject(error)
  }
}
// ADD_SAGA_ACTION

export default {
    makeSchoolDetailDataRequest,
    makeMarkVerifiedRequest,
  // EXPORT_SAGA_ACTION
}
