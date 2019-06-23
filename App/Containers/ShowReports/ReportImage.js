import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/AntDesign";
import ImageView from 'react-native-image-view';

class ReportImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisible: false,
      loading: false,
      isImageViewVisible: false,
      img: 'http://bb7de9d3.ngrok.io' + this.props.data.item.image.url,
      // img: 'https://hoshyaar.herokuapp.com' + this.props.data.item.image.url,
      data: []
    }
    // console.log("THAT IMAGE I WANT: ", this.state.img)
    this.state.data.push({
      source: {
        uri: this.state.img,
      },
      title: 'Paris',
    });
  }
  // toggleImageModal = () => {
  //   { console.log(this.props.data.item.image.url) }
  //   this.setState({ ModalVisible: !this.state.ModalVisible });
  // }

  render() {
    // Data = []
    // Data.push({
    //   source: {
    //     uri: this.state.img,
    //   },
    //   title: 'Paris',
    // });
    return (
      <View>
        <TouchableOpacity onPress={() => { this.setState({ isImageViewVisible: !this.state.isImageViewVisible }) }}>

          <Image
            // source={{ uri: `http://eea80ed5.ngrok.io${this.props.data.item.image.url}` }}
            source={{ uri: this.state.img }}
            style={{ height: 75, width: 75 }}
            onLoadStart={() => this.setState({ loading: true })}
            onLoadEnd={() => this.setState({ loading: false })}
          />
          {this.state.loading && <ActivityIndicator size="large" color="#0000ff" />}
        </TouchableOpacity>

        {/* THIS IS IMAGE VIEWER SLIDER */}
        <ImageView
          // glideAlways
          images={this.state.data}
          imageIndex={0}
          animationType="fade"
          isVisible={this.state.isImageViewVisible}
          // renderFooter={this.renderFooter}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
        {/* <Modal
            isVisible={this.state.ModalVisible}> */}
        {/* <View style={styles.container}> */}
        {/* <TouchableOpacity onPress={this.toggleImageModal}>
              <Icon name="closecircle" color="white" size={40} />
            </TouchableOpacity> */}
        {/* </View> */}
        {/* <View style={styles.ModalContent}>
              <Image
                source={{ uri: `http://eea80ed5.ngrok.io${this.props.data.item.image.url}` }}
                style={{ height: 300, width: 300 }}
              />
            </View>
          </Modal> */}
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
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute', // add if dont work with above
  }
})


