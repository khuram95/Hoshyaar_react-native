import React, { Component } from 'react'
import { View} from 'react-native'
import { Item } from 'native-base'
import DashBoardScreen from './DashBoardScreen'


class DashBoard extends Component{
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,
      }  

    render(){
        return(
            <DashBoardScreen navigation={ this.props.navigation}/>
        )
    }
}

export default DashBoard