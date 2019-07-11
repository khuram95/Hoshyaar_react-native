import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View, ScrollView, TouchableOpacity, Image, StyleSheet, CheckBox } from 'react-native'


class ChangePassword extends Component {
  static propTypes = {
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { navigation } = this.props

    return (
      <View>

      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
