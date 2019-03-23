import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { Button, Header, Left, Body, Right } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Images, Colors } from '../Themes'
import styles from './Styles/NavigationStyles'

export default StackNavigator({
  Splash: {
    screen: require('../Containers/SplashScreen/').default
  },
  Login: {
    screen: require('../Containers/LoginScreen/').default
  },
  DashBoard: {
    screen: require('../Containers/DashBoard/').default
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
  

  
},
  {
    headerMode: 'float',
    initialRouteName: 'Splash'
})
