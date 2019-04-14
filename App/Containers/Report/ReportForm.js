import React, { Component } from 'react'
import {
	View, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Linking,
	ScrollView, TextInput
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import Images from '../../Themes/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

class CreateReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: get(this.props, 'selectedSchool.school'),
			image: get(this.props, 'reportImages.images'),
			uri: get(this.props, 'reportImages.images.uri'),
		};
		// console.log('Image in report : ', get(this.props, 'reportImages.images.uri'))
		// this.getReadyStates.bind(this);
		// this.getReadyStates();
	}

	// getReadyStates = () => {
	// 	this.state = {
	// 		school: get(this.props, 'selectedSchool.school'),
	// 		image: get(this.props, 'reportImages.images'),
	// 	};
	// 	console.log('getReadyStates: ', this.state.image);
	// }

	// componentDidMount(){
	// 	console.log('componentDidMount: ', this.state.image);
	// 	this.getReadyStates();
	// }

	showcontent = () => {
		this.props.createReport({
			reportContent: get(this.props, 'reportText.text.reportcontent'),
			school_id: this.state.school.emis,
			user_id: 17,
			image: this.state.uri
		})
			.then(() => {
				// this.props.saveReportTextRequest('')
			})
	}

	OpenCamera = () => {
		const { navigation } = this.props
		navigation.navigate("Camera")
	}


	AudioRecorder = () => {
		// const { navigation } = this.props
		// navigation.navigate("MediaPicker")
		console.log('image in Report is : ', this.state.image);
		console.log('Props is : ', this.props);
	}


	selectPhotoTapped() {
		const options = {
			mediaType: 'photo'
		};

		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled photo picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				// let source = { uri: response.uri };

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
			}
			this.setState({
				image: response
			});
		});
	}

	render() {
		return (
			<View>
				<Text style={{ textAlign: "center" }}>Create Report</Text>

				{<Text>{this.state.school.school_name}</Text>}

				<TextInput
					multiline={true}
					numberOfLines={6}
					editable={true}
					maxLength={255}
					value={get(this.props, 'reportText.text.reportcontent')}
					onChangeText={(reportcontent) => this.props.saveReportTextRequest({ reportcontent })}
				/>

				<View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
					<TouchableOpacity onPress={this.OpenCamera.bind(this)}>
						<Icon name="camera" size={40} />
					</TouchableOpacity>

					<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
						<Icon name="image" size={40} />
					</TouchableOpacity>

					<TouchableOpacity onPress={this.AudioRecorder.bind(this)}>
						<Icon name="microphone" size={40} />
					</TouchableOpacity>
				</View>

				<Image
					style={{ width: 200, height: 200 }}
					source={{ uri: this.state.uri ? this.state.uri : 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/>

				<Text>{'\n'}</Text>

				<Button style={{ alignSelf: 'center', width: '80%' }}
					onPress={this.showcontent}>
					<Text style={{ width: '100%', fontWeight: "800", textAlign: "center" }}>
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

