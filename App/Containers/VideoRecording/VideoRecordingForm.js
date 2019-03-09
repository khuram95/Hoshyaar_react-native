import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { cloneableGenerator } from 'redux-saga/utils';



class VideoRecordingForm extends Component {

  constructor(props){
    super(props)
    this.state={
      recording: false,
      processing: false
    }
  }

  async startRecording() {
      
    this.setState({ recording: true });   
    const { uri, codec = "mp4" } = await this.camera.recordAsync();
    this.setState({ recording: false, processing: true });
    const type = `video/${codec}`;
    const data = new FormData();
    
    data.append("video", {
      name: "mobile-video-upload",
      type,
      uri
    });
    this.setState({ processing: false });
  }

  stopRecording() {
    this.camera.stopRecording();
  }


  render() {
    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Text style={{ fontSize: 18 }}> RECORD </Text>
      </TouchableOpacity>
      
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 18 }}> STOP </Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}

          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          {button}
        </View>
      </View>
    );
  }
  
}
export default VideoRecordingForm;
  