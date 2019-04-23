import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Hr from 'react-native-hr-plus'
import { Images, Colors } from '../../Themes'
import Actions from '../../Redux/Actions'
import styles from './styles'
import { resolve } from 'url';
import { rejects } from 'assert';



class SignupForm extends React.Component {
  static propTypes = {
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      mobile_no: '923218896477',
      username: 'sajjad.mustafa',
      password: 'NIMDA@astp346',
      confirm_password: 'NIMDA@astp346',
      mobile_noError: '',
      usernameError: '',
      passwordError: '',
      confirm_passwordError: '',
    }
  }

  isValidatesMobileNo = () => {
    var regx = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    return regx.test(this.state.mobile_no)
  }

  isValidatesUserName = () => {
    var regx = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    return regx.test(this.state.userName)
  }
  isValidatesPassword = () => {
    var regx = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
    return regx.test(this.state.password)
  }


  validatesInput = () => {
    const { mobile_no, username, password, confirm_password } = this.state

    if (isEmpty(mobile_no)) {
      this.setState({ mobile_noError: "Mobile Number can't be Blank" });
      return false;
    } else if (!this.isValidatesMobileNo()) {
      this.setState({ mobile_noError: 'Mobile Number is not Valid' });
      return false;
    }

    if (isEmpty(username)) {
      this.setState({ usernameError: "User Name can't be Blank" });
      return false;
    } else if (!this.isValidatesUserName()) {
      this.setState({ usernameError: 'User Name is not Valid' });
      return false;
    }

    if (isEmpty(password, confirm_password)) {
      this.setState({ passwordError: "password can't be blank" });
      return false;
    } else if (!this.isValidatesPassword()) {
      this.setState({ passwordError: 'Password must contain at least one letter, at least one number, and be longer than six charaters' });
      return false;
    } else if (password != confirm_password) {
      this.setState({ confirm_password: 'Password do not match' });

    }
    return true;
  }

  signin = () =>{
    const { navigation } = this.props
    navigation.navigate("Login")
  }


  signup = () => {
    this.props.signup({
      mobile_no: this.state.mobile_no,
      username: this.state.username,
      password: this.state.password,
    })
      .then(() => {
        console.log("i am signup .then")
        const { navigation } = this.props
        navigation.navigate("VerifyPhoneNumber")
      })
  }

  render() {
    return (
      <ImageBackground autoCapitalize="none"

        style={styles.backgroundImage}
      >
        <View style={styles.appTitleView}>
          <Text style={styles.appTitleName}>Hoshyaar/ہوشیار</Text>
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.errorsMessages}></Text>
          <FormItem style={styles.userName}>
            <Input
              value={this.state.mobile_no}
              placeholder='PhoneNumber'
              placeholderTextColor='#0d6d93'
              keyboardType="phone-pad"
              onChangeText={(mobile_no) => this.setState({ mobile_no: mobile_no, mobile_noError: '' })}
            />
          </FormItem>
          <FormItem style={styles.userName}>
            <Input
              value={this.state.username}
              placeholder='Username'
              placeholderTextColor='#0d6d93'
              onChangeText={(username) => this.setState({ username: username, usernameError: '' })}
            />
          </FormItem>
          <FormItem>
            <Input
              value={this.state.password}
              placeholder='Password'
              placeholderTextColor='#0d6d93'

              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password: password, passwordError: '' })}
            />
          </FormItem>
          <FormItem>
            <Input
              value={this.state.confirm_password}
              placeholder='Confirm Password'
              placeholderTextColor='#0d6d93'

              secureTextEntry={true}
              onChangeText={(confirm_password) => this.setState({ confirm_password: confirm_password, confirm_passwordError: '' })}
            />
          </FormItem>

        </View>
        <View style={styles.signinbutton} >
          <Button onPress={this.signup}>
            <Text style={styles.textStyle}>SIGNUP</Text>
          </Button>
        </View>

        <View style={styles.bottomView} >
          <Button onPress={this.signin}>
            <Text style={styles.textStyle}>SIGNIN</Text>
          </Button>
        </View>


      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  signup: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.signupRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)