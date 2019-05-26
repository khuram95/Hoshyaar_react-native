import AuthActions from './AuthRedux'
import ReportActions from './ReportRedux'
import SchoolActions from './SchoolRedux'
import SchoolDetailActions from './SchoolDetailRedux'
import Notification from './NotificationRedux'
import AdHocQuery from './AdHocQueryRedux'
// ADD_IMPORT

export default {
  ...AuthActions,
  ...ReportActions,
  ...SchoolActions,
  ...SchoolDetailActions,
  ...Notification,
  ...AdHocQuery,
  // ADD_ACTIONS
}
