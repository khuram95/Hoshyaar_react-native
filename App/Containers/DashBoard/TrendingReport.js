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
import ReportFormat from '../ShowReports/ReportFormat'


class TrendingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_reports: [],
    };
    this.props.fetchAllReports()
      .then(() => {
        this.setState({ all_reports: this.props.allReports })
      })
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#e6ecf0', flex: 1, padding: 30 }}>
        {this.state.all_reports && this.state.all_reports.map((report) =>
          <ReportFormat
            report_text={report && report.report_text}
            created_at={report && report.created_at}
            school_name={report.school && report.school.school_name}
            district={report.school && report.school.district}
            tehsil={report.school && report.school.tehsil}
            latitude={report && report.latitude}
            longitude={report && report.longitude}
            user_name={report.user && report.user.user_name}
            photos={report.photos && report.photos}
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
export default connect(mapStateToProps, mapDispatchToProps)(TrendingReport)

