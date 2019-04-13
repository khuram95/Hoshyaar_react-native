import React, { Component } from 'react'
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
                ScrollView, CheckBox } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import SchoolDetailForm from './SchoolDetailForm'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

export default DataRow = (text, value, ischecked) => {
    return (
        <View style={{ display: 'flex', flex: 1, height:2, width: '100%', 
         flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>{text['text']}</Text>
        <Text>{text['value']}</Text>
        <CheckBox/>
        </View>
    )
}