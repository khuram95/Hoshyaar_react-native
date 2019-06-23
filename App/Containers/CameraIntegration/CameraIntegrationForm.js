import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  CameraRoll,
  Dimensions,
  Image,
  Keyboard,
  
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import ImagePicker from 'react-native-image-crop-picker';


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

class CameraScreen extends React.Component {
  state = {
    image: [],
    storedImages: get(this.props, 'reportImages.images'),
    uri: null,
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 10,
      quality: RNCamera.Constants.VideoQuality['480p'],
      // maxFile  Size: 1 * 1024 * 512,
      videoBitrate: 1 * 1024 * 512,
    },
    isRecording: false,
    position: null,
  };

  componentDidMount = () => {
    Keyboard.dismiss();
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function () {
    if (this.camera) {
      const options = {
        quality: 0.01,
        pauseAfterCapture: false,
        exif: true,
        orientation: "portrait",
        fixOrientation: true,
        skipProcessing: true
      };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        uri: data,
      });
    }

    this.renderImage();
  };

  renderImage() {
    // console.log('kya waqai: ', this.state.uri.uri)
    return (
      <View style={styles.preview}>

        <Image
          source={{ uri: this.state.uri.uri }}
          style={styles.preview}
        />

        <Text
          style={styles.save}
          onPress={() => this.saveButtonHandler()}
        >Continue
        </Text>

        {/* <Text
          style={styles.more}
          onPress={() => this.cancelButtonHandler()}
        >Take More 
        </Text> */}

        <Text
          style={styles.cancel}
          onPress={() => this.cancelButtonHandler()}
        >Cancel
        </Text>

      </View>
    );
  }

  saveButtonHandler() {
    CameraRoll.saveToCameraRoll(this.state.uri.uri, "photo");

    one = []
    one = get(this.props, 'reportImages.images')
    arr = []
    if (one) {
      for (let i = 0; one[i]; i++) {
        // console.log('Ahan- '+i+': ', one[i])
        arr.push(one[i])
      }
    }
    arr.push(this.state.uri.uri)

    this.props.saveReportImage(arr);
    // console.log('Kuch aya?: ', arr)

    const { navigation } = this.props
    // navigation.navigate("Report");
    navigation.pop()
  }

  cancelButtonHandler() {
    this.setState({ uri: null })
  }

  takeVideo = async function () {
    // console.log("started camera recodring");
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          // console.warn('DATA URI: ', data.uri);
          CameraRoll.saveToCameraRoll(data.uri, "video");
          this.props.saveReportVideo(data.uri);
          // console.warn('SAVED VIDEO: ', data);
          const { navigation } = this.props
          // console.log('PARAM: ', navigation)
          navigation.state.params.doSomething()
          navigation.pop()
          // navigation.navigate("Report");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  stopVideo = async function () {
    if (this.camera) {
      try {
        const promise = this.camera.stopRecording();

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          // console.warn('stopVideo', data.uri);
          CameraRoll.saveToCameraRoll(data.uri, "video")
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? this.stopVideo.bind(this) : this.takeVideo.bind(this)}
          >
            {this.state.isRecording ? (
              <Text style={styles.flipText}> ☕ </Text>
            ) : (
                <Text style={styles.flipText}> REC </Text>
              )}
          </TouchableOpacity>
        </View>
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
        )}
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
  }

  render() {
    // return <View style={styles.container}>{this.renderCamera()}</View>;
    return (
      <View style={styles.container}>
        {this.state.uri ? this.renderImage() : this.renderCamera()}
      </View>
    );

  }
}
const mapStateToProps = createStructuredSelector({
  reportImages: (state) => get(state, 'report.report.images'),
})
const mapDispatchToProps = (dispatch) => ({
  saveReportImage: (images) => dispatch(Actions.saveReportImageLocal(images)),
  saveReportVideo: (video) => dispatch(Actions.saveReportVideoLocal(video))
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width
  },
  cancel: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  more: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  save: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});
