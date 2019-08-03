import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import ReportFormat from './ReportFormat'


class MyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my_reports: [],

    };
    this.props.fetchMyReports({
      user_id: this.props.currentUser.id,
    })
      .then(() => {
        this.setState({ my_reports: this.props.myReports })
      })
  }

  gotoReportDetail = (report) => {
    const { navigation } = this.props
    navigation.navigate("ReportDetail", report = { report })
  }

  onSubmitComment = () => {
    this.props.fetchMyReports()
      .then(() => {
        this.setState({ my_reports: this.props.my_reports })
      })
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1, padding: '1%' }}>
        {this.state.my_reports && this.state.my_reports.map((report) =>
          <ReportFormat
            report={report && report}
            navigation={this.props.navigation}
            gotoReportDetail={this.gotoReportDetail}
            onSubmitComment={this.onSubmitComment}
          />
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  myReports: (state) => get(state, 'report.myReports'),
  currentUser: (state) => get(state, 'auth.currentUser'),

})

const mapDispatchToProps = (dispatch) => ({
  fetchMyReports: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.myReportsRequest(payload, resolve, reject)))

})

export default connect(mapStateToProps, mapDispatchToProps)(MyReports)

