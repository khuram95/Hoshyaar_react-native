import { StartupTypes } from './StartupRedux'
import { AuthTypes } from './AuthRedux'
import { ReportTypes } from './ReportRedux'
// ADD_IMPORT

export default {
  ...StartupTypes,
  ...AuthTypes,
  ...ReportTypes,
  // ADD_ACTION_TYPE
}
