import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'


class CameraRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      uri: null,
    };
  }

  CreateReport = () => {
    const { navigation } = this.props
    this.props.saveReportImage(this.state.uri)
    navigation.navigate("Report", { imageUri: this.state.uri } )
  }



  takePicture() {
    console.log("picture")
    this.camera.capture()
      .then((data) => {
        console.log("hello g i am in take picture" , data)
        this.setState({ uri: data.mediaUri })
      })
      .catch(err => console.error(err));
  }


  saveButtonHandle(){
    this.CreateReport()
  }

  cancelButtonHandle(){
    this.setState({ uri: null })
    this.CreateReport()
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget= {Camera.constants.CaptureTarget.cameraRoll}
        type = { Camera.constants.Type.front }
        playSoundOnCapture = { false }
        metadata
      >

        <Text
          style={styles.cancel}
          onPress={() => this.cancelButtonHandle()}
        >Cancel
        </Text>

        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >


          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        
        <Image
          source={{ uri: this.state.uri }}
          style={styles.preview}
        />

        <Text
          style={styles.save}
          onPress={() => this.saveButtonHandle()}
          >save
        </Text>


        <Text
          style={styles.cancel}
          onPress={() => this.cancelButtonHandle()}
        >Cancel
        </Text>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.uri ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  saveReportImage: (images) => dispatch(Actions.saveReportImageLocal(images))
})
	
export default connect(null, mapDispatchToProps)(CameraRoute)





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
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

  