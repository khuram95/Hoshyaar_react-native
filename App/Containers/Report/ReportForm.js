import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  TextInput,
  ToastAndroid,
  StyleSheet,
  Alert,
  Modal,
  Image,
  FlatList,
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoGrid from 'react-native-thumbnail-grid'
import DrawLayout from '../DrawLayout'
import AudioRecorder from '../AudioRecorder'
import ImageView from 'react-native-image-view';
import Video from 'react-native-af-video-player'
import RNThumbnail from 'react-native-thumbnail';

class CreateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: get(this.props, 'selectedSchool.school'),
      image: get(this.props, 'reportImages.images'),
      uri: get(this.props, 'reportImages.images.uri'),
      videoUri: get(this.props, 'reportVideo.video'),
      visible: false,
      isButtonEnable: true,
      isImageViewVisible: false,
      isVideoVisible: false,
      thumbnail: get(this.props, 'reportVideo.video') ? get(this.props, 'reportVideo.video') : null,
      modalVisible: false,
      latitude: null,
      longitude: null,
    };
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount = () => {
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }, (error) => console.log(error));
  }

  showcontent = () => {
    this.props.createReport({
      reportContent: get(this.props, 'reportText.text.reportcontent'),
      school_id: this.state.school.emis,
      user_id: this.props.currentUser.id,

      // image: this.state.uri,
      // school_id: 123456,
      // user_id: 70,
      image: get(this.props, 'reportImages.images'),
      video: get(this.props, 'reportVideo.video'),
      audio: get(this.props, 'reportAudio.audio'),
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    })
      .then(() => {
        alert("Report Shared")
        this.props.saveReportTextRequest('')
        const { navigation } = this.props
        navigation.popToRoute()
        // navigation.navigate("DashBoard")
      })
  }

  OpenCamera = () => {
    const { navigation } = this.props
    navigation.push("Camera")
    // navigation.navigate("Camera")
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
      compressImageQuality: 0.01,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then((video) => {
      // console.log('saving video: ', video);
      if ((video.size / 1000000) < 2.0) {
        this.props.saveReportVideo(video.path);
        this.setState({ videoUri: video.path })

        RNThumbnail.get(this.state.videoUri).then((result) => {
          // console.log('this is thumbnail: ', result.path); // thumbnail path
          this.setState({
            thumbnail: result.path,
          })
        })
      }
      else
        ToastAndroid.showWithGravity('Video size is greater than 2 MB!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
    });
  }

  selectPhotoHandler() {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
      includeExif: true,
      // compressImageMaxWidth: 400,
      // compressImageMaxHeight: 400,
      compressImageQuality: 0.05,
      maxFiles: 3,
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
          if ((images[i].size / 1000000) < 2.0)
            arr.push(images[i].path)
          else
            ToastAndroid.showWithGravity('Image size is greater than 2 MB!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
      }

      this.props.saveReportImage(arr);
      // console.log('SIZE OF IMAGE: ', images[0].size)
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

  enableButton(content) {
    if (content.length >= 50) {
      this.setState({
        isButtonEnable: false
      })
    } else {
      this.setState({
        isButtonEnable: true
      })
    }
  }

  showImage(uri) {
    this.setState({
      isImageViewVisible: !this.state.isImageViewVisible,
      imageIndex: !this.state.imageIndex
    })
  }

  renderFooter({ title }) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>{title}</Text>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>♥</Text>
          <Text style={[styles.footerText, { marginLeft: 7 }]}></Text>
        </TouchableOpacity>
      </View>
    );
  }

  setModalVisible() {

  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { isImageViewVisible, imageIndex } = this.state;

    // recordedVideo = get(this.props, 'reportVideo.video')
    // recordedVideo? this.setState({thumbnail: recordedVideo}):null

    allImages = []
    allImages[0] = get(this.props, 'reportImages.images')
    strData = JSON.stringify(allImages);

    res = strData.split(',')

    Data = []
    uri1 = []
    for (i = 0; i < res.length; i++) {
      img = res[i]
      if (res.length == 1) {
        img = img.slice(0, 0).concat(img.slice(0 + 3, img.length))
        img = img.slice(0, img.length - 3)
      } else if (res.length == 2) {
        if (i == 0) {
          img = img.slice(0, 0).concat(img.slice(0 + 3, img.length))
          img = img.slice(0, img.length - 1)
        } else if (i == 1) {
          img = img.slice(0, 0).concat(img.slice(0 + 1, img.length))
          img = img.slice(0, img.length - 3)
        }
      } else {
        if (i == 0) {
          img = img.slice(0, 0).concat(img.slice(0 + 3, img.length))
          img = img.slice(0, img.length - 1)
        } else if (i == res.length - 1) {
          img = img.slice(0, 0).concat(img.slice(0 + 1, img.length))
          img = img.slice(0, img.length - 3)
        } else {
          img = img.slice(0, 0).concat(img.slice(0 + 1, img.length))
          img = img.slice(0, img.length - 1)
        }
      }

      Data.push({
        source: {
          uri: img,
        },
        title: 'Paris',
        // width: 806,
        // height: 720,
      });
    }

    return (
      <View style={styles.container}>
        <Loader isShow={this.props.requesting == undefined ? false : this.props.requesting} />
        <DrawLayout title="Create Report" />
        {<Text style={styles.title}> {this.state.school.school_name} </Text>}
        <View style={styles.reportBase}>
          <TextInput
            keyboardType="email-address"
            placeholder="Type some description here..."
            multiline={true}
            numberOfLines={6}
            editable={true}
            maxLength={1000}
            value={get(this.props, 'reportText.text.reportcontent')}
            onChangeText={(reportcontent) => {
              this.props.saveReportTextRequest({ reportcontent })
              this.enableButton(reportcontent)
            }}
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

        {/* THIS IS IMAGE VIEWER SLIDER */}
        <ImageView
          glideAlways
          images={Data}
          imageIndex={0}
          animationType="fade"
          isVisible={isImageViewVisible}
          // renderFooter={this.renderFooter}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />

        {/* THIS IS PHOTO GRID */}
        <View style={styles.media}>
          <View style={styles.photoGrid}>
            <PhotoGrid
              // height={'50%'}
              // ratio={2}
              source={get(this.props, 'reportImages.images')}
              onPressImage={(uri) => {
                this.showImage(uri)
              }} />
          </View>

          {/* THIS IS VIDEO THUMBNAIL */}
          <View style={styles.video}>
            {this.state.thumbnail ?
              <View style={styles.thumbnail}>
                <TouchableOpacity style={styles.thumbnail} onPress={() => { this.setModalVisible(true); }}>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ isStatic: true, uri: this.state.thumbnail }} />

                  <View style={styles.playIcon}>
                    <Icon name="play-circle-o" size={40} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
              : null}
          </View>
        </View>

        {/* THIS IS VIDEO PLAYER MODAL */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View>
            <Video url={this.state.videoUri} />
            <Button
              style={styles.shareButton}
              onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
              <Text style={styles.shareButtonText}> Close Video </Text>
            </Button>
          </View>
        </Modal>

        {/* THIS IS REPORT CREATE BUTTON */}
        <Button
          style={styles.shareButton}
          onPress={this.showcontent}
          disabled={this.state.isButtonEnable}>
          <Text style={styles.shareButtonText}> SHARE REPORT </Text>
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
  requesting: (state) => get(state, 'report.requesting'),

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
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
  },
  reportBase: {
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  media: {
    flex: 1,
    flexDirection: 'row',
  },
  photoGrid: {
    flex: 2,
  },
  video: {
    flex: 1,
    height: '50%',
  },
  thumbnail: {
    flex: 1,
    justifyContent: 'center',
  },
  playIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  shareButton: {
    alignSelf: 'center',
    width: '99%',
  },
  shareButtonText: {
    width: '100%',
    fontWeight: "800",
    textAlign: "center"
  },
});