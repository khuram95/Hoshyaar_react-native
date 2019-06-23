import React, { Component } from 'react'
import { View, Text, Picker, StyleSheet, ScrollView, CheckBox, TouchableOpacity, FlatList, ToastAndroid, Dimensions } from 'react-native'
import { Item as FormItem, Button } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import RadioForm from 'react-native-simple-radio-button';
import Icon from "react-native-vector-icons/Entypo";
import DatePicker from 'react-native-datepicker'
import Divider from 'react-native-divider';

class ChartForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '', enable: true,
      district: '', tehsil: '', school: '',
      tehsil_enable: false, school_enable: false,
      compArr: [],
      compItems: [],
      total_teacher: false,
      student_enrolled: false,
      avaliable_fund: false,
      no_of_Schools: false,
      is_toilet_functional: false,
      is_drinking_water_avaliable: false,
      is_boundary_wall: false,
      is_electricity_avaliable: false,
      fromdate: "2019-01-01",
      todate: "2019-05-01",
    }
  }
  static navigationOptions = {
    header: null,
  }
  toggleRadioButton = (value) => {
    this.setState({ value: value })
    this.state.compArr = []
    this.props.getDistrict()
  }
  updateDistrict = (district) => {
    this.setState({ district: district })
    this.setState({ tehsil_enable: true })
    this.props.getTehsil({ district })
      .then(() => {
        this.setState({ tehsil_enable: true })
      })
  }
  updateTehsil = (tehsil) => {
    this.setState({ tehsil: tehsil })
    this.setState({ school_enable: true })
    this.props.allSchoolsData({ tehsil })
      .then(() => {
        this.setState({ school_enable: true })
      })
  }
  updateSchool = (school) => {
    this.setState({ school: school })
    this.setState({ button_enable: false })
  }
  addValue = () => {
    // var items = [...this.state.compArr];
    // let isfind = items.find(function (item) {
    //   return item === this.state.district ||
    //     item === this.state.tehsil ||
    //     item === this.state.school
    // })

    if (this.state.compArr.length < 2) {
      (this.state.district && !this.state.tehsil && !this.state.school) &&
        this.setState({ compArr: [...this.state.compArr, this.state.district] });
      (this.state.district && this.state.tehsil && !this.state.school) &&
        this.setState({ compArr: [...this.state.compArr, this.state.tehsil] });
      (this.state.district && this.state.tehsil && this.state.school) &&
        this.setState({ compArr: [...this.state.compArr, this.state.school] });
    } else {
      ToastAndroid.showWithGravity('You can Select only two Districts,Tehsil or School ', ToastAndroid.LONG, ToastAndroid.CENTER)
    }
  }
  toggleRemoveItem = (item) => {
    var array = [...this.state.compArr];
    var index = array.indexOf(item)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ compArr: array });
    }
  }
  toggleCheckbox = (item) => {
    this.setState({ [item]: !this.state[item] })
    var array = [...this.state.compItems];
    var index = array.indexOf(item)
    if (!this.state[item] && index == -1) {
      this.setState({ compItems: [...this.state.compItems, item] });
    }
    else if (this.state[item] && index !== -1) {
      array.splice(index, 1);
      this.setState({ compItems: array });
    }
  }
  submitAdHocParams = () => {
    if (this.state.compArr && this.state.compItems && this.state.fromdate && this.state.todate && this.state.value) {
      this.props.ComparisonOn({
        comparisonBetween: this.state.compArr,
        comparisonOn: this.state.compItems,
        fromDate: this.state.fromdate,
        toDate: this.state.todate,
        comparisonName: this.state.value
      })
        .then(() => {
          const { navigation } = this.props
          navigation.navigate("CreateChart"
            , {
              comparisonBetween: this.state.compArr,
              comparisonOn: this.state.compItems,
              fromDate: this.state.fromdate,
              toDate: this.state.todate,
              comparisonName: this.state.value
            }
          )
        })
    }
    else {
      ToastAndroid.showWithGravity('Please select the required fields ', ToastAndroid.LONG, ToastAndroid.CENTER)
    }
  }

  render() {

    const radio_props = [
      { label: 'District', value: 'district' },
      { label: 'Tehsil', value: 'tehsil' },
      { label: 'School', value: 'school' }

    ];
    const comparisonItems = [
      { key: { text: 'Total Teacher', CheckboxValue: 'total_teacher', } },
      { key: { text: 'Student Enrolled', CheckboxValue: 'student_enrolled', } },
      { key: { text: 'Education Budget', CheckboxValue: 'avaliable_fund', } },
      // { key: { text: 'No of Schools', CheckboxValue: 'no_of_Schools', } },
      { key: { text: 'Toilet Facility', CheckboxValue: 'is_toilet_functional', } },
      { key: { text: 'Drinking Water', CheckboxValue: 'is_drinking_water_avaliable', } },
      { key: { text: 'Boundary Wall', CheckboxValue: 'is_boundary_wall', } },
      { key: { text: 'Electricity Facility', CheckboxValue: 'is_electricity_avaliable', } },
    ]
    return (
      <View style={styles.mainContainer}>
        {/* <Loader isShow={this.props.requestingad == undefined ? false : this.props.requestingad} /> */}
        {/* <Loader isShow={this.props.requesting == undefined ? false : this.props.requesting} /> */}
        <View style={{ height: '50%' }}>
          <Text>{'\n'}</Text>
          <View style={styles.radioButtons}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              labelStyle={{ fontSize: 18 }}
              buttonSize={14}
              onPress={(value) => this.toggleRadioButton(value)}
            />
          </View>

          {/* Drop Down Menus */}
          <View style={styles.dropdownContainer}>
            {(this.state.value == 'district' || this.state.value == 'tehsil' || this.state.value == 'school') &&
              <View>
                <Text style={styles.lableName}>Select District</Text>
                <View style={styles.container}>
                  <Picker selectedValue={this.state.district}
                    onValueChange={(itemValue, itemIndex) => this.updateDistrict(itemValue)}>
                    {get(this.props, 'allDistricts').map((district) =>
                      <Picker.Item label={district} value={district} />)}
                  </Picker>
                </View>
              </View>
            }
            {(this.state.value == 'tehsil' || this.state.value == 'school') &&
              <View>
                <Text style={styles.lableName}>Select Tehsil</Text>
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
              </View>
            }
            {(this.state.value == 'school') &&
              <View>
                <Text style={styles.lableName}>Select School</Text>
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
              </View>
            }
          </View>
          <Button
            style={styles.shareButton}
            onPress={this.addValue}>
            <Text style={styles.shareButtonText}>
              Select
          </Text>
          </Button>



          <View style={styles.outercontainer}>
            {this.state.compArr.map((data) =>
              <TouchableOpacity
                style={styles.datacontainer}
              // onPress={() => this.toggleRemoveItem(data)}
              >
                {!data.school_name
                  ? <View style={{ height: 28, textAlign: 'center' }}>
                    <Text numberOfLines={1}
                      style={styles.text}>
                      {data}
                    </Text>
                  </View>
                  : <View style={{ height: 28, textAlign: 'center' }}>
                    <Text numberOfLines={1}
                      style={styles.text}>
                      {data.school_name}
                    </Text>
                  </View>}
                <TouchableOpacity
                  style={styles.crossIcon}
                  onPress={() => this.toggleRemoveItem(data)}
                >
                  <Icon name="cross" size={30} style={{ bottom: 3, left: 5, color: 'red' }} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ height: '50%', bottom: 10, position: 'absolute' }}>
          <Divider borderColor="black" color="black" orientation="center">
            Comparison On
        </Divider>
          <View style={{ height: '50%' }}>
            <FlatList
              data={comparisonItems}
              renderItem={({ item }) => (
                <View style={styles.ButtonandCheckbox}>
                  <View style={{ width: 150 }}>
                    <Text>{item.key.text}</Text>
                  </View>
                  <CheckBox style={{}}
                    value={this.state[item.key.CheckboxValue]}
                    onValueChange={() => this.toggleCheckbox(item.key.CheckboxValue)}
                  />
                </View>
              )}
              numColumns={2}
              style={styles.flatliast}
            />
          </View>
          {/* Date Comment Because only one month data on Backend */}
          {/* <Divider borderColor="black" color="black" orientation="center">
            Select Dates
        </Divider>

          <View style={styles.dates}>
            <View>
              <Text>From</Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.fromdate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2019-01-01"
                maxDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    width: 0,
                    height: 0,
                  },
                }}
                onDateChange={(date) => { this.setState({ fromdate: date }) }}
              />
            </View>

            <View>
              <Text>To</Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.todate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2019-01-01"
                maxDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    width: 0,
                    height: 0,
                  },
                }}
                onDateChange={(date) => { this.setState({ todate: date }) }}
              />
            </View>
          </View> */}
          <View style={styles.graphButton} >
            <Button onPress={this.submitAdHocParams}>
              <Text style={styles.textStyle}>Create Graph</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  comparison: (state) => get(state, 'adhocquery.comparison'),
  allSchools: (state) => get(state, 'school.allSchoolsData'),
  allDistricts: (state) => get(state, 'school.districts'),
  allTehsils: (state) => get(state, 'school.tehsils'),
  requesting: (state) => get(state, 'school.requesting'),
  requestingad: (state) => get(state, 'adhocquery.requesting'),

})
const mapDispatchToProps = (dispatch) => ({
  ComparisonOn: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.ComparisonRequest(payload, resolve, reject))),
  getDistrict: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getDistrictsRequest(payload, resolve, reject))),
  getTehsil: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getTehsilsRequest(payload, resolve, reject))),
  allSchoolsData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),
})
export default connect(mapStateToProps, mapDispatchToProps)(ChartForm)
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  radioButtons: {
    alignSelf: 'center'
  },

  lableName: {
    fontSize: 16,
    fontWeight: '400',
    color: 'blue'
  },
  dropdownContainer: {
    flex: 0,
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },


  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    maxWidth: 200
  },
  container: {
    borderRadius: 10,
    borderWidth: 1,
  },
  datacontainer: {
    alignItems: 'center',
    paddingHorizontal: '2%',
    height: 30,
    margin: '1%',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 20,
    backgroundColor: "gray",
    display: 'flex',
    flexDirection: 'row'
  },
  crossIcon: {
    borderColor: 'black'
  },
  Heading: {
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 16,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  outercontainer: {
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  containerOk: {
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#841584',
    padding: 10
  },
  shareButton: {
    alignSelf: 'center',
    width: '50%',
    top: 5,
  },
  shareButtonText: {
    width: '100%',
    fontWeight: "800",
    textAlign: "center",
    color: '#fff'
  },
  ButtonandCheckbox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },
  graphButton: {
    alignSelf: 'center',
    width: '99%',

  },
  textStyle: {
    width: '100%',
    fontWeight: "800",
    textAlign: "center",
        color: 'white',
  },
  flatliast: {
    height: 100,
  }
})
