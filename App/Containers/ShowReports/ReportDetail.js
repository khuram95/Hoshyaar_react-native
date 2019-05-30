import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ReportFormat from './ReportFormat'
import DrawLayout from '../DrawLayout'


class ReportDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    static navigationOptions = {
        header: null,
    }


    render() {
        const  report  = this.props.navigation.state.params.report
        console.log('this.props.navigation.getParam() :',this.props.navigation.state.params.report)        
        console.log('Report Detail :',report.report_text)

        return (
            <ScrollView style={{ backgroundColor: '#e6ecf0', flex: 1}}>
                <DrawLayout title="Report Detail" image=''/>
                <ReportFormat
                report={report && report}
                report_text={report && report.report_text}
                created_at={report && report.created_at}
                school_name={report.school && report.school.school_name}
                district={report.school && report.school.district}
                tehsil={report.school && report.school.tehsil}
                report_address={report && report.report_address}
                user_name={report.user && report.user.user_name}
                photos={report.photos && report.photos}
                navigation={this.props.navigation}
                gotoReportDetail={''}
            />
            </ScrollView>
        )
    }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)

