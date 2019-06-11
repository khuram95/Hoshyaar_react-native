import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { BarChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log("this.props is : ", this.props)
  }
  static navigationOptions = {
    header: null,
  }


  componentDidMount = () => {

  }
  render() {

    const { comparisonBetween, comparisonOn, fromDate, toDate, comparisonName } = this.props.navigation.state.params
    const chartdata = this.props.chartdata
    console.log("comparisonBetween, comparisonOn, fromDate, toDate, comparisonName : ", comparisonBetween, comparisonOn, fromDate, toDate, comparisonName)
    console.log("chartdata : ", chartdata)

    let chartArray = []
    let temparray = []
    let temp = ''
    chartdata.map((cdata) => {
      comparisonBetween.map((cb) => {
        if (cb == Object.keys(cdata)) {
          temp = cdata[`${cb}`]
          comparisonOn.map((co) => {
            temparray.push(temp[`${co}`])
          })
        }
      })
      chartArray.push(temparray)
      temparray = []
    })


    let chartArray1 = []
    chartArray.map((data) => {
      let temp = data.map((value) => ({ value }))
      chartArray1.push(temp)
    })
    console.log("Chart Array1 : ", chartArray1)

    const barData2 = []
    chartArray1.map((data1) => {
      barData2.push({
        data: data1
      })
    })
    console.log("barData2 : ", barData2)






    const data1 = [14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8]
      .map((value) => ({ value }))
    console.log("data1 : ", data1)
    const data2 = [24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94, 10, 86, 84]
      .map((value) => ({ value }))
    console.log("data2 : ", data2)


    const barData = [
      {
        data: data1,
      },
      {
        data: data2,
      },
    ]
    console.log("barData : ", barData)

    return (
      <View>
        <Text>Pakistan</Text>
        <BarChart
          style={{ height: 200 }}
          data={barData2}
          yAccessor={({ item }) => item.value}
          svg={{
            fill: 'green',
          }}
          contentInset={{ top: 30, bottom: 30 }}
          {...this.props}
        >
          <Grid />
        </BarChart>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  chartdata: (state) => get(state, 'adhocquery.comparison'),

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
