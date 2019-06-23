
import { StackNavigator } from 'react-navigation'
import DrawerNavigator from './DrawerNavigation'

export default StackNavigator({
  Splash: {
    screen: require('../Containers/SplashScreen/').default
  },
  Login: {
    screen: require('../Containers/LoginScreen/').default
  },
  // DashBoard: {
  //   screen: require('../Containers/DashBoard/').default
  // },
  Camera: {
    screen: require('../Containers/CameraIntegration/').default
  },
  Report: {
    screen: require('../Containers/Report/').default
  },
  ManualGoogleMap: {
    screen: require('../Containers/ManualGoogleMap/').default
  },
  ManualSchoolSelect: {
    screen: require('../Containers/ManualSchoolSelect/').default
  },
  VideoRecording: {
    screen: require('../Containers/VideoRecording/').default
  },
  SchoolDetail: {
    screen: require('../Containers/SchoolDetail/').default
  },
  MapScreen: {
    screen: require('../Containers/MapScreen/').default
  },
  ShowReports: {
    screen: require('../Containers/ShowReports/').default
  },
  MyReports: {
    screen: require('../Containers/ShowReports/MyReports').default
  },
  SignupScreen: {
    screen: require('../Containers/SignupScreen/').default
  },
  VerifyPhoneNumber: {
    screen: require('../Containers/SignupScreen/VerifyPhoneNumber').default
  },
  AddInterest: {
    screen: require('../Containers/ShowReports/AddInterest').default
  },
  ReportDetail: {
    screen: require('../Containers/ShowReports/ReportDetail').default
  },
  Comment: {
    screen: require('../Containers/Comment/CommentList').default
  },
  Notification:{
    screen: require('../Containers/DashBoard/Notification').default
  },
  AdHocQuery:{
    screen: require('../Containers/AdHocQuery/').default
  },
  CreateChart:{
    screen: require('../Containers/AdHocQuery/Chart').default
  },
  DashBoard: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null
    }
  },
},
  {
    headerMode: 'float',
    initialRouteName: 'Splash'
  })
