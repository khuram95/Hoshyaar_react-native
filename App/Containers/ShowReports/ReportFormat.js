import React from 'react'
import { 
    View ,
    CheckBox,
    Image,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Platform
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
    console.log("data : ",data)
    return (


        <View style={{ justifyContent: "flex-start" }}>
            <View style={styles.report}>   
                <View style={{ flex: 1, flexDirection: "column" }}>  
                    <View
                    style={{
                    flexDirection: "column",
                    justifyContent: "flex-start"
                    }}
                    >
                    <Text
                    style={{
                        paddingLeft: 15,
                        fontWeight: "bold",
                        fontSize: 20
                    }}
                    >{data['school_name']}</Text>
                    <Text style={styles.belowText}>{data['district'] + '--' + data['tehsil']}</Text>
                    <Text style={styles.belowText}>{data['latitude'] + '--' + data['longitude']}</Text>
                    <Text style={styles.belowText}>{data['user_name']}</Text>
                    <Text style={styles.belowText}>{data['created_at']}</Text>
                    </View>
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
                            <Button
                            transparent
                            dark
                            >
                            <Icon name="ios-text-outline" />
                            <Text style={styles.badgeCount}>Agree</Text>
                            </Button>
                        </View>
                        <View style={styles.footerIcons}>
                            <Button transparent dark>
                            <Icon name="ios-repeat" />
                            <Text style={styles.badgeCount}>Disagree</Text>
                            </Button>
                        </View>
                        <View style={styles.footerIcons}>
                            <Button transparent dark>
                            <Icon name="ios-repeat" />
                            <Text style={styles.badgeCount}>Comments</Text>
                            </Button>
                        </View>
                        </View>       
            </View>
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
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: "#bbb",
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: "column"
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
      paddingLeft: 5
    },
    footerIcons: {
      flexDirection: "row",
      alignItems: "center"
    },
  });
  


