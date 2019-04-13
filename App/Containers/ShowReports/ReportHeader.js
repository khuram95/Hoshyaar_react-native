import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux'

class ReportHeader extends Component{
    constructor(props) {
        super(props)
	}
	
	static navigationOptions = {
        header: null,
	  }


    render(){
        return(
            <View style={{ backgroundColor: 'red', flex: 1, heigth: 120, flexDirection: 'row' }}>
            <Text>hello g</Text>
            </View>

        )
    }
}

const mapStateToProps = (state) => ({

  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReportHeader)
