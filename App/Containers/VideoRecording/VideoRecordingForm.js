import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, CameraRoll } from 'react-native';
import { RNCamera } from 'react-native-camera';

class BadInstagramCloneApp extends Component {

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={'on'}
          zoom={0}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, pauseAfterCapture: true, orientation: 'portrait', exif: true};
      const data = await this.camera.takePictureAsync(options);
      this.camera.resumePreview();
      CameraRoll.saveToCameraRoll(data.uri, "photo")
    }
  };
}

export default BadInstagramCloneApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});