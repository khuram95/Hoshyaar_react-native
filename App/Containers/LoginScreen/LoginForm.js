import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView, TouchableOpacity
} from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Hr from 'react-native-hr-plus'
import { Images, Colors } from '../../Themes'
import Actions from '../../Redux/Actions'
import styles from './styles'
import { resolve } from 'url';
import { rejects } from 'assert';


class LoginForm extends React.Component {
  static propTypes = {
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      phone_number: '+923218896477',
      password: 'abc123',
      phone_numberError: '',
      passwordError: ''
    }


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
      const { phone_number, password } = this.state
      this.props.login({ phone_number, password })
        .then(() => {
          console.log("I am going to logging")
          const { navigation } = this.props
          navigation.navigate("DashBoard")
        })
        .catch(error => console.log(error))
    }
    console.log("I am after going to logging")
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
        <View style={styles.appTitleView}>
          <Text style={styles.appTitleName}>Hoshyaar/ہوشیار</Text>
        </View>
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

const mapStateToProps = (state) => ({
  loginError: (state) => get(state, 'auth.loginError'),
  loginSuccess: (state) => get(state, 'auth.loginSuccess'),
  currentUser: (state) => get(state, 'auth.currentUser'),
})

const mapDispatchToProps = (dispatch) => ({
  login: (phone_number, password) => new Promise((resolve, reject) =>
    dispatch(Actions.loginRequest(phone_number, password, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
