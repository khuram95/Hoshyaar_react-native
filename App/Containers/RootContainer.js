import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
// import DrawerNavigation from '../Navigation/DrawerNavigation'
import AppNavigation from '../Navigation/AppNavigation'

class RootContainer extends Component {

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <AppNavigation />
        </View>
      </View>
    )
  }
}

export default RootContainer
