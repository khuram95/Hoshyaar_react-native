import { StartupTypes } from './StartupRedux'
import { AuthTypes } from './AuthRedux'
// ADD_IMPORT

export default {
  ...StartupTypes,
  ...AuthTypes,
  // ADD_ACTION_TYPE
}
