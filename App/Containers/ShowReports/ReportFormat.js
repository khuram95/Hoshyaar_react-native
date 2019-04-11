import Moment from 'react-moment';
import 'moment-timezone';
import { Images, Colors } from '../../Themes/'
import React from 'react'
import * as Progress from 'react-native-progress';

import { 
    View ,
    CheckBox,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    Platform,
    ProgressBarAndroid
} from 'react-native'
import { 
    Text,
    Container,
  Header,
  Body,
  Content,
  Left,
  Title,
  Thumbnail,
  Col,
  Row,
  Grid,
  Icon,
  Spinner,
  Fab,
  Button,
  Footer,
  Input,
  Right
} from 'native-base'




export default ReportFormat = (data) => {
  return (

       
            <View style={styles.report}> 
             <TouchableOpacity> 
                <View style={{ flex: 1, flexDirection: "column" }}>  
                  
                    <View style={{ flexDirection: "column",justifyContent: "flex-start"}}>



                    <View style={{ flex: 1, flexDirection: "row" ,justifyContent: 'space-between'}}>
                    <Text style={{paddingLeft: 15,fontWeight: "bold",fontSize: 20 }}>
                                      {data['school_name']}</Text>
                  <Moment element={Text} fromNow>{data['created_at']}</Moment>
                   </View>

                    
                    <Text style={styles.belowText}>{data['district'] + '--' + data['tehsil']}</Text>
                    <Text style={styles.belowText}>{data['latitude'] + '--' + data['longitude']}</Text>
                    <Text style={styles.belowText}>{data['user_name']}</Text>
                    </View>
                </View>

               
             
                <View style={{}}>
              <Progress.Bar progress={0.3} width={200} color="red" height={10}/>
              <Image source={Images.unlock} style={{ width: 25, height: 25,}} />
              </View>
             


            <Text 
            style={styles.reportText}
            >{data['report_text']}</Text>

            <View style={{ flex: 1, flexDirection: "row" }}>
            {data['photos'].map((pic) => 
            <Image
            style={{width: 150, height: 150}}
            source={{uri: 'https://c.tribune.com.pk/2016/02/1055025-schoolchildren-1456494957-675-640x480.jpg'}}
            //pic.image.url
            />
            )}
            </View>
                    <View style={styles.reportFooter}>
                        <View style={styles.footerIcons}>
                            <Button transparent dark>
                            <Image source={Images.agree} style={{ width: 25, height: 25,}} />
                            <Text style={styles.badgeCount}>128 Agree</Text>
                            </Button>
                        </View>
                        <View style={styles.footerIcons}>
                            <Button transparent dark>
                            <Image source={Images.disagree} style={{ width: 25, height: 25,}} />                          
                            <Text style={styles.badgeCount}>45 Disagree</Text>
                            </Button>
                        </View>
                        <View style={styles.footerIcons}>
                            <Button transparent dark>
                            <Image source={Images.comment} style={{ width: 25, height: 25,}} />                            
                            <Text style={styles.badgeCount}>109 Comments</Text>
                            </Button>
                        </View>
                        </View>     
                        </TouchableOpacity>   
            </View>
    )
}

const styles = StyleSheet.create({
    topMargin: {
      backgroundColor: "white",
      zIndex: -1
    },
    content: {
      padding: 10,
      backgroundColor: "white"
    },
    heading: {
      fontSize: 32,
      fontWeight: "400",
      marginBottom: 30
    },
    report: {
      paddingTop: 20,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: "black",
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: "column",
    },
    reportText: {
      marginTop: 10,
      fontSize: 18,
      color: "#555"
    },
    belowText:{
        paddingLeft: 15,
        color: "#aaa",
        fontSize: 16
    },
    reportFooter: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 0
    },
    badgeCount: {
      fontSize: 12,
      paddingLeft: 5,
      color:"black"
    },
    footerIcons: {
      flexDirection: "row",
      alignItems: "center"
    },
  });
  


