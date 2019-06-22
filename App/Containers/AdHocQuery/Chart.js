import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as scale from 'd3-scale'


class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static navigationOptions = {
    header: null,
  }

  componentDidMount = () => {

  }

  transpose(a) {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) { return r[c]; });
    });
  }

  render() {
    var items = {
      'total_teacher': 'Total Teacher',
      'student_enrolled': 'Student Enrolled',
      'avaliable_fund': 'Education Budget',
      'no_of_Schools': 'No of Schools',
      'toilet_avaliable': 'Toilet Facility',
      'is_drinking_water_avaliable': 'Drinking Water',
      'is_boundary_wall': 'Boundary Wall',
      'is_electricity_avaliable': 'Electricity Facility',
    }

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

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

    var school1 = JSON.parse(JSON.stringify(chartArray[0]));
    var school2 = JSON.parse(JSON.stringify(chartArray[1]));
    var total_schools1 = school1[ school1.length-1]
    var total_schools2 = school2[ school2.length-1]
    for (var i = 0; i < school1.length-1; i++) {
      var maxSchool1=0;
      if(total_schools1 >= school1[i]){
        school1[i]= (school1[i]/total_schools1)*100
      }
      else if(total_schools1 < school1[i]){
        max = Math.max(school2[i],school1[i])
        maxSchool1=(school1[i]/max)*100;
      }
      if(total_schools2 >= school2[i]){
        school2[i]= (school2[i]/total_schools2)*100
      }
      else if(total_schools2 < school2[i]){
        max = Math.max(school2[i],school1[i])
        school1[i] = maxSchool1
        school2[i]=(school2[i]/max.toFixed(2))*100
      }
    }
    max = Math.max(total_schools1,total_schools2)
    school1[ school1.length-1] = (total_schools1/max)*100
    school2[ school2.length-1] = (total_schools2/max)*100

    var dataPercentage = []
    dataPercentage.push(school1)
    dataPercentage.push(school2)


    let chartArray1 = []
    dataPercentage.map((data) => {
      let temp = data.map((value) => ({ value }))
      chartArray1.push(temp)
    })
    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
    console.log('dataPercentage : ', dataPercentage)
    console.log('chartArray1 : ', chartArray1)

    const barData = []
    chartArray1.map((data1) => {
      barData.push({
        data: data1,

        svg: { fill: randomColor() },
      })
    })
    console.log("barData : ", barData)

    ////////////// table data/////////////////////
    tableData = this.transpose(chartArray);
    var tableTitle = JSON.parse(JSON.stringify(comparisonOn));
    tableTitle.push("no_of_Schools")
    for (var x in tableTitle) {
      for (var y in items) {
        if (tableTitle[x] == y)
          tableTitle[x] = items[y]
      }
    }
    var tableHead = JSON.parse(JSON.stringify(comparisonBetween));
    tableHead.unshift(" ")
    //////////////////////////////////

    // xdata = tableTitle
    const xdata = ['Total Teacher',
      'Student Enrolled',
      'Education Budget',
      'No of Schools',
      'Toilet Facility',
      'Drinking Water',
      'Boundary Wall',
      'Electricity Facility'].map((value) => ({ value }))
    // const xdata = [14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8]
    //   .map((value) => ({ value }))
    console.log("xdata : ", xdata)
    const xbarData = [
      {
        data: xdata,
      },
    ]
    console.log("xbarData : ", xbarData)

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    var dataIndex = 0
    return (
      <View style={styles.container} >
        <Table>
          <Row data={tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            <Col data={tableTitle} style={styles.title} textStyle={styles.text} />
            <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
        <Text>{fromDate} to {toDate}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>{comparisonBetween[0]}</Text>
          <View style={{ width: 20, height: 20, backgroundColor: barData[0].svg.fill }} /></View>
        <View style={{ flexDirection: "row" }}>
          <Text>{comparisonBetween[1]}</Text>
          <View style={{ width: 20, height: 20, backgroundColor: barData[1].svg.fill }} /></View>

        <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
          {console.log("data ", data)}
          {console.log("baardata ", barData)}

          <YAxis
            data={data}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ height: 200 }}
              data={barData}
              animate={true}
              animationDuration={400}
              showGrid={true}
              gridMin={0}
              spacing={0.2}
              yAccessor={({ item }) => item.value
                // {
                //   console.log("item :", item[dataIndex])
                //   dataIndex = dataIndex + 1;
                //   item[dataIndex - 1]
                // }
              }
              svg={{
                fill: 'blue',
              }}
              contentInset={{ top: 0, left: 0, right: 0, bottom: 0 }}
              {...this.props}
            >
              <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>

            <XAxis
              style={{ marginTop: 10 }}
              data={barData}
              scale={scale.scaleBand}
              formatLabel={(value, index) => index}
              labelStyle={{ color: 'black' }}
            />
          </View>
        </View>
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' }

})
