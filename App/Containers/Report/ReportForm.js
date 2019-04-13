import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView,TextInput } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class CreateReport extends Component{
	constructor(props) {
		super(props);
		this.state = {reportcontent: ''//,imagedata:this.props.navigation.state.params.imagedata
								 };
	}

		showcontent = () => { 
			const reportContent = this.state.reportcontent
			this.props.createReport(reportContent)
			.then(() =>{
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
				onChangeText={(reportcontent) => this.setState({reportcontent})}
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
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
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

const mapStateToProps = (state) => ({
    // loginError: (state) => get(state, 'auth.loginError')
  })
  
  const mapDispatchToProps = (dispatch) => ({
    createReport: (payload) => new Promise((resolve, reject) =>
      dispatch(Actions.createReportRequest(payload, resolve, reject)))
	})
	
  export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)

