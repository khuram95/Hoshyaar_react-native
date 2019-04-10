import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView,TextInput } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'

class CreateReport extends Component{
	constructor(props) {
		super(props);
		this.state = {
			school: get(this.props,'selectedSchool.school'),
			image: get(this.props,'reportImages.images'),
			};
			console.log('Props is : ' ,this.props)
	}



		showcontent = () => { 
			this.props.createReport({ reportContent: get(this.props, 'reportText.text'), 
																school_id: this.state.school.id,
																user_id: 1,
															  image:this.state.image })
			.then(() =>{
				this.props.saveReportTextRequest('')
			})
		}

	 OpenCamera = () => {
    const { navigation } = this.props
      navigation.navigate("Camera")
  }

	
		VideoRecording = () => {
			const { navigation } = this.props
				navigation.navigate("VideoRecording")
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
				value= { get(this.props, 'reportText.text') }
				onChangeText={(reportcontent) => 	this.props.saveReportTextRequest(reportcontent)}
				/>

				<Text>{'\n'}</Text>

				<Button style={{alignSelf: 'center',width: '80%'}}
												onPress={this.OpenCamera}>
					<Text style={{width: '100%',fontWeight: "800",textAlign: "center"}}>
						Take Photo
					</Text>
				</Button>
				<Text>{'\n'}</Text>


				<Text>{'\n'}</Text>

				<Button style={{alignSelf: 'center',width: '80%'}}
												onPress={this.VideoRecording}>
					<Text style={{width: '100%',fontWeight: "800",textAlign: "center"}}>
						Record Video
					</Text>
				</Button>
				<Text>{'\n'}</Text>

				<Image
          style={{width: 200, height: 200}}
          source={{uri: this.state.image ? this.state.image :  'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />

				<Text>{'\n'}</Text>

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

const mapStateToProps = createStructuredSelector({
	selectedSchool: (state) => get(state, 'schooldetail.schooldetail.school'),
	reportText: (state) => get(state, 'report.report.text'),
	reportImages: (state) => get(state, 'report.report.images'),
})
  
const mapDispatchToProps = (dispatch) => ({
	saveReportTextRequest: (text) => dispatch(Actions.saveReportText(text)),

 	createReport: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.createReportRequest(payload, resolve, reject)))
})
	
  export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)

