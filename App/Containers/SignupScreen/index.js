import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import SignupForm from './SignupForm'


class SignupScreen extends Component {
  static propTypes = {
  }

  static navigationOptions = {
      header: null,
    }

  constructor(props) {
    super(props)
  }
  componentDidMount(){
  }

  render () {
    return (
      <SignupForm navigation={ this.props.navigation} />
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
