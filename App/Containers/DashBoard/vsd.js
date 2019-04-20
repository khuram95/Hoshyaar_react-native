import React, { Component } from 'react'
import { View, StyleSheet, DrawerLayoutAndroid, TouchableHighlight, ToolbarAndroid, FlatList, Image, Thumbnail, Icon, ViewPagerAndroid, TouchableOpacity } from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Body, Title, Left, Right } from 'native-base'
import style from './style'
import { Images, Colors } from '../../Themes/'
import TrendingReport from './TrendingReport'
import DisplayImage from './vsdformat'


class vsd extends Component {
  constructor(props) {
    super(props);

  }
  static navigationOptions = {
    header: null,
  }
  openDrawer = () => {
    console.log("Hello")
    this.refs['DRAWER'].openDrawer()
  }


  render() {
    const DashboardImages = [ {key: { image: 'reports', text: 'All Reports', navigateTo:  'ShowReports'}},
    {key: { image: 'editreports', text: 'Create Report', navigateTo:  'ManualGoogleMap'}},
    {key: { image: 'verifiedschool', text: 'Verify School Data', navigateTo:  'vsd'}},
    {key: { image: 'adhoc', text: 'Adhoc Query', navigateTo:  ''}},
    {key: { image: 'key', text: 'Change Password', navigateTo:  ''}},
    {key: { image: 'signout', text: 'Signout', navigateTo:  ''}}


  ] 
    var navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Image source={Images.pakistan} style={{ width: 300, height: 200}}/>                            
          <FlatList
              data={DashboardImages}
              renderItem={({item}) => DisplayImage(item.key,this.props.navigation)}
              numColumns={1}
          />
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        keyboardDismissMode="on-drag"
        >
        <Header>
          <Left>
            <TouchableHighlight onPress={this.openDrawer}>
             <Image source={Images.menu} style={{ width: 25, height: 25, }}/>                            
            </TouchableHighlight>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent dark>
              <Image source={Images.Notification} style={{ width: 30, height: 30, }} />
            </Button>
          </Right>

        </Header>


      </DrawerLayoutAndroid>
    );
  }
}
export default vsd
