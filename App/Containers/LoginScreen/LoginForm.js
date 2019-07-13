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


class LoginForm extends React.Component {
  static propTypes = {
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      phone_number: '',
      password: '',
      deviceId: '',
      phone_numberError: '',
      passwordError: '',
      error: '',
      latitude: null,
      longitude: null,
    }
  }

  componentDidMount = () => {
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      (position.coords.latitude && position.coords.longitude) && this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }, (error) => console.log(error));
    OneSignal.init("289a3983-3872-4647-aa6f-1740c1d57c82");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', (payload) => this.setState({ deviceId: payload.userId }));
    OneSignal.configure()

  }
  onReceived(notification) {
  }

  onOpened(openResult) {
  }

  onIds(device) {
  }

  isValidatesMobileNo = () => {
    var regx = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    return regx.test(this.state.phone_number)
  }

  validatesInput = () => {
    const { phone_number, password } = this.state
    if (isEmpty(phone_number)) {
      this.setState({ phone_numberError: "Mobile Number can't be Blank" });
      return false;
    } else if (!this.isValidatesMobileNo()) {
      this.setState({ phone_numberError: 'Mobile Number is not Valid' });
      return false;
    }
    if (isEmpty(password)) {
      this.setState({ passwordError: "password can't be blank" });
      return false;
    } else if (password.length < 5) {
      this.setState({ passwordError: 'password must be 6 digits long' });
      return false;
    }
    return true;
  }

  login = () => {
    if (this.validatesInput()) {
      const { phone_number, password, deviceId, latitude, longitude } = this.state
      this.props.login({ phone_number, password, deviceId, latitude, longitude })
        .then(() => {
          const { navigation } = this.props
          // navigation.resetTo({ 
          //   component: SomeComponent
          // })
          navigation.replace("DashBoard")
        })
        .catch(error => ToastAndroid.showWithGravity(this.props.errorLocal, ToastAndroid.LONG, ToastAndroid.CENTER)
        )
    }
    console.log("PROPS: ", this.props)
  }

  signUp = () => {
    const { navigation } = this.props
    navigation.navigate("SignupScreen")
  }

  SignupScreen


  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
      >
        <Loader isShow={this.props.loging == undefined ? false : this.props.loging} />
        <View style={styles.appTitleView}>
          <Text style={styles.appTitleName}>Hoshyaar/ہوشیار</Text>
        </View>
        {this.state.error ? <View>
          <Text>{this.state.error}</Text>
        </View> : console.log("sdfsf")}
        <View style={styles.inputBlock}>
          <FormItem style={styles.userName}>
            <Input
              value={this.state.phone_number}
              placeholder='Enter Phone number'
              placeholderTextColor='#0d6d93'
              keyboardType="phone-pad"
              onChangeText={(phone_number) => this.setState({ phone_number: phone_number, phone_numberError: '' })}
            />
          </FormItem>
          <Text style={styles.errorsMessages}>{this.state.phone_numberError}</Text>
          <FormItem>
            <Input
              value={this.state.password}
              placeholder='Enter password'
              placeholderTextColor='#0d6d93'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password: password, passwordError: '' })}
            />
          </FormItem>
          <Text style={styles.errorsMessages}>{this.state.passwordError}</Text>
        </View>
        <View style={styles.signinbutton} >
          <Button onPress={this.login}>
            <Text style={styles.textStyle}>SIGNIN</Text>
          </Button>
        </View>
        <View style={styles.bottomView} >
          <TouchableOpacity onPress={this.signUp}>
            <Text style={styles.textStyle}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loginError: (state) => get(state, 'auth.loginError'),
  loginSuccess: (state) => get(state, 'auth.loginSuccess'),
  currentUser: (state) => get(state, 'auth.currentUser'),
  loging: (state) => get(state, 'auth.loggingIn'),
  errorLocal: (state) => get(state, 'auth.errorLogin'),
})

const mapDispatchToProps = (dispatch) => ({
  login: (phone_number, password) => new Promise((resolve, reject) =>
    dispatch(Actions.loginRequest(phone_number, password, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
