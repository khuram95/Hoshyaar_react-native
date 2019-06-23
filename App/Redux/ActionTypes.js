import { StartupTypes } from './StartupRedux'
import { AuthTypes } from './AuthRedux'
import { ReportTypes } from './ReportRedux'
import { SchoolTypes } from './SchoolRedux'
import { SchoolDetailTypes } from './SchoolDetailRedux'
import { NotificationTypes } from './NotificationRedux'
import { ComparisonTypes } from './AdHocQueryRedux'


// ADD_IMPORT

export default {
  ...StartupTypes,
  ...AuthTypes,
  ...ReportTypes,
  ...SchoolTypes,
  ...SchoolDetailTypes,
  ...NotificationTypes,
  ...ComparisonTypes,
  // ADD_ACTION_TYPE
}
