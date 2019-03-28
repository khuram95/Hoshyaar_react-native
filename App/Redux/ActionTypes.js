import { StartupTypes } from './StartupRedux'
import { AuthTypes } from './AuthRedux'
import { ReportTypes } from './ReportRedux'
import { SchoolTypes } from './SchoolRedux'
import { SchoolDetailTypes } from './SchoolDetailRedux'
// ADD_IMPORT

export default {
  ...StartupTypes,
  ...AuthTypes,
  ...ReportTypes,
  ...SchoolTypes,
  ...SchoolDetailTypes,
  // ADD_ACTION_TYPE
}
