import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Hr from 'react-native-hr-plus'
import { Images, Colors } from '../../Themes/'
import Actions from '../../Redux/Actions'
import MapScreenForm from './MapScreenForm'
import styles from './styles'


class MapScreen extends Component {
  static propTypes = {
  }

  static navigationOptions = {
      header: null,
    }

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <MapScreenForm navigation={ this.props.navigation} />
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
