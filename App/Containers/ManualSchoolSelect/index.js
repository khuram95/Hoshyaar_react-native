import React, { Component } from 'react'
import { View, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import { Item as FormItem, Text, Button } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import DrawLayout from '../DrawLayout'


class ManualSchoolSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: '', tehsil: '', school: '',
      button_enable: true, tehsil_enable: false, school_enable: false
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

  gotoSchoolDetail = () => {
    const { navigation } = this.props
    navigation.navigate("SchoolDetail", { id: this.state.school })
  }
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Loader isShow={this.props.requesting == undefined ? false : this.props.requesting} />
        <DrawLayout title="Manual Select" image='' />
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
        <View style={styles.containerOk}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.gotoSchoolDetail}
            disabled={this.state.button_enable}
          >
            <Text> Ok </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  allSchools: (state) => get(state, 'school.allSchoolsData'),
  uniqueData: (state) => get(state, 'school.uniqueSchoolsData'),
  allDistricts: (state) => get(state, 'school.districts'),
  allTehsils: (state) => get(state, 'school.tehsils'),
  requesting: (state) => get(state, 'school.requesting'),

})
const mapDispatchToProps = (dispatch) => ({
  getDistrict: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getDistrictsRequest(payload, resolve, reject))),
  getTehsil: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getTehsilsRequest(payload, resolve, reject))),

  allSchoolsData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),
})
export default connect(mapStateToProps, mapDispatchToProps)(ManualSchoolSelect)
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
    borderRadius: 10,
    borderWidth: 1,
  },
  containerOk: {
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#841584',
    padding: 10
  },
})