import React, { Component } from 'react'
import { View} from 'react-native'
import { Item } from 'native-base'
import BadInstagramCloneApp from './VideoRecordingForm'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class VideoRecording extends Component{
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,
      }  

    render(){
        return(
            // <View></View>
            <BadInstagramCloneApp navigation={ this.props.navigation}/>
        )
    }
}

const mapStateToProps = (state) => ({
    state,
  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(VideoRecording)

