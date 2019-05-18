import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import ReportFormat from './ReportFormat'


class MyInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestedReports: [],

    };
    console.log("this.props ",this.props)
    this.props.fetchInterestedReports({
      user_id: this.props.currentUser.id,
    })
      .then(() => {
        this.setState({ interestedReports: this.props.interestedReports })
        console.log("interestedReports : ", this.state.interestedReports)
      })
  }

  gotoReportDetail = (report) => {
    console.log("reports : ", report)
    const { navigation } = this.props
    navigation.navigate("ReportDetail", report = { report })
  }

  onSubmitComment = (report) => {
    this.props.fetchInterestedReports()
      .then(() => {
        this.setState({ interestedReports: this.props.interestedReports })
      })
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1, padding: '1%' }}>
        {this.state.interestedReports && this.state.interestedReports.map((report) =>
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
  interestedReports: (state) => get(state, 'report.interestedReports'),
  currentUser: (state) => get(state, 'auth.currentUser'),

})

const mapDispatchToProps = (dispatch) => ({
  fetchInterestedReports: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.interestedReportsRequest(payload, resolve, reject)))

})

export default connect(mapStateToProps, mapDispatchToProps)(MyInterest)

