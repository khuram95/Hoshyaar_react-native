import React, { Component } from 'react'
import {
    View, Image, ImageBackground, KeyboardAvoidingView, Linking,
    ScrollView
} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import SchoolDetailForm from './SchoolDetailForm'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class SchoolDetail extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <SchoolDetailForm navigation={this.props.navigation} />
        )
    }
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail)
