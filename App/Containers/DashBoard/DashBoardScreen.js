import React, { Component } from 'react'
import { View,StyleSheet,Dimensions,Image} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
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

       <Text style={{textAlign: "center"}}>
					Home
				</Text>	

        <View style={{flex:0.5,backgroundColor:'green'}}>
        <TrendingReport/>

          </View>


          <View style={{flex:0.5}}>

                            
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
      backgroundColor: 'white'
    },
    image: {
      width: 100,
      height: 100,
    },
    textImage:{
      flexDirection: "column",
    }

  });