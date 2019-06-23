import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Image, Thumbnail, Icon, ViewPagerAndroid, TouchableOpacity } from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Body, Title, Left, Right } from 'native-base'
import TrendingReport from './TrendingReport'
import DisplayImage from './DisplayImage'
import DrawLayout from '../DrawLayout'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
  }
  CreateReport = () => {
    const { navigation } = this.props
    navigation.navigate("ManualGoogleMap")
  }
  DisplayAllReport = () => {
    const { navigation } = this.props
    navigation.navigate("ShowReports")
  }
  render() {
    const DashboardImages = [{ key: { image: 'reports', text: 'All Reports', navigateTo: 'ShowReports' } },
    { key: { image: 'editreports', text: 'Create Report', navigateTo: 'ManualGoogleMap' } },
    { key: { image: 'verifiedschool', text: 'Verify School Data', navigateTo: 'ManualGoogleMap' } },
    { key: { image: 'adhoc', text: 'Adhoc Query', navigateTo: 'AdHocQuery' } }
    ]
    return (
      <View style={{ flex: 1 }}>
        <DrawLayout title="Home" 
        leftimage='menu'
        rightimage='Notification'
          navigateTo='Notification'
          componentNavigation={this.props.navigation}
         />
        <View style={{ flex: 0.5, backgroundColor: '' }}>
          <ViewPagerAndroid
            style={styles.viewPager}
            initialPage={0}>
            <View style={styles.pageStyle} key="1">
              <Text>Trending Report 1</Text>
            </View>
            <View style={styles.pageStyle} key="2">
              <Text>Trending Report 2</Text>
            </View>
          </ViewPagerAndroid>
          {/* <TrendingReport/> */}
        </View>
        <View style={{ flex: 0.5 }}>
          <FlatList
            data={DashboardImages}
            renderItem={({ item }) => DisplayImage(item.key, this.props.navigation)}
            numColumns={2}
          />
        </View>
      </View>
    )
  }
}
const mapStateToProps = createStructuredSelector({
	currentUser: (state) => get(state, 'auth.currentUser'),
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen)

const styles = StyleSheet.create({
  reportFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0
  },
  viewPager: {
    flex: 1,
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'green'
  }
});