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
        return (
            <ScrollView style={{ backgroundColor: '#e6ecf0', flex: 1}}>
                <DrawLayout title="Report Detail" image=''/>
                <ReportFormat
                report_text="Owing to the prevailing precarious security situation, all government and private educational institutes in the federal capital and across Punjab would remain closed today (Friday) to avoid any untoward situation.
                Education Ministry official spokesman Muhammad Rafique Tahir said that all educational institutions under the administrative control of the federal government at Islamabad capital territory will remain closed."
                created_at='1976-04-19T12:59-0500'
                school_name='The Educators Sadar Campus'
                district='Lahore'
                tehsil='Lahore'
                report_address='Walton Road Lahore Cantt'
                user_name='Sajjad Mustafa'
                photos=''
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

