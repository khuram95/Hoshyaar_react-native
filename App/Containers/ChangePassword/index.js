import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  View, ImageBackground, TouchableOpacity, ToastAndroid
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Actions from '../../Redux/Actions'
import styles from './styles'
import Loader from '../Loader'
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import Icon from "react-native-vector-icons/AntDesign";
// import console = require('console');

class ChangePassword extends React.Component {
  static propTypes = {
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }}>
      <Icon name="arrowleft" size={30} />
    </TouchableOpacity>,
  })

  // static navigationOptions = {
  //   header: null,
  // }

  constructor(props) {
    super(props)
    this.state = {
      phone_number: '+923218896477',
      password: 'abc123',
      deviceId: '',
      phone_numberError: '',
      passwordError: '',
      error: '',

      oldPass: 'abc123',
      newPass: '12345',
      newPass1: '12345',
    }
  }

  validatesInput = () => {
    if (isEmpty(this.state.oldPass) | isEmpty(this.state.newPass) | isEmpty(this.state.newPass1)) {
      this.setState({ passwordError: "password can't be blank" });
      return false;
    } else if (this.state.oldPass.length < 5 | this.state.newPass.length < 5 | this.state.newPass1.length < 5) {
      this.setState({ passwordError: 'password must be 6 digits long' });
      return false;
    }
    return true;
  }

  changePass = () => {
    console.log('Changing Pass: ')
    if (this.validatesInput()) {
      this.props.changePassword({
        user_id: this.props.currentUser.id,
        old_password: this.state.oldPass,
        new_password: this.state.newPass
      })
        .then(() => {
          console.log('Changing Pass: DONE')
          const { navigation } = this.props
          // navigation.resetTo({ 
          //   component: SomeComponent
          // })
          // navigation.replace("DashBoard")
          navigation.popToTop()
        })
        .catch(error => ToastAndroid.showWithGravity('Backend server is down', ToastAndroid.LONG, ToastAndroid.CENTER)
        )
    }
  }

  render() {
    return (
      <ImageBackground style={styles.backgroundImage}>
        <Loader isShow={this.props.loging == undefined ? false : this.props.loging} />
        <View style={styles.appTitleView}>
          <Text style={styles.appTitleName}>Hoshyaar/ہوشیار</Text>
        </View>
        <View style={styles.inputBlock}>
          <FormItem>
            <Input
              value={this.state.oldPass}
              placeholder='Enter Old password'
              placeholderTextColor='#0d6d93'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ oldPass: password, passwordError: '' })}
            />
          </FormItem>
          <FormItem>
            <Input
              value={this.state.newPass}
              placeholder='Enter New password'
              placeholderTextColor='#0d6d93'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ newPass: password, passwordError: '' })}
            />
          </FormItem>
          <FormItem>
            <Input
              value={this.state.newPass1}
              placeholder='Confirm New password'
              placeholderTextColor='#0d6d93'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ newPass1: password, passwordError: '' })}
            />
          </FormItem>
          <Text style={styles.errorsMessages}>{this.state.passwordError}</Text>
        </View>
        <View style={styles.signinbutton} >
          <Button onPress={this.changePass}>
            <Text style={styles.textStyle}>Change Password</Text>
          </Button>
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: (state) => get(state, 'auth.currentUser'),
})

const mapDispatchToProps = (dispatch) => ({
  changePassword: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.changePasswordRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
