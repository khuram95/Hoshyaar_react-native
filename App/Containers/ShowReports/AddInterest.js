import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Picker } from "react-native";
import { Button } from 'native-base'
import Modal from "react-native-modal";
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'


class AddInterest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      district: '', tehsil: '', school: '', uniqueDistrict: []
      , uniqueTehsil: [], uniqueschool: [], isModalVisible: false,

    };

    this.props.allSchoolsData()
      .then(() => {
        let uniqueDist = [...new Set(get(this.props, 'allSchools').map(school => school.district))];
        this.setState({ uniqueDistrict: uniqueDist })
        let uniqueTeh = [...new Set(get(this.props, 'allSchools').map(school => school.tehsil))];
        this.setState({ uniqueTehsil: uniqueTeh })
        this.setState({ uniqueschool: this.props.allSchools })
        console.log('this.state.uniqueschool', this.state.uniqueschool)
      })
  }
  static navigationOptions = {
    header: null,
  }
  updateDistrict = (district) => {
    this.setState({ district: district })
    this.props.uniqueSchoolData({ district, tehsil: '' })
      .then(() => {
        let uniqueTeh = [...new Set(get(this.props, 'uniqueData').map(school => school.tehsil))];
        this.setState({ uniqueTehsil: uniqueTeh })
      })
  }
  updateTehsil = (tehsil) => {
    this.setState({ tehsil: tehsil })
    this.props.uniqueSchoolData({ district: '', tehsil })
      .then(() => {
        this.setState({ uniqueschool: this.props.uniqueData })
      })
  }
  updateSchool = (school) => {
    this.setState({ school: school })
  }
  addMyInterest = () => {
    const { navigation } = this.props
    this.setState({ isModalVisible: !this.state.isModalVisible });
    navigation.navigate("ShowReports", { id: this.state.school })

  }
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleModal}>
          <Text>Add Interest</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>

            <Text>Select District</Text>
            <View style={styles.pickercontainer}>
              <Picker selectedValue={this.state.district}
                onValueChange={(itemValue, itemIndex) => this.updateDistrict(itemValue)}>
                {this.state.uniqueDistrict && this.state.uniqueDistrict.map((district) =>
                  <Picker.Item label={district} value={district} />)}
              </Picker>
            </View>
            <Text>Select Tehsil</Text>
            <View style={styles.pickercontainer}>
              <Picker selectedValue={this.state.tehsil}
                onValueChange={(itemValue, itemIndex) => this.updateTehsil(itemValue)}>
                {this.state.uniqueTehsil && this.state.uniqueTehsil.map((tehsil) =>
                  <Picker.Item label={tehsil} value={tehsil} />)
                }
              </Picker>
            </View>
            <Text>Select School</Text>
            <View style={styles.pickercontainer}>
              <Picker selectedValue={this.state.school}
                onValueChange={(itemValue, itemIndex) => this.updateSchool(itemValue)}>
                {this.state.uniqueschool && this.state.uniqueschool.map((school) =>
                  <Picker.Item label={school.school_name} value={school} />)}
              </Picker>
            </View>
            <View style={{ flexDirection:'row',justifyContent: 'center',}}>
              <TouchableOpacity onPress={this.addMyInterest}>
                <View style={styles.button}>
                  <Text>Add</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleModal}>
                <View style={styles.button}>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  allSchools: (state) => get(state, 'school.allSchoolsData'),
  uniqueData: (state) => get(state, 'school.uniqueSchoolsData')
})
const mapDispatchToProps = (dispatch) => ({
  allSchoolsData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),
  uniqueSchoolData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.uniqueSchoolsDataRequest(payload, resolve, reject)))
})
export default connect(mapStateToProps, mapDispatchToProps)(AddInterest)


const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  },
  pickercontainer: {
    borderRadius: 10,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});