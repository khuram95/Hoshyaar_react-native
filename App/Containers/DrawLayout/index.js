import React, { Component } from 'react'
import { View, StyleSheet, DrawerLayoutAndroid, TouchableHighlight, ToolbarAndroid, FlatList, Image, Thumbnail, Icon, ViewPagerAndroid, TouchableOpacity } from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Body, Title, Left, Right } from 'native-base'
import style from '../DashBoard/style'
import { Images, Colors } from '../../Themes'
import TrendingReport from '../DashBoard/TrendingReport'
import DrawLayoutFormat from './DrawLayoutFormat'


class DrawLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isModalVisible: false,
    }
  }
  static navigationOptions = {
    header: null,
  }
  openDrawer = () => {
    this.refs['DRAWER'].openDrawer()
  }

  navigationHandler = () => {
    console.log("this.props : ", this.props)
    const { componentNavigation } = this.props
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    componentNavigation.navigate(this.props.navigateTo)
  }

  render() {
    const DashboardImages = [{ key: { image: 'reports', text: 'All Reports', navigateTo: 'ShowReports' } },
    { key: { image: 'editreports', text: 'Create Report', navigateTo: 'ManualGoogleMap' } },
    { key: { image: 'verifiedschool', text: 'Verify School Data', navigateTo: '' } },
    { key: { image: 'adhoc', text: 'Adhoc Query', navigateTo: '' } },
    { key: { image: 'key', text: 'Change Password', navigateTo: '' } },
    { key: { image: 'signout', text: 'Signout', navigateTo: '' } }
    ]
    var navigationView = (
      <View >
        <Image source={Images.pakistan} style={{ width: 24, height: 24 }} />
        <FlatList
          data={DashboardImages}
          renderItem={({ item }) => DrawLayoutFormat(item.key, this.props.navigation)}
          numColumns={1}
        />
      </View>
    );
    return (
      // <DrawerLayoutAndroid
      //     drawerWidth={200}
      //     ref={'DRAWER'}
      //     drawerPosition={DrawerLayoutAndroid.positions.Left}
      //     renderNavigationView={() => navigationView}
      //     keyboardDismissMode="on-drag"
      //   >
      <Header>
        <Left>
          <TouchableHighlight onPress={this.openDrawer}>
            <Image source={Images.menu} style={{ width: 25, height: 25, }} />
          </TouchableHighlight>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <TouchableHighlight onPress={this.navigationHandler}>
            <Image source={Images[this.props.image]} style={{ width: 30, height: 30, }} />
          </TouchableHighlight>
        </Right>
      </Header>
      // </DrawerLayoutAndroid>
    );
  }
}
export default DrawLayout
