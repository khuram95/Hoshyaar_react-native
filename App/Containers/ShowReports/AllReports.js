import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView,TextInput,AppRegistry, SectionList, StyleSheet } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'

class AllReports extends Component{
	constructor(props) {
		super(props);
		this.state = {
            all_reports:[],

          };
    this.props.fetchAllReports()
        .then(() => {
      this.setState({ all_reports: this.props.allReports })
      console.log("all_reports : " ,this.state.all_reports)
    })
  }


	render(){
    console.log('lore kha: ', get(this.props, 'allReports'))
		return(
            <ScrollView style={{ backgroundColor: '#e6ecf0', flex: 1, padding: 30}}>
            
            <View style={{ flex: 2, backgroundColor: '#fff',
               flexDirection: 'column',
               justifyContent: 'space-between',
               alignItems: 'stretch', }}>
            
            {this.state.all_reports && this.state.all_reports.map((report) =>

               <View style={{borderColor: 'black',
                borderWidth: 1 , backgroundColor: 'white'}}>

                
                <Text > {report.created_at}</Text>
                <Text > {report.report_text}</Text>
                {/* <Text > {report.school[]}</Text> */}
              
                 {report.photos.map((pic) =>

                 
			  	      // <Image
                //       style={{width: 200, height: 200}}
                //       source={{uri: pic.image.url}}
                //       />
               
                <Text > {pic.image.url}</Text>

                 )}


                </View>)
            }
            
            </View>
        
          </ScrollView>
		)
	}
}

const mapStateToProps = createStructuredSelector ({
  allReports: (state) => get(state, 'report.allReports'),
})
  
  const mapDispatchToProps = (dispatch) => ({
    fetchAllReports: (payload) => new Promise((resolve, reject) =>
      dispatch(Actions.allReportsRequest(payload, resolve, reject)))

	})
	
  export default connect(mapStateToProps, mapDispatchToProps)(AllReports)

