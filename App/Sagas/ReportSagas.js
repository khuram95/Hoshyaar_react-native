import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { parseError, getAuthHeaders, saveUserToLocalStorage,
  removeUserFromLocalStorage } from './Shared'
import Actions from '../Redux/Actions'

function * makeCreateReportRequest (api, action) {
  console.log("Report Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.createReport, payload)
  if (response.ok) {
    console.log("Responce  Sagas : " ,response)

    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.createReportFailure(error))
    return reject(error)
  }
}

function * makeallReportsRequest (api, action) {
  console.log("alllllls Report Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.allReports, payload)
  console.log("Responce  Sagas : " ,response)
  if (response.ok) {
    yield put(Actions.saveAllReportsLocal(response.data))
    yield put(Actions.allReportsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.allReportsFailure(error))
    return reject(error)
  }
}

function * makeMyReportsRequest (api, action) {
  console.log("my Report Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.myReports, payload)
  console.log("My Reports Responce  Sagas : " ,response)
  if (response.ok) {
    yield put(Actions.saveMyReportsLocal(response.data))
    yield put(Actions.myReportsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.myReportsFailure(error))
    return reject(error)
  }
}

function * makeCommentsRequest (api, action) {
  console.log("Comments Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.comments, payload)
  console.log("Responce  Sagas : " ,response)
  if (response.ok) {
    yield put(Actions.commentsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.commentsFailure(error))
    return reject(error)
  }
}


function * makeReportReactionsRequest (api, action) {
  console.log("reportReactions Sagas")
  const { payload, resolve, reject } = action
  const response = yield call(api.reportReactions, payload)
  console.log("Responce  Sagas : " ,response)
  if (response.ok) {
    yield put(Actions.reportReactionsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.reportReactionsFailure(error))
    return reject(error)
  }
}



// ADD_SAGA_ACTION

export default {
    makeCreateReportRequest,
    makeallReportsRequest,
    makeCommentsRequest,
    makeReportReactionsRequest,
    makeMyReportsRequest
  // EXPORT_SAGA_ACTION
}
