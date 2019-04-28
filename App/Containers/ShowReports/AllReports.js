import React, { Component } from 'react'
import {
  View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView, TextInput, AppRegistry, SectionList, StyleSheet
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import ReportFormat from './ReportFormat'


class AllReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_reports: [],

    };
    this.props.fetchAllReports()
      .then(() => {
        this.setState({ all_reports: this.props.allReports })
        console.log("all_reports : ", this.state.all_reports)
      })
  }

  gotoReportDetail = (report) => {
    console.log("reports : ",report)
    const { navigation } = this.props
		navigation.navigate("ReportDetail", report={report})
  }


  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1, padding: '1%' }}>
        {this.state.all_reports && this.state.all_reports.map((report) =>
          <ReportFormat
            report= {report && report}
            navigation={this.props.navigation}
            gotoReportDetail={this.gotoReportDetail}
          />
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  allReports: (state) => get(state, 'report.allReports'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllReports: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.allReportsRequest(payload, resolve, reject)))

})

export default connect(mapStateToProps, mapDispatchToProps)(AllReports)

