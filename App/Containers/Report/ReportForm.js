import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView,TextInput } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import style from './style'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class CreateReport extends Component{
	constructor(props) {
		super(props);
		this.state = {reportcontent: ''};
	}

		showcontent = () => { 
			const reportContent = this.state.reportcontent
			this.props.createReport(reportContent)
			.then(() =>{
				console.log('successfully done')
			})
		}


	render(){
		return(
			<View>
				<Text style={{textAlign: "center"}}>Create Report</Text>
				
				<Text>Government Islamia Boys High School</Text>   
				
				<TextInput
				multiline = {true}
				numberOfLines = {4}
				editable = {true}
				maxLength = {100}
				onChangeText={(reportcontent) => this.setState({reportcontent})}
				/>
				
				<Button style={{alignSelf: 'center',width: '80%'}} 
					onPress={this.showcontent}>
					<Text style={{width: '100%',fontWeight: "800",textAlign: "center"}}>
						Share Report
					</Text>
				</Button>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
    // loginError: (state) => get(state, 'auth.loginError')
  })
  
  const mapDispatchToProps = (dispatch) => ({
    createReport: (payload) => new Promise((resolve, reject) =>
      dispatch(Actions.createReportRequest(payload, resolve, reject)))
	})
	
  export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)

