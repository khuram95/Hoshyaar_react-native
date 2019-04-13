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
    this.state = {email: 'sajjad@gmail.com', password:'123456',emaiError:'', passwordError:''}


  }
  isValidatesEmail = () => {
    var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(this.state.email)
  }
  validatesInput = () => {
    const { email, password } = this.state
    if(isEmpty(email)){
      this.setState({ emaiError: "Email can't be Blank"});
      return false;
    }else if(!this.isValidatesEmail()){
      this.setState({ emaiError: 'Email is not Valid' });
      return false;
    }
    if(isEmpty(password)){
      this.setState({ passwordError: "password can't be blank" });
      return false;
    } else if(password.length<5){
      this.setState({ passwordError: 'password must be 6 digits long' });
      return false;
    }
    return true;
  }

  login = () => {
    const { email, password } = this.state
    const { navigation } = this.props
    if(this.validatesInput()){     
      navigation.navigate("DashBoard")
      this.props.login(email, password)
      .then(() => {
        // this.props.registerDevice(this.props.deviceToken)
        // this.props.fetchAllNotifications()
        // this.props.navigation.navigate('Dashboard')
      })
    }
  }

  render () {
    return (
      <ImageBackground
        style={styles.backgroundImage}
      >
        <View style={styles.appTitleView}>
          <Text style={styles.appTitleName}>Hoshyaar/ہوشیار</Text>
        </View>
        <View style={styles.inputBlock}>
            <Text style={styles.errorsMessages}></Text>
          <FormItem style={styles.userName}>
            <Input
              value={this.state.email}
              placeholder='Enter Email/Phone number'
              placeholderTextColor='#0d6d93'
              keyboardType="mail-address"
              onChangeText={(email) => this.setState({ email: email, emaiError: '' })}
            />
          </FormItem>
          <FormItem>
            <Input
              value={this.state.password}
              placeholder='Enter password'
              placeholderTextColor='#0d6d93'
              
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password: password, passwordError:'' })}
            />
          </FormItem>
        </View>
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

const mapStateToProps = (state) => ({
  loginError: (state) => get(state, 'auth.loginError'),
  state,
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => new Promise((resolve, reject) =>
    dispatch(Actions.loginRequest(email, password, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)