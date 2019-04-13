import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage } from './Shared'
import Actions from '../Redux/Actions'

function * makeAllSchoolsDataRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.allSchoolsData, payload)
  if (response.ok) {
    yield put(Actions.saveSchoolsDataLocal(response.data))
    yield put(Actions.allSchoolsDataSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.allSchoolsDataFailure(error))
    return reject(error)
  }
}


function * makeUniqueSchoolsDataRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.uniqueSchoolsData, payload)
  if (response.ok) {
    yield put(Actions.saveUniqueSchoolsDataLocal(response.data))
    yield put(Actions.uniqueSchoolsDataSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.uniqueSchoolsDataFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
    makeAllSchoolsDataRequest,
    makeUniqueSchoolsDataRequest,
  // EXPORT_SAGA_ACTION
}
