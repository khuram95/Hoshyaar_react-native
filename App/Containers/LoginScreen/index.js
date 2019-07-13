import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import LoginForm from './LoginForm'


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
  componentDidMount() {
  }

  render() {
    const { navigation } = this.props
    // this.props.navigation.replace('Login')
    // navigation
    // navigation.pop()
    // navigation.resetStackRoot("Login")
    // navigation.push({ name: 'Login', reset: true })

    return (
      <LoginForm navigation={this.props.navigation} />
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
