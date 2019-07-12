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
import { DrawerNavigator, DrawerItems, SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation'
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
			drawerIcon: () =>
				<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
		})
	},
}
)

// const LogoutNavigation = new StackNavigator({
// 	Logout: {
// 		screen: Login,
// 		navigationOptions: ({ navigation }) => ({
// 			gesturesEnabled: false,
// 			// header: <MainHeader navigation={navigation} returnKey={'Notifications'} title="Notifications" />,
// 			// drawerIcon: () => <NotificationItem />
// 			drawerIcon: () =>
// 				<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
// 		})
// 	},
// }
// )
// logout = () => {
//     const actionToDispatch = NavigationActions.reset({
//       index: 0,
//       key: null,  
//       actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
//     })
//     this.props.navigation.dispatch(actionToDispatch)
//   }

const LogoutNavigation = new StackNavigator({
	Logout: {
		screen: Login,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			// header: <MainHeader navigation={navigation} returnKey={'Notifications'} title="Notifications" />,
			// drawerIcon: () => <NotificationItem />
			drawerIcon: () =>
				<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
		}),
		action: NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Login' }),
			]
		})
	},
})

// const LogoutNavigation = () => {
// 	console.log("LOGOUT WOW AMAZING", this.props)
// 	// const { navigation } = this.props
// 	// this.props
// 	// () => (navigate.replace("Login"))
// 	// navigation.push("Report")
// 	// navigationOptions: ({ navigation }) => ({
// 	// 	gesturesEnabled: false,
// 	// 	drawerIcon: () =>
// 	// 		<Image source={Images.adhoc} style={{ width: 20, height: 20 }} />
// 	// })

// 	this.props.navigation.dispatch(NavigationActions.reset({
// 		index: 0,
// 		actions: [NavigationActions.navigate({ routeName: 'Menu' })]
// 	}));

// 	// return navigation.replace("Login")
// }



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
	VerifySchoolData: { screen: CreateReportNavigation },
	ChangePassword: { screen: ChangePasswordNavigation },
	Logout: { screen: LogoutNavigation },
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