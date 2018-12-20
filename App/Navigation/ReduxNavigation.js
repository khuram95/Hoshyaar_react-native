import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { createReduxBoundAddListener, createNavigationReducer,
} from 'react-navigation-redux-helpers'

// here is our redux-aware smart component
function ReduxNavigation (props) {
  const addListener = createReduxBoundAddListener("root")
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
    addListener
 })

  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
