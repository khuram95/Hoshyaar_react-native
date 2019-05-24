import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import AppNavigation from '../Navigation/AppNavigation'

/* ------------- Assemble The Reducers ------------- */
export default combineReducers({
  // nav: createNavigationReducer(AppNavigation),
  nav: require('./NavigationRedux').reducer,
  auth: require('./AuthRedux').reducer,
  report: require('./ReportRedux').reducer,
  school: require('./SchoolRedux').reducer,
  schooldetail:require('./SchoolDetailRedux').reducer,
  notification:require('./NotificationRedux').reducer,

  // ADD_REDUX_REDUCER
})
