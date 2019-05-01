import React from 'react'
import { View, CheckBox } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'


export default DataRow = (text, value, ischecked) => {
	return (
		<View
			style={{
				flex: 1, flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: 2,
				width: '100%',
			}} >
			<Text>{text['text']}</Text>
			<View style={{
				right: 60,
				position: 'absolute',
				width: '20%',
				alignItems: 'center',
				display: 'flex'
			}}>
				<Text >{text['value']}</Text>
			</View>
			<CheckBox />
		</View>
	)
}
