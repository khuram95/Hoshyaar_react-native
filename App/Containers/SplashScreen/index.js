import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Container } from 'native-base'
import { Images, Colors } from '../../Themes/'
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
        this.props.navigation.replace("Login")
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
