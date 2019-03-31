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
    this.state = { date: "2018-03-23",
                  schooldetail: {},
                  singleschool:[],
                  all_school:[]
                  }

    
    complete_school_data = this.props.navigation.getParam('id')
  
    this.props.SchoolDetailData({ school_id: complete_school_data.id })
      .then(() => {
        this.setState({ schooldetail: this.props.SchoolDetail })
        size = this.state.schooldetail.length
        this.setState({singleschool : this.state.schooldetail[size-1]})
        this.setState({all_school : complete_school_data})
      })

  }

  dateChange = (date) => {
    this.setState({ date:date })
    console.log('Date :::::::::::::::::::::',this.state.date)
   
    console.log('this.state.schooldetail.visiting_date :',this.state.schooldetail[1].visiting_date)
    
    size = this.state.schooldetail.length
    for (let i=0; i < size ; i++) {
      if(this.state.schooldetail[i].visiting_date == this.state.date){
         this.setState({singleschool : this.state.schooldetail[i]})
      }
      else
      {
        console.log("Pappi chulooooo");
      }
    }

	}


  CreateReport = () => {
    const { navigation } = this.props
    navigation.navigate("Report")
  }
  render() {
    return (
      <ScrollView>
      <Text>{ this.state.all_school.school_name }</Text>
        <Text>Government Data</Text>
        <Text>{'\n\n'}</Text>
        <Text>Select Month</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2019-01-01"
          maxDate="2019-12-28"
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
          onDateChange={(date) => { this.dateChange(date) }}

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
                <DataRow text={'Total Teacher'}
                  value={this.state.singleschool.total_teacher} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Total non Teacher'}
                  value={this.state.singleschool.non_teacher} ischecked={false} />
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
                  value={this.state.singleschool.total_class_rooms} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Class Room in Use'}
                  value={this.state.singleschool.use_class_rooms} ischecked={false} />
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
                  value={this.state.singleschool.avaliable_fund} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Expenditure'}
                  value={this.state.singleschool.expenditure} ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Balance'}
                  value={this.state.singleschool.balance} ischecked={false} />
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
                  value={this.state.singleschool.student_enrolled} ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Student Present'}
                  value={this.state.singleschool.student_present} ischecked={false} />
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
              <ListItem style={{ height: 20}} >
                <DataRow text={'Toilet Avalible'}
                  value={this.state.singleschool.toilet_avaliable} 
                                                      ischecked={true} />
              </ListItem>
              <ListItem>
                <DataRow text={'Toilet Functional'}
                  value={this.state.singleschool.toilet_functional} 
                                                      ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'All Toilet Functional'}
                  value={this.state.singleschool.is_toilet_functional ? 'Yes' : 'No'} 
                                                    ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Electricity Functional'}
                  value={this.state.singleschool.is_electricity_avaliable ? 'Yes' : 'No'}
                                                     ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Drinking Functional'}
                  value={this.state.singleschool.is_drinking_water_avaliable ? 'Yes' : 'No'} 
                                                      ischecked={false} />
              </ListItem>
              <ListItem>
                <DataRow text={'Boundary Functional'}
                  value={this.state.singleschool.is_boundary_wall ? 'Yes' : 'No' } 
                                                      ischecked={false} />
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


        </ScrollView>

    )
  }
}


const mapStateToProps = createStructuredSelector({
  SchoolDetail: (state) => get(state, 'schooldetail.SchoolDetailData'),
})
const mapDispatchToProps = (dispatch) => ({
  SchoolDetailData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.SchoolDetailDataRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetailForm)


