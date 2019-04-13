import React, { Component } from 'react'
import { View} from 'react-native'
import { Item } from 'native-base'
import DashBoardForm from './DashBoardForm'


class DashBoard extends Component{
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,
      }  

    render(){
        return(
            <DashBoardForm navigation={ this.props.navigation}/>
        )
    }
}

export default DashBoard