import React, { Component } from 'react'
import { View} from 'react-native'
import { Item } from 'native-base'
import CameraRoute from './CameraIntegrationForm'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class CameraIntegration extends Component{
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,
      }  

    render(){
        return(
            <CameraRoute navigation={ this.props.navigation}/>
        )
    }
}

const mapStateToProps = (state) => ({
    state,
  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(CameraIntegration)

