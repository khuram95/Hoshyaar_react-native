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
      district: '', tehsil: '', school: '',
      button_enable: true, tehsil_enable: false, school_enable: false, isModalVisible: false,
    };

    this.props.getDistrict()
      .then((response) =>
        console.log("hahhasdah", get(this.props))
      )
  }
  static navigationOptions = {
    header: null,
  }
  updateDistrict = (district) => {
    this.setState({ district: district })
    this.setState({ tehsil_enable: true })
    this.props.getTehsil({ district })
      .then(() => {
        this.setState({ tehsil_enable: true })
        console.log('ok')
      })
  }
  updateTehsil = (tehsil) => {
    this.setState({ tehsil: tehsil })
    this.setState({ school_enable: true })
    this.props.allSchoolsData({ tehsil })
      .then(() => {
        this.setState({ school_enable: true })
        console.log('tehsil was going')
      })
  }

  updateSchool = (school) => {
    this.setState({ school: school })
    this.setState({ button_enable: false })
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
            <View style={styles.container}>
              <Picker selectedValue={this.state.district}
                onValueChange={(itemValue, itemIndex) => this.updateDistrict(itemValue)}>
                {get(this.props, 'allDistricts').map((district) =>
                  <Picker.Item label={district} value={district} />)}
              </Picker>
            </View>

            <Text>Select Tehsil</Text>
            {get(this.props, 'allTehsils') &&
              <View style={styles.container}>
                <Picker selectedValue={this.state.tehsil}
                  enabled={this.state.tehsil_enable}
                  onValueChange={(itemValue, itemIndex) => this.updateTehsil(itemValue)}>
                  {get(this.props, 'allTehsils').map((tehsil) =>
                    <Picker.Item label={tehsil} value={tehsil} />)
                  }
                </Picker>
              </View>
            }
            <Text>Select School</Text>
            {get(this.props, 'allSchools') &&
              <View style={styles.container}>
                <Picker selectedValue={this.state.school}
                  enabled={this.state.school_enable}
                  onValueChange={(itemValue, itemIndex) => this.updateSchool(itemValue)}>
                  {get(this.props, 'allSchools').map((school) =>
                    <Picker.Item label={school.school_name} value={school} />)}
                </Picker>
              </View>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.addMyInterest}
                disabled={this.state.button_enable}
              >
                <Text> ADD </Text>
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
  uniqueData: (state) => get(state, 'school.uniqueSchoolsData'),
  allDistricts: (state) => get(state, 'school.districts'),
  allTehsils: (state) => get(state, 'school.tehsils'),
})
const mapDispatchToProps = (dispatch) => ({
  getDistrict: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getDistrictsRequest(payload, resolve, reject))),
  getTehsil: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getTehsilsRequest(payload, resolve, reject))),

  allSchoolsData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),
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