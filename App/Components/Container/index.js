/**
*
* Container
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './styles'

export default class Container extends Component {
  static propTypes = {
  }
  // Include this before entering any view on all screen WITH HEADER. DONT ADD ON FILES WITHOUT HEADER
  render() {
    return (
      <View style={styles.container}> 
        {this.props.children}
      </View>
    );
  }
}
