import Moment from 'react-moment';
import 'moment-timezone';
import { Images, Colors } from '../../Themes/'
import React, { Component } from 'react'
import * as Progress from 'react-native-progress';
import ReportImage from './ReportImage'
import ViewMoreText from 'react-native-view-more-text';


import {
  View,
  CheckBox,
  Dimensions,
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



export default class ReportFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.scrollList = {}
    this.scrollPosition = 0
  }
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress}>View less</Text>
    )
  }
  scrollTo = (forward, count) => {
    this.scrollPosition = forward ?
      Math.min(this.scrollPosition + 175, (count - 2) * 175)
      : Math.max(this.scrollPosition - 175, 0)
    this.scrollList.getScrollResponder()
      .scrollTo({ x: this.scrollPosition, animated: true })
  }
  
  gotoReportDetail = () => {
		const { navigation } = this.props
		navigation.navigate("ReportDetail") //Report li id dalni hai
  }
  
  render() {
    const { report_text, school_name, created_at, district, tehsil, report_address, user_name, photos } = this.props
    return (

      <TouchableOpacity style={styles.report} onPress={this.gotoReportDetail}>

        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {school_name}</Text>
            <Moment element={Text} fromNow>{created_at}</Moment>
          </View>
          <Text style={styles.belowText}>{tehsil + ', ' + district}</Text>
          {/* <Text style={styles.belowText}>{user_name}</Text> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start',}}>
          <Progress.Bar progress={0.4} width={200} color="red" height={15} />
          <Image source={Images.unlock} style={{ width: 15, height: 15, marginLeft: '1%' }} />
        </View>
        <ViewMoreText
          numberOfLines={2}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          // textStyle={{ textAlign: 'center' }}
        >
          <Text style={styles.reportText}> {report_text} </Text>
        </ViewMoreText>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: '5%' }}>
          <FlatList
            data={photos}
            renderItem={(image) => ReportImage(image)}
            horizontal
            pagingEnabled
            ref={(sl) => this.scrollList = sl}
          />
        </View>
        
        <View style={styles.reportFooter}>
          <View style={styles.footerIcons}>
            <Button transparent dark>
              <Image source={Images.agree} style={{ width: 25, height: 25, }} />
              <Text style={styles.badgeCount}>128 Agree</Text>
            </Button>
          </View>
          <View style={styles.footerIcons}>
            <Button transparent dark>
              <Image source={Images.disagree} style={{ width: 25, height: 25, }} />
              <Text style={styles.badgeCount}>45 Disagree</Text>
            </Button>
          </View>
          <View style={styles.footerIcons}>
            <Button transparent dark>
              <Image source={Images.comment} style={{ width: 25, height: 25, }} />
              <Text style={styles.badgeCount}>109 Comments</Text>
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  topMargin: {
    backgroundColor: "white",
    zIndex: -1
  },
  content: {
    padding: 1,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  report: {
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '0.2%',
    paddingBottom: '0.02%',
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column",
    marginBottom: '10%'
  },
  reportText: {
    // minHeight: Dimensions.get('window').height*0.01,
    // marginTop: Dimensions.get('window').height*0.01,
    // marginBottom: Dimensions.get('window').height*0.01,
    // width: Dimensions.get('window').width
    minHeight: '0.02%',
    marginTop: '5%',
    marginBottom: '2%',
    fontSize: 14,
    color: "#555"
  },
  belowText: {
    color: "#aaa",
    fontSize: 14
  },
  reportFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'flex-start'
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: '5%',
    color: "black"
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
});



