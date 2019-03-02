import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView } from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import CreateReport from './ReportForm'


class Report extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <CreateReport/>
        )
    }
}

export default Report