import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import ActionTypes from '../Redux/ActionTypes'

/* ------------- Sagas ------------- */

import StartupSagas from './StartupSagas'
import AuthSagas from './AuthSagas'
import ReportSagas from './ReportSagas'
// IMPORT_SAGAS

const Sagas = {
  ...StartupSagas,
  ...AuthSagas,
  ...ReportSagas,
  // SPREAD_SAGAS
}

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(ActionTypes.STARTUP, Sagas.startup),
    takeLatest(ActionTypes.LOGIN_REQUEST, Sagas.makeLoginRequest, api),
    takeLatest(ActionTypes.SIGNOUT_REQUEST, Sagas.makeSignoutRequest, api),
    takeLatest(ActionTypes.CREATE_REPORT_REQUEST, Sagas.makeCreateReportRequest, api)
    // REGISTRER_SAGA
  ])
}
