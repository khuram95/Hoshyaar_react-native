import AuthActions from './AuthRedux'
import ReportActions from './ReportRedux'
import SchoolActions from './SchoolRedux'
import SchoolDetailActions from './SchoolDetailRedux'
// ADD_IMPORT

export default {
  ...AuthActions,
  ...ReportActions,
  ...SchoolActions,
  ...SchoolDetailActions,
  // ADD_ACTIONS
}
