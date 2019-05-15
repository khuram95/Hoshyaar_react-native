import React, { Component } from 'react'
import {
	View,
	Image,
	TouchableOpacity,
	ImageBackground,
	KeyboardAvoidingView,
	Linking,
	ScrollView,
	TextInput,
	ToastAndroid
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import Images from '../../Themes/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AudioRecorder from '../AudioRecorder'

class CreateReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: get(this.props, 'selectedSchool.school'),
			image: get(this.props, 'reportImages.images'),
			uri: get(this.props, 'reportImages.images.uri'),
			visible: false,


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
			user_id: this.props.currentUser.id,
			image: this.state.uri,
			audio: get(this.props, 'reportAudio.audio'),
		})
			.then(() => {
				alert("Report Shared")
				this.props.saveReportTextRequest('')
				const { navigation } = this.props
				navigation.navigate("DashBoard")
			})
	}

	OpenCamera = () => {
		const { navigation } = this.props
		navigation.navigate("Camera")
	}


	AudioRecorder = () => {
		// const { navigation } = this.props
		// navigation.navigate("MediaPicker")
		ToastAndroid.showWithGravity('Long Press To Record!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
		// console.log('image in Report is : ', this.state.image);
		// console.log('Props is : ', this.props);
	}


	selectPhotoTapped() {
		const options = {
			mediaType: 'photo'
		};

		ImagePicker.openPicker({
			multiple: true,
			mediaType: "photo",
			includeExif: true,
		}).then(images => {
			console.log(images);
			this.props.saveReportImage(images);
		});

		// console.log("IMAGES SAVED: ", get(this.props, 'reportImages.images'))
		// ImagePicker.launchImageLibrary(options, (response) => {
		// 	if (response.didCancel) {
		// 		console.log('User cancelled photo picker');
		// 	} else if (response.error) {
		// 		console.log('ImagePicker Error: ', response.error);
		// 	} else if (response.customButton) {
		// 		console.log('User tapped custom button: ', response.customButton);
		// 	} else {
		// 		// let source = { uri: response.uri };

		// 		// You can also display the image using data:
		// 		// let source = { uri: 'data:image/jpeg;base64,' + response.data };
		// 	}
		// 	this.setState({
		// 		image: response,
		// 		uri: response.uri
		// 	});
		// });
	}

	handlePressIn() {
		setTimeout(() => {
			ToastAndroid.showWithGravity('Press In', ToastAndroid.SHORT, ToastAndroid.CENTER);
		}, 100)

		this.setState({
			isRecorderVisible: !this.state.isRecorderVisible
		});
	}

	handlePressOut() {
		setTimeout(() => {
			ToastAndroid.showWithGravity('Press Out', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
		}, 100)
	}

	renderRecorder() {
		if (this.state.isRecorderVisible) {
			// console.log('Lo g kya save hua wa tha? ', get(this.props, 'reportAudio.audio'));
			return (
				<AudioRecorder />
			);
		} else {
			return null;
		}
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

					<TouchableOpacity
						onPressIn={this.handlePressIn.bind(this)}
						onPressOut={this.handlePressOut.bind(this)}
					>
						<Icon name="microphone" size={40} />
					</TouchableOpacity>
				</View>
				{this.renderRecorder()}

				<Image
					style={{ width: 200, height: 200 }}
					source={{ uri: this.state.uri ? this.state.uri : 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/>

				<Text>{'\n'}</Text>


				<Button style={{ alignSelf: 'center', width: '80%' }}
					onPress={this.showcontent}>
					<Text style={{ width: '100%', fontWeight: "800", textAlign: "center" }}>
						SHARE REPORT
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
	currentUser: (state) => get(state, 'auth.currentUser'),
	reportAudio: (state) => get(state, 'report.report.audio'),
})

const mapDispatchToProps = (dispatch) => ({
	saveReportTextRequest: (text) => dispatch(Actions.saveReportText(text)),
	saveReportImage: (images) => dispatch(Actions.saveReportImageLocal(images)),
	createReport: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.createReportRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)
