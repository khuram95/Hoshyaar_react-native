import AuthActions from './AuthRedux'
import ReportActions from './ReportRedux'
import SchoolActions from './SchoolRedux'
import SchoolDetailActions from './SchoolDetailRedux'
import Notification from './NotificationRedux'
// ADD_IMPORT

export default {
  ...AuthActions,
  ...ReportActions,
  ...SchoolActions,
  ...SchoolDetailActions,
  ...Notification,
  // ADD_ACTIONS
}
