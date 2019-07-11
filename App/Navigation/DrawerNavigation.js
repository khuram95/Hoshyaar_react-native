import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Item as FormItem, Header, Body } from 'native-base'
import { Images, Colors } from '../Themes'
import Login from '../Containers/LoginScreen'
import DashBoard from '../Containers/DashBoard'
import ShowReports from '../Containers/ShowReports'
import CreateReport from '../Containers/ManualGoogleMap'
import AdHocQuery from '../Containers/AdHocQuery'
import ChangePassword from '../Containers/ChangePassword'
import { DrawerNavigator, DrawerItems, SafeAreaView, StackNavigator } from 'react-navigation'
const DashboardNavigation = new StackNavigator({
	DashBoard: {
		screen: DashBoard,
		navigationOptions: ({ navigation }) => ({
			drawerIcon: () => (
				<Image source={Images.reports} style={{ width: 20, height: 20 }} />
			),
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'DashBoard'} title="Dashboard" />
		})
	}
})

const ShowReportsNavigation = new StackNavigator({
	ShowReports: {
		screen: ShowReports,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'Food Gallery'} title="Food Gallery" />,
			drawerIcon: () =>
				<Image source={Images.reports} style={{ width: 20, height: 20 }} />
		})
	},
},
	{
		// initialRouteName: 'Food Gallery',
	}
)

const CreateReportNavigation = new StackNavigator({
	CreateReport: {
		screen: CreateReport,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'Notifications'} title="Notifications" />,
			// drawerIcon: () => <NotificationItem />
			drawerIcon: () =>
				<Image source={Images.editreports} style={{ width: 20, height: 20 }} />
		})
	},
}
)

const AdHocQueryNavigation = new StackNavigator({
	AdHocQuery: {
		screen: AdHocQuery,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'Notifications'} title="Notifications" />,
			// drawerIcon: () => <NotificationItem />
			drawerIcon: () =>
				<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
		})
	},
}
)

const ChangePasswordNavigation = new StackNavigator({
	ChangePassword: {
		screen: ChangePassword,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'Notifications'} title="Notifications" />,
			// drawerIcon: () => <NotificationItem />
			drawerIcon: () =>
				<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
		})
	},
}
)

const LogoutNavigation = new StackNavigator({
	Logout: {
		screen: Login,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'Notifications'} title="Notifications" />,
			// drawerIcon: () => <NotificationItem />
			drawerIcon: () =>
				<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
		})
	},
}
)



const CustomDrawer = (props) => (
	<ScrollView>
		<Header style={styles.drawerImage}>
			<Body>
				<Image source={Images.Pakistan}
					style={{}} />
			</Body>
		</Header>
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
)

export default Drawer = DrawerNavigator({
	DashBoard: { screen: DashboardNavigation },
	ShowReports: { screen: ShowReportsNavigation },
	CreateReport: { screen: CreateReportNavigation },
	AdHocQuery: { screen: AdHocQueryNavigation },
	VerifySchoolData: {screen: CreateReportNavigation},
	ChangePassword: {screen: ChangePasswordNavigation},
	Logout: {screen: LogoutNavigation},
	// VerifySchoolData: {
	// 	screen: CreateReport,
	// 	navigationOptions: {
	// 		drawerIcon: () =>
	// 			<Image source={Images.verifiedschool} style={{ width: 20, height: 20 }} />
	// 	}
	// },
	// ChangePassword: {
	// 	screen: DashBoard,
	// 	navigationOptions: {
	// 		drawerIcon: () =>
	// 			<Image source={Images.key} style={{ width: 20, height: 20 }} />
	// 	}
	// },
	// Logout: {
	// 	screen: Login, // this.props.navigation.replace('Login')
	// 	navigationOptions: {
	// 		drawerIcon: () =>
	// 			<Image source={Images.signout} style={{ width: 20, height: 20 }} />
	// 	}
	// },
}, {
		initialRouteName: "DashBoard",
		contentComponent: CustomDrawer,
		DrawerOpenRoute: "DrawerOpen",
		DrawerCloseRoute: "DrawerClose",
		DrawerToggleRoute: "DrawerToggle",
		// drawerWidth:200,
		// drawerPosition: "right"
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}

	});

styles = StyleSheet.create({
	drawerImage: {
		height: 200,
		width: 300,
		// borderRadius: 75,
	},
	container: {
		flex: 1,
	},

})