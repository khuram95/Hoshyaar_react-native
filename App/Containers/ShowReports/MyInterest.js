import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView,TextInput,AppRegistry, SectionList, StyleSheet } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class CreateReport extends Component{
	constructor(props) {
		super(props);
		this.state = {

					};

  	}


	render(){
		return(
            <ScrollView style={{ backgroundColor: '#e6ecf0', flex: 1, padding: 30}}>
            
            <View style={{ flex: 2, backgroundColor: '#fff',
               flexDirection: 'column',
               justifyContent: 'space-between',
               alignItems: 'stretch', }}>

               <View style={{height: 170,borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'white'}} />

                <View style={{height: 170,borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'steelblue'}} />

<               View style={{height: 170,borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'steelblue'}} />

                <View style={{height: 170,borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'steelblue'}} />
                
                 <View style={{height: 170,borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'steelblue'}} />

                <View style={{height: 170,borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'steelblue'}} />
              
            </View>
        
          </ScrollView>
		)
	}
}

const mapStateToProps = (state) => ({

	})
  
  const mapDispatchToProps = (dispatch) => ({
   
	})
	
  export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)

