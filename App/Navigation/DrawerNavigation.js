import React, { Component } from 'react'
import { View, StyleSheet,ScrollView, DrawerLayoutAndroid, TouchableHighlight, ToolbarAndroid, FlatList, Image, Thumbnail, Icon, ViewPagerAndroid, TouchableOpacity } from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Body, Title, Left, Right, Content } from 'native-base'
import { Images, Colors } from '../Themes'
import DashBoard from '../Containers/DashBoard'
import ShowReports from '../Containers/ShowReports'
import Report from '../Containers/ManualGoogleMap'
import { DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'


const CustomDrawer = (props) => (
	<ScrollView>
		<Header style={styles.drawerImage}>
			<Body>
			<Image source={Images.pakistan} 
				style={{ height: 200, }} />
			</Body>
		</Header>
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
)

export default Drawer = DrawerNavigator({
	DashBoard: {
		screen: DashBoard
	},
	ShowReports: {
		screen: ShowReports
	},
	CreateReport: {
		screen: Report
	},
	VerifySchoolData: {
		screen: DashBoard
	},
	ChangePassword: {
		screen: DashBoard
	},
	Logout: {
		screen: DashBoard
	},
}, {
		initialRouteName: "DashBoard",
		contentComponent: CustomDrawer,
		DrawerOpenRoute: "DrawerOpen",
		DrawerCloseRoute: "DrawerClose",
		DrawerToggleRoute: "DrawerToggle",
		// drawerWidth:200,
		// drawerPosition: "right"

	});

styles = StyleSheet.create({
	drawerImage: {
		height: 150,
		width: 150,
		// borderRadius: 75,
	},
	container: {
    flex: 1,
  },

})