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
    console.log("I am in School Sagas " , response.data)
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

function * makeGetDistrictsRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.getDistricts, payload)
  console.log('response: ', response)
  if (response.ok) {
    yield put(Actions.saveDistrictsLocal(response.data))    
    yield put(Actions.getDistrictsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.getDistrictsFailure(error))
    return reject(error)
  }
}
function * makeGetTehsilsRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.getTehsils, payload)
  console.log('response in tehsil: ', response)
  if (response.ok) {
    yield put(Actions.saveTehsilsLocal(response.data))
    yield put(Actions.getTehsilsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.getTehsilsFailure(error))
    return reject(error)
  }
}

function * makeAddMyInterestRequest (api, action) {
  const { payload, resolve, reject } = action
  const response = yield call(api.addMyInterest, payload)
  if (response.ok) {
    console.log("Add My Interest " , response.data)
    yield put(Actions.addMyInterestSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.addMyInterestFailure(error))
    return reject(error)
  }
}



// ADD_SAGA_ACTION

export default {
    makeAllSchoolsDataRequest,
    makeUniqueSchoolsDataRequest,
    makeGetDistrictsRequest,
    makeGetTehsilsRequest,
    makeAddMyInterestRequest,
  // EXPORT_SAGA_ACTION
}
