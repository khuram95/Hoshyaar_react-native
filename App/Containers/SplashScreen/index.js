import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Image } from 'react-native'
import { Container } from 'native-base'
import { get, isEmpty } from 'lodash'
import { NavigationActions } from 'react-navigation';
import { Images, Colors } from '../../Themes/'
import Actions from '../../Redux/Actions'
import styles from './styles'


class SplashScreen extends Component {
  static propTypes = {
  }

  static navigationOptions = {
      header: null,
    }

  constructor(props) {
    super(props)
  }

  componentDidMount(){
      setTimeout(() => {
        this.props.navigation.navigate("Login")
      }, 50)
    }

  render () {
    return (
      <Container style={styles.background}>
        <Image source={Images.splashIcon} style={styles.backgroundImage}/>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  state,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
