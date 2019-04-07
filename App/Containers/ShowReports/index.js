import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import ReportHeader from './ReportHeader'

class ShowReports extends Component{
    constructor(props) {
        super(props)
	}
	
	static navigationOptions = {
        header: null,
	  }  
      
    


    render(){
        return(
            <View>
                <ReportHeader />
                <Text>All Reports</Text>
            </View>

        )
    }
}

const mapStateToProps = (state) => ({

  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowReports)
