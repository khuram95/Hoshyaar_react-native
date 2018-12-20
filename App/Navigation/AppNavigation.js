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
},
  {
    headerMode: 'float',
    initialRouteName: 'Splash'
})
