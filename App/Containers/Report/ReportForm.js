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
	ToastAndroid,
	StyleSheet,
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import Images from '../../Themes/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoGrid from 'react-native-thumbnail-grid'
import DrawLayout from '../DrawLayout'
import AudioRecorder from '../AudioRecorder'
import Loader from '../Loader'

class CreateReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: get(this.props, 'selectedSchool.school'),
			image: get(this.props, 'reportImages.images'),
			uri: get(this.props, 'reportImages.images.uri'),
			visible: false,
		};
	}

	showcontent = () => {
		this.props.createReport({
			reportContent: get(this.props, 'reportText.text.reportcontent'),
			// school_id: this.state.school.emis,
			// user_id: this.props.currentUser.id,

			// image: this.state.uri,
			school_id: 123456,
			user_id: 70,
			image: get(this.props, 'reportImages.images'),
			video: get(this.props, 'reportVideo.video'),
			audio: get(this.props, 'reportAudio.audio'),
		})
			.then(() => {
				alert("Report Shared")
				this.props.saveReportTextRequest('')
				// const { navigation } = this.props
				// navigation.navigate("DashBoard")
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


	selectVideoHandler() {
		ImagePicker.openPicker({
			mediaType: "video",
			includeExif: true,
		}).then((video) => {
			console.log(video);
			this.props.saveReportVideo(video.path);
		});
	}

	selectPhotoHandler() {
		ImagePicker.openPicker({
			multiple: true,
			mediaType: "photo",
			includeExif: true,
			compressImageQuality: 0.3,
		}).then(images => {
			one = []
			one = get(this.props, 'reportImages.images')
			arr = []
			if (one) {
				for (let i = 0; one[i]; i++) {
					arr.push(one[i])
				}
			}
			if (images) {
				for (let i = 0; images[i]; i++) {
					arr.push(images[i].path)
				}
			}

			this.props.saveReportImage(arr);
			console.log('Kuch aya?: ', arr)
		});
	}

	handlePressIn() {
		// setTimeout(() => {
		// 	ToastAndroid.showWithGravity('Press In', ToastAndroid.SHORT, ToastAndroid.CENTER);
		// }, 100)

		this.setState({
			isRecorderVisible: !this.state.isRecorderVisible
		});
	}

	handlePressOut() {
		// setTimeout(() => {
		// 	ToastAndroid.showWithGravity('Press Out', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
		// }, 100)
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
			<View style={styles.container}>
				<DrawLayout title="Create Report" />
				{/* <Text style={{ textAlign: "center" }}>Create Report</Text> */}

				{/* {<Text>{this.state.school.school_name}</Text>} */}
				{<Text style={styles.title}> {'this.state.school.school_name'} </Text>}

				<View style={styles.reportBase}>
					<TextInput
						keyboardType="email-address"
						placeholder="Type some description here..."
						multiline={true}
						numberOfLines={6}
						editable={true}
						maxLength={255}
						value={get(this.props, 'reportText.text.reportcontent')}
						onChangeText={(reportcontent) => this.props.saveReportTextRequest({ reportcontent })}
					/>

					<View style={styles.icons}>
						{
							this.state.isRecorderVisible ? this.renderRecorder() :
								<React.Fragment>
									<TouchableOpacity onPress={this.OpenCamera.bind(this)}>
										<Icon name="camera" size={40} color="#841584" />
									</TouchableOpacity>

									<TouchableOpacity onPress={this.selectPhotoHandler.bind(this)}>
										<Icon name="file-picture-o" size={40} color="#841584" />
									</TouchableOpacity>

									<TouchableOpacity onPress={this.selectVideoHandler.bind(this)}>
										<Icon name="file-video-o" size={40} color="#841584" />
									</TouchableOpacity>
								</React.Fragment>
						}
						<TouchableOpacity
							onPressIn={this.handlePressIn.bind(this)}
							onPressOut={this.handlePressOut.bind(this)}
						>
							{this.state.isRecorderVisible ? <Icon2 name="cancel" size={40} color="#841584" /> : <Icon name="microphone" size={40} color="#841584" />}
						</TouchableOpacity>
					</View>


				</View>

				{/* <Image
					style={{ width: 200, height: 200 }}
					source={{ uri: this.state.uri ? this.state.uri : 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/> */}

				<View style={styles.photoGrid}>
					<PhotoGrid height={'100%'} source={get(this.props, 'reportImages.images')} onPressImage={uri => this.showImage(uri)} />
				</View>

				{/* <Text>{'\n'}</Text> */}

				<Button style={styles.shareButton}
					onPress={this.showcontent}>
					<Text style={styles.shareButtonText}>
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
	reportVideo: (state) => get(state, 'report.report.video'),
	currentUser: (state) => get(state, 'auth.currentUser'),
	reportAudio: (state) => get(state, 'report.report.audio'),
})

const mapDispatchToProps = (dispatch) => ({
	saveReportTextRequest: (text) => dispatch(Actions.saveReportText(text)),
	saveReportImage: (images) => dispatch(Actions.saveReportImageLocal(images)),
	saveReportVideo: (video) => dispatch(Actions.saveReportVideoLocal(video)),
	createReport: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.createReportRequest(payload, resolve, reject)))

})

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)


const styles = StyleSheet.create({
	title: {
		alignSelf: 'center',
	},
	container: {
		flex: 1, justifyContent: "center", backgroundColor: "#fff", alignItems: "stretch", flexDirection: 'column'
	},
	reportBase: {
		flex: 1,
		flexDirection: 'column',
	},
	icons: {
		// flex:1,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	photoGrid: {
		flex: 2,
		width: '100%',
		justifyContent: 'flex-start',
		alignSelf: 'auto'
	},
	shareButton: {
		// flex:1,
		alignSelf: 'center',
		width: '99%',
		position: 'relative'
	},
	shareButtonText: {
		width: '100%',
		fontWeight: "800",
		textAlign: "center"
	},

});