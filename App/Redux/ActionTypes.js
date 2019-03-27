import { StartupTypes } from './StartupRedux'
import { AuthTypes } from './AuthRedux'
import { ReportTypes } from './ReportRedux'
import { SchoolTypes } from './SchoolRedux'
// ADD_IMPORT

export default {
  ...StartupTypes,
  ...AuthTypes,
  ...ReportTypes,
  ...SchoolTypes,
  // ADD_ACTION_TYPE
}
