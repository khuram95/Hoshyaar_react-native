
import { StackNavigator, createSwitchNavigator } from 'react-navigation'
import DrawerNavigator from './DrawerNavigation'




// const AppStack = StackNavigator({
//   Camera: {
//     screen: require('../Containers/CameraIntegration/').default
//   },
//   Report: {
//     screen: require('../Containers/Report/').default
//   },
//   ManualGoogleMap: {
//     screen: require('../Containers/ManualGoogleMap/').default
//   },
//   ManualSchoolSelect: {
//     screen: require('../Containers/ManualSchoolSelect/').default
//   },
//   VideoRecording: {
//     screen: require('../Containers/VideoRecording/').default
//   },
//   SchoolDetail: {
//     screen: require('../Containers/SchoolDetail/').default
//   },
//   MapScreen: {
//     screen: require('../Containers/MapScreen/').default
//   },
//   ShowReports: {
//     screen: require('../Containers/ShowReports/').default
//   },
//   MyReports: {
//     screen: require('../Containers/ShowReports/MyReports').default
//   },
//   AddInterest: {
//     screen: require('../Containers/ShowReports/AddInterest').default
//   },
//   ReportDetail: {
//     screen: require('../Containers/ShowReports/ReportDetail').default
//   },
//   Comment: {
//     screen: require('../Containers/Comment/CommentList').default
//   },
//   Notification: {
//     screen: require('../Containers//DashBoard/Notification').default
//   },
//   DashBoard: {
//     screen: DrawerNavigator,
//     navigationOptions: {
//       header: null
//     }
//   },
// });
// const AuthStack = StackNavigator({
//   Splash: {
//     screen: require('../Containers/SplashScreen/').default
//   },
//   Login: {
//     screen: require('../Containers/LoginScreen/').default
//   },
//   SignupScreen: {
//     screen: require('../Containers/SignupScreen/').default
//   },
//   VerifyPhoneNumber: {
//     screen: require('../Containers/SignupScreen/VerifyPhoneNumber').default
//   }
// });

// export default StackNavigator(
//   {
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'Auth',
//   }
// );





export default AppStack = StackNavigator({
  Splash: {
    screen: require('../Containers/SplashScreen/').default
  },
  Login: {
    screen: require('../Containers/LoginScreen/').default
  },
  SignupScreen: {
    screen: require('../Containers/SignupScreen/').default
  },
  VerifyPhoneNumber: {
    screen: require('../Containers/SignupScreen/VerifyPhoneNumber').default
  },
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
  AddInterest: {
    screen: require('../Containers/ShowReports/AddInterest').default
  },
  ReportDetail: {
    screen: require('../Containers/ShowReports/ReportDetail').default
  },
  Comment: {
    screen: require('../Containers/Comment/CommentList').default
  },
  Notification: {
    screen: require('../Containers//DashBoard/Notification').default
  },
  DashBoard: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteName: 'Splash',
  });