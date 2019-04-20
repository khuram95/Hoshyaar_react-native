import React, { Component } from 'react'
import { View,StyleSheet,FlatList,Image,Thumbnail,Icon,ViewPagerAndroid,TouchableOpacity} from 'react-native'
import { Item as FormItem, Text, Button, Input,Header,Body,Title,Left,Right } from 'native-base'
import style from './style'
import { Images, Colors } from '../../Themes/'
import TrendingReport from './TrendingReport'
import DisplayImage from './DisplayImage'

class DashBoardScreen extends Component{
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

  render(){
    const DashboardImages = [ {key: { image: 'reports', text: 'All Reports', navigateTo:  'ShowReports'}},
                              {key: { image: 'editreports', text: 'Create Report', navigateTo:  'ManualGoogleMap'}},
                              {key: { image: 'verifiedschool', text: 'Verify School Data', navigateTo:  'vsd'}},
                              {key: { image: 'adhoc', text: 'Adhoc Query', navigateTo:  ''}}
                            ] 
    return(
      <View style={{flex:1}}>

          <Header>
          
            {/* <Left>
            <Button>
                <Text>Notification</Text>
              </Button>
            </Left>
             */}
            <Body>
              <Title>Home</Title>
            </Body>

            <Right>
              <Button transparent dark>
              <Image source={Images.Notification} style={{ width: 35,height:35,}} />                            
              </Button>
            </Right>

          </Header>
        <View style={{flex:0.5,backgroundColor:''}}>
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
          <View style={{flex:0.5}}>
            <FlatList
              data={DashboardImages}
              renderItem={({item}) => DisplayImage(item.key,this.props.navigation)}
              numColumns={2}
            />
          </View>
          
      </View>
    )
  }
}
  export default DashBoardScreen

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