import React from 'react'
import { View, CheckBox } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'


export default DataRow = (text, value, ischecked) => {
    return (
        <View
        style={{
            flex: 1,flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 2,
            width: '100%',
        }} >
            <Text>{text['text']}</Text>
            <Text>{text['value']}</Text>
            <CheckBox />
        </View>
    )
}
