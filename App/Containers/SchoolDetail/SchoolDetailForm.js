import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Item as FormItem, moment, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import DatePicker from 'react-native-datepicker'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import DataRow from './DataRow'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'




class SchoolDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "2018-03-23" }
    this.props.SchoolDetailData()
		.then(() => {
      console.log('SchoolDetail ',this.props.SchoolDetail)
		})

  }

  CreateReport = () => {
    const { navigation } = this.props
    navigation.navigate("Report")
  }
  render() {
    return (
      <View>
        <Text>School Name</Text>
        <Text>Government Data</Text>
        <Text>{'\n\n'}</Text>
        <Text>Select Month</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2018-01-01"
          maxDate="2018-03-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { this.setState({ date: date }) }}
        />



        <View>
          <Collapse>

            <CollapseHeader>
              <Separator bordered>
                <Text>Presence Of Teaching Staff</Text>
              </Separator>
            </CollapseHeader>

            <CollapseBody>
              <ListItem >
              {console.log('this.props.SchoolDetail.total_teacher ',this.props.SchoolDetail.total_teacher)}
                <DataRow text={'Total Teacher'} 
                        value={this.props.SchoolDetail.total_teacher} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Total non Teacher'} 
                        value={this.props.SchoolDetail.non_teacher} ischecked={false} />
              </ListItem>
            </CollapseBody>

          </Collapse>


          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <Text>Class Rooms</Text>
              </Separator>
            </CollapseHeader>

            <CollapseBody>
              <ListItem >
                <DataRow text={'Class Rooms'} 
                          value={this.props.SchoolDetail.total_class_rooms} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Class Room in Use'} 
                        value={this.props.SchoolDetail.use_class_rooms} ischecked={false} />
              </ListItem>
            </CollapseBody>
          </Collapse>


          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <Text>Non-Salary Budget Detail</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem >
                <DataRow text={'Total Funds'} 
                          value={this.props.SchoolDetail.avaliable_fund} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Expenditure'} 
                        value={this.props.SchoolDetail.expenditure} ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Balance'} 
                          value={this.props.SchoolDetail.balance} ischecked={false} />
              </ListItem>
            </CollapseBody>
          </Collapse>


          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <Text>Student Enrollment</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem >
                <DataRow text={'Student Enrolled'} 
                          value={this.props.SchoolDetail.student_enrolled} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Student Present'} 
                          value={this.props.SchoolDetail.student_present} ischecked={false} />
              </ListItem>
            </CollapseBody>
          </Collapse>



          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <Text>Functioning of School Facilities</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem style={{ height: 20, backgroundColor: 'red' }} >
                <DataRow text={'Toilet Avalible'} 
                          value={this.props.SchoolDetail.toilet_avaliable} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Toilet Functional'} 
                          value={this.props.SchoolDetail.toilet_functional} ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'All Toilet Functional'} 
                          value={this.props.SchoolDetail.is_toilet_functional} ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Electricity Functional'} 
                          value={this.props.SchoolDetail.is_electricity_avaliable} ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Drinking Functional'} 
                        value={this.props.SchoolDetail.is_drinking_water_avaliable} ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Boundary Functional'} 
                        value={this.props.SchoolDetail.is_boundary_wall} ischecked={false} />
              </ListItem>

            </CollapseBody>
          </Collapse>

          <Text>{'\n'}</Text>

        </View>

        <View style={{
          display: 'flex',
          flex: 1, 
          width: '100%',
          flexDirection: 'column', 
          justifyContent: 'space-between',
           alignItems: 'center'
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


const mapStateToProps = createStructuredSelector ({
	SchoolDetail: (state) => get(state, 'schooldetail.SchoolDetailData')
})
const mapDispatchToProps = (dispatch) => ({
	SchoolDetailData: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.SchoolDetailDataRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetailForm)


