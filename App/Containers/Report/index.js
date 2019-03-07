import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import CreateReport from './ReportForm'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class Report extends Component{
    constructor(props) {
        super(props)
	}
	
	static navigationOptions = {
        header: null,
	  }  
	  
    render(){
        return(
            <CreateReport navigation={ this.props.navigation}/>
        )
    }
}

const mapStateToProps = (state) => ({
    state,
  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Report)
