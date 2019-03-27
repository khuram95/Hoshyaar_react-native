import AuthActions from './AuthRedux'
import ReportActions from './ReportRedux'
import SchoolActions from './SchoolRedux'
// ADD_IMPORT

export default {
  ...AuthActions,
  ...ReportActions,
  ...SchoolActions,
  // ADD_ACTIONS
}
