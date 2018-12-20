import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
import { Button, Text, Form, Item, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Hr from 'react-native-hr-plus'
import { Images, Colors } from '../../Themes/'
import Actions from '../../Redux/Actions'
import styles from './styles'


class LoginScreen extends Component {
  static propTypes = {
  }

  static navigationOptions = {
      header: null,
    }

  constructor(props) {
    super(props)
  }

  login = () => {

  }

  render () {
    return (
      <ImageBackground
        style={styles.backgroundImage}
      >
        <Button style={{
          alignSelf: 'center',
          width: '80%'
        }}
        onPress={this.login}
        >
          <Text style={{
            width: '100%',
            fontWeight: "800",
            textAlign: "center"
          }}>
          Login
          </Text>
        </Button>
      </ImageBackground>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
