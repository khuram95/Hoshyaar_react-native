import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
          temparray.push(temp.total_schools)
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
    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)


    const barData = []
    chartArray1.map((data1) => {
      barData.push({
        data: data1,
        label: "sajjad",
        svg: { fill: randomColor() },
      })
    })
    console.log("barData : ", barData)

    return (
      <View style={styles.container}>
        <Text>Pakistan</Text>
        <BarChart
          style={{ flex: 1 }}
          style={{ height: 200 }}
          data={barData}
          animate={true}
          animationDuration={400}
          showGrid={true}
          gridMin={0}
          spacing={0.2}
          yAccessor={({ item }) => item.value}
          svg={{
            fill: 'blue',
          }}
          contentInset={{ top: 0, left: 0, right: 0, bottom: 0 }}
          {...this.props}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', height: 200, paddingVertical: 16
  },

})
