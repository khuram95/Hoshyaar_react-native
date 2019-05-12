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
import SchoolSagas from './SchoolSagas'
import SchoolDetailSagas from './SchoolDetailSagas'

// IMPORT_SAGAS

const Sagas = {
  ...StartupSagas,
  ...AuthSagas,
  ...ReportSagas,
  ...SchoolSagas,
  ...SchoolDetailSagas,
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
    takeLatest(ActionTypes.CREATE_REPORT_REQUEST, Sagas.makeCreateReportRequest, api),
    takeLatest(ActionTypes.ALL_SCHOOLS_DATA_REQUEST, Sagas.makeAllSchoolsDataRequest, api),
    takeLatest(ActionTypes.SCHOOL_DETAIL_DATA_REQUEST, Sagas.makeSchoolDetailDataRequest, api),
    takeLatest(ActionTypes.UNIQUE_SCHOOLS_DATA_REQUEST, Sagas.makeUniqueSchoolsDataRequest, api),
    takeLatest(ActionTypes.GET_DISTRICTS_REQUEST, Sagas.makeGetDistrictsRequest, api),
    takeLatest(ActionTypes.GET_TEHSILS_REQUEST, Sagas.makeGetTehsilsRequest, api),
    takeLatest(ActionTypes.ALL_REPORTS_REQUEST, Sagas.makeallReportsRequest, api),
    takeLatest(ActionTypes.MY_REPORTS_REQUEST, Sagas.makeMyReportsRequest, api),
    takeLatest(ActionTypes.SIGNUP_REQUEST, Sagas.makeSignupRequest, api),
    takeLatest(ActionTypes.VERIFY_PHONE_NUMBER_REQUEST, Sagas.makeVerifyPhoneNumberRequest, api),
    takeLatest(ActionTypes.COMMENTS_REQUEST, Sagas.makeCommentsRequest, api),
    takeLatest(ActionTypes.REPORT_REACTIONS_REQUEST, Sagas.makeReportReactionsRequest, api),




    // REGISTRER_SAGA
  ])
}
