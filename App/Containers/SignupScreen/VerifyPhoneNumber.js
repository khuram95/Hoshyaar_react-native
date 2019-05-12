import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Actions from '../../Redux/Actions'
import styles from './styles'


class VerifyPhoneNumber extends Component {
constructor(props) {
    super(props);
    this.state = {
      otp: '',
      otpError: '',
      current_user:this.props.currentUser
    };
      console.log("this.props.user : ",this.props.currentUser)


  }

  VerifyPhoneNumber = () =>{
    console.log("this.state.otp ",this.state.otp)
    if(this.state.otp.length == 7 ){
      this.props.VerifyPhoneNumber({otp: this.state.otp,phone_number: this.props.currentUser.phone_number})
      .then(() => {
        if(this.props.currentUser.is_verified){
          const { navigation } = this.props
          navigation.navigate("DashBoard")
        }
      })

    }
    else{
      this.setState({ otpError: 'code is invalid, length should be 7' })
    }
  }

  render () {
    return (
      <ImageBackground autoCapitalize="none"

        style={styles.backgroundImage}
      >
        <View style={styles.appTitleView}>
          <Text style={styles.appTitleName}>Hoshyaar/ہوشیار</Text>
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.errorsMessages}>
            {this.state.otpError &&  this.state.otpError}
          </Text>
          <FormItem>
            <Input
              value={this.state.otp}
              placeholder='code'
              placeholderTextColor='#0d6d93'
              // secureTextEntry={true}
              onChangeText={(otp) => this.setState({ otp: otp, otpError: '' })}
            />
          </FormItem>
        </View>
        <View style={styles.bottomView} >
          <Button onPress={this.VerifyPhoneNumber}>
            <Text style={styles.textStyle}>Verify</Text>
          </Button>
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: (state) => get(state, 'auth.currentUser'),
})
  
const mapDispatchToProps = (dispatch) => ({
  VerifyPhoneNumber: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.verifyPhoneNumberRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneNumber)
