import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Image, StyleSheet, CheckBox } from 'react-native'
import { Item as FormItem, Text, Button } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import DatePicker from 'react-native-datepicker'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import DataRow from './DataRow'
import { Images, Colors } from '../../Themes/'
import DrawLayout from '../DrawLayout'
import Icon from "react-native-vector-icons/AntDesign";


class SchoolDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2018-03-23",
      schooldetail: {},
      singleschool: [],
      all_school: [],
      Total_Teacher: true,
      interestChecked: false,
    }
    complete_school_data = this.props.navigation.getParam('id')
    this.props.SchoolDetailData({ school_id: complete_school_data.emis })
      .then(() => {
        this.setState({ schooldetail: this.props.SchoolDetail })
        size = this.state.schooldetail.length
        this.setState({ singleschool: this.state.schooldetail[size - 1] })
        this.setState({ all_school: complete_school_data })
      })
  }
  dateChange = (date) => {
    this.setState({ date: date })
    size = this.state.schooldetail.length
    for (let i = 0; i < size; i++) {
      if (this.state.schooldetail[i].visiting_date == this.state.date) {
        this.setState({ singleschool: this.state.schooldetail[i] })
      }
    }
  }
  CreateReport = () => {
    const { navigation } = this.props
    this.props.saveSchool(this.state.all_school)
    if (this.state.interestChecked) {
      // console.log("school_id :", this.state.all_school.emis)
      this.props.AddMyInterest({
        school_id: this.state.all_school.emis,
        user_id: this.props.currentUser.id,
      })
        .then(() => {
          alert("Interest Add")
        })
    }
    navigation.navigate("Report")
  }

  render() {
    return (
      <View style={{
        display: 'flex',
        flex: 1,
      }}
      >
        <DrawLayout title="Government Data" image='' />
        <Text>{'\n'}</Text>
        <Text style={styles.titleText}>
          {this.state.all_school.school_name}
        </Text>
        <Text>{'\n'}</Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }} >
          <Text>Add School to my Interest</Text>
          <CheckBox
            value={this.state.interestChecked}
            onValueChange={() => this.setState({ interestChecked: !this.state.interestChecked })}
          />
        </View>
        <Text>{'\n'}</Text>


        {/* <View style={{ flex: 1, flexDirection: "row" }}>
          <Text>Select Month</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2019-04-01"
            maxDate="2019-04-30"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            // customStyles={{
            //   dateIcon: {
            //     position: 'absolute',
            //     left: 0,
            //     top: 4,
            //     marginLeft: 0
            //   },
            //   dateInput: {
            //     marginLeft: 36
            //   }
            // }}
            onDateChange={(date) => { this.dateChange(date) }}

          />
        </View>*/}
        <ScrollView>
          <Collapse>
            <CollapseHeader>
              <Separator>
                <View style={styles.dataHeading}>
                  <Text style={styles.dataHeadingFont}>PRESENCE OF TEACHING STAFF</Text>
                  <Icon name="caretdown" size={20} />
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody style={styles.body}>
              <ListItem >
                <DataRow text={'Total Teacher'}
                  value={this.state.singleschool.total_teacher}
                  itemName={'total_teacher'}
                />
              </ListItem>
              <ListItem>
                <DataRow text={'Total non Teacher'}
                  value={this.state.singleschool.non_teacher} itemName={'non_teacher'} />
              </ListItem>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <View style={styles.dataHeading}>
                  <Text style={styles.dataHeadingFont}>CLASS ROOMS</Text>
                  <Icon name="caretdown" size={20} />
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody style={styles.body}>
              <ListItem >
                <DataRow text={'Class Rooms'}
                  value={this.state.singleschool.total_class_rooms} itemName={'total_class_rooms'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Class Room in Use'}
                  value={this.state.singleschool.use_class_rooms} itemName={'use_class_rooms'} />
              </ListItem>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <View style={styles.dataHeading}>
                  <Text style={styles.dataHeadingFont}>NON-SALARY BUDGET DETAIL</Text>
                  <Icon name="caretdown" size={20} />
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody style={styles.body}>
              <ListItem >
                <DataRow text={'Total Funds'}
                  value={this.state.singleschool.avaliable_fund} itemName={'avaliable_fund'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Expenditure'}
                  value={this.state.singleschool.expenditure} itemName={'expenditure'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Balance'}
                  value={this.state.singleschool.balance} itemName={'balance'} />
              </ListItem>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <View style={styles.dataHeading}>
                  <Text style={styles.dataHeadingFont}>STUDENT ENROLLMENT</Text>
                  <Icon name="caretdown" size={20} />
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody style={styles.body}>
              <ListItem >
                <DataRow text={'Student Enrolled'}
                  value={this.state.singleschool.student_enrolled} itemName={'student_enrolled'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Student Present'}
                  value={this.state.singleschool.student_present} itemName={'student_present'} />
              </ListItem>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <View style={styles.dataHeading}>
                  <Text style={styles.dataHeadingFont}>FUNCTIONING OF SCHOOL FACILITIES</Text>
                  <Icon name="caretdown" size={20} />
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody style={styles.body}>
              <ListItem style={{ height: 20 }} >
                <DataRow text={'Toilet Avalible'}
                  value={this.state.singleschool.toilet_avaliable}
                  itemName={'toilet_avaliable'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Toilet Functional'}
                  value={this.state.singleschool.toilet_functional}
                  itemName={'toilet_functional'} />
              </ListItem>
              <ListItem>
                <DataRow text={'All Toilet Functional'}
                  value={this.state.singleschool.is_toilet_functional ? 'Yes' : 'No'}
                  itemName={'is_toilet_functional'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Electricity Functional'}
                  value={this.state.singleschool.is_electricity_avaliable ? 'Yes' : 'No'}
                  itemName={'is_electricity_avaliable'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Drinking Functional'}
                  value={this.state.singleschool.is_drinking_water_avaliable ? 'Yes' : 'No'}
                  itemName={'is_drinking_water_avaliable'} />
              </ListItem>
              <ListItem>
                <DataRow text={'Boundary Functional'}
                  value={this.state.singleschool.is_boundary_wall ? 'Yes' : 'No'}
                  itemName={'is_boundary_wall'} />
              </ListItem>
            </CollapseBody>
          </Collapse>
          <Text>{'\n'}</Text>
        </ScrollView>

        <View style={{
          flexDirection:"row",
          width: '100%',
          justifyContent: 'space-around',
          bottom: 1,
        }}>

          <Button style={{
            alignSelf: 'center',
            width: '40%'
          }}>
            <Text style={{
              width: '100%',
              fontWeight: "800",
              textAlign: "center"
            }}>
              Verify Data
                  </Text>
          </Button>
          <Text>{'\n'}</Text>


          <Button style={{
            alignSelf: 'center',
            width: '40%'
          }}
            onPress={this.CreateReport}
          >
            <Text style={{
              width: '100%',
              fontWeight: "800",
              textAlign: "center"
            }}>
              Create Report
                  </Text>
          </Button>
        </View>


      </View>

    )
  }
}


const mapStateToProps = createStructuredSelector({
  SchoolDetail: (state) => get(state, 'schooldetail.SchoolDetailData'),
  currentUser: (state) => get(state, 'auth.currentUser'),

})
const mapDispatchToProps = (dispatch) => ({
  saveSchool: (school) => dispatch(Actions.saveSchoolLocal(school)),
  SchoolDetailData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.SchoolDetailDataRequest(payload, resolve, reject))),
  AddMyInterest: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.addMyInterestRequest(payload, resolve, reject)))

})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetailForm)


const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },
  dataHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  dataHeadingFont: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: "white",
  }
});