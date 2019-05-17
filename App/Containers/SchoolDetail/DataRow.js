import React, { Component } from 'react'
import { View, CheckBox } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'


class DataRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uncheckItem: {
        total_teacher: true,
        non_teacher: true,
        total_class_rooms: true,
        use_class_rooms: true,
        avaliable_fund: true,
        expenditure: true,
        balance: true,
        student_enrolled: true,
        student_present: true,
        toilet_avaliable: true,
        toilet_functional: true,
        is_toilet_functional: true,
        is_electricity_avaliable: true,
        is_drinking_water_avaliable: true,
        is_boundary_wall: true,
      }
    };
  }

  toggleCheckbox = () => {
    const { itemName } = this.props
    console.log("itemName : ", itemName)
    let uncheckItem = Object.assign({}, this.state.uncheckItem)
    uncheckItem[`${itemName}`]=!uncheckItem[`${itemName}`]
    this.setState({ uncheckItem: uncheckItem })
    console.log("this.uncheckItem",uncheckItem)
    console.log("this.state.uncheckItem",this.state.uncheckItem)
  }

  render() {
    const { text, value, itemName } = this.props
    return (
      <View
        style={{
          flex: 1, flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 2,
          width: '100%',
        }} >
        <Text>{text}</Text>
        <View style={{
          right: 60,
          position: 'absolute',
          width: '20%',
          alignItems: 'center',
          display: 'flex'
        }}>
          <Text >{value}</Text>
        </View>
        {
          console.log('this.state.uncheckItem[`${itemName}`]', this.state.uncheckItem[`${itemName}`], itemName)
        }
        <CheckBox
          value={this.state.uncheckItem[`${itemName}`]}
          onValueChange={() => this.toggleCheckbox()}

        />
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({

})
const mapDispatchToProps = (dispatch) => ({
  saveSchoolDetailCheckedList: (checkedList) => dispatch(Actions.saveSchoolDetailCheckedListLocal(checkedList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DataRow)
