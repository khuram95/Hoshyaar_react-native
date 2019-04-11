import React, { Component } from 'react'
import { View,StyleSheet,Dimensions,Image,Thumbnail,Icon,ViewPagerAndroid,TouchableOpacity} from 'react-native'
import { Item as FormItem, Text, Button, Input,Header,Body,Title,Left,Right } from 'native-base'
import style from './style'
import { Images, Colors } from '../../Themes/'
import TrendingReport from './TrendingReport'


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

           <TouchableOpacity></TouchableOpacity>                 
          <View style={styles.reportFooter}>
          <View style={styles.footerIcons}>
          <Button transparent dark style={{width: 200, height: 200}} 
                  onPress={this.DisplayAllReport}>
          <View style={styles.textImage}>
          <Image source={Images.reports} style={styles.image} />                            
          <Text style={styles.badgeCount}>All Reports</Text>
          </View>
          </Button>
        </View>
        <TouchableOpacity></TouchableOpacity>                 
        <View style={styles.footerIcons}>
          <Button transparent dark style={{width: 200, height: 200}} 
                onPress={this.CreateReport}> 
          <View style={styles.textImage}>
          <Image source={Images.editreports} style={styles.image} />                            
          <Text style={styles.badgeCount}>
          Create Report
          </Text>
          </View>
          </Button>
        </View>

        </View>

        <View style={styles.reportFooter}>
        <View style={styles.footerIcons}>
          <Button transparent dark style={{width: 200, height: 200}}>
          <View style={styles.textImage}>
          <Image source={Images.verifiedschool} style={styles.image} />                            
          <Text style={styles.badgeCount}>
          Verify School Data
          </Text>
          </View>
          </Button>
        </View>


        <View style={styles.footerIcons}>
          <Button transparent dark style={{width: 200, height: 200}}>
          <View style={styles.textImage}>
          <Image source={Images.adhoc} style={styles.image} />                            
          <Text style={styles.badgeCount}>
          Ad-Hoc Query
          </Text>
          </View>
          </Button>
        </View>
          </View>
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
    badgeCount: {
      fontSize: 15,
      paddingLeft: 5,
      color:"black",
      textAlign: "center"
    },
    footerIcons: {
      flexDirection: "row",
      alignItems: "center",
      // backgroundColor: 'white'
    },
    image: {
      width: 100,
      height: 100,
    },
    textImage:{
      flexDirection: "column",
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