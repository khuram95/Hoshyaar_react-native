import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/AntDesign";

class ReportImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisible: false,
    }
  }
  toggleImageModal = () =>
    this.setState({ ModalVisible: !this.state.ModalVisible });

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleImageModal}>
          <Image
            source={{ uri: `http://1bc645f1.ngrok.io${this.props.data.item.image.url}` }}
            style={{ height: 75, width: 75 }}
          />
        </TouchableOpacity>
        <Modal
          isVisible={this.state.ModalVisible}>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.toggleImageModal}>
              <Icon name="closecircle" color="white" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.ModalContent}>
            <Image
              source={{ uri: `http://1bc645f1.ngrok.io${this.props.data.item.image.url}` }}
              style={{ height: 300, width: 300 }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
export default ReportImage

const styles = StyleSheet.create({
  ModalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000ae'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute', // add if dont work with above
  }
})


