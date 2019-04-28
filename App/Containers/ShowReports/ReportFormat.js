import Moment from 'react-moment';
import 'moment-timezone';
import { Images, Colors } from '../../Themes/'
import React, { Component } from 'react'
import * as Progress from 'react-native-progress';
import ReportImage from './ReportImage'
import ViewMoreText from 'react-native-view-more-text';
import Modal from "react-native-modal";



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

  static navigationOptions = {
    header: null,
  }

  render() {
    const { report } = this.props
    return (
      <TouchableOpacity style={styles.report}
      //onPress={() => this.props.gotoReportDetail && this.props.gotoReportDetail(report)}
      >
        <View style={{ flex: 1, justifyContent: "flex-start" }}>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ flex: 0.6 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, }}>
                {report.school && report.school.school_name}</Text>
            </View>
            <View style={{ flex: 0.4 }}>
              <Moment element={Text} fromNow>{report && report.created_at}</Moment>
            </View>
          </View>

          <Text style={styles.belowText}>
            {report.school && report.school.tehsil + ' '} {report.school && report.school.district}</Text>
          {/* <Text style={styles.belowText}>{report.user && report.user.user_name}</Text> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Progress.Bar progress={0.4} width={200} color="red" height={15} />
          <Image source={Images.unlock} style={{ width: 15, height: 15, marginLeft: '1%' }} />
        </View>
        <ViewMoreText
          numberOfLines={2}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
        >
          <Text style={styles.reportText}> {report && report.report_text} </Text>
        </ViewMoreText>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: '5%' }}>
          <FlatList
            data={report.photos && report.photos}
            renderItem={(image) => ReportImage(image)}
            horizontal
            pagingEnabled
            ref={(sl) => this.scrollList = sl}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}
        />

        <View style={styles.reportFooter}>
          <View style={styles.footerIcons}>
            <Button transparent dark>
              <Image source={Images.agree} style={{ width: 25, height: 25, }} />
              <Text style={styles.badgeCount}>Agree</Text>
            </Button>
          </View>
          <View style={styles.footerIcons}>
            <Button transparent dark>
              <Image source={Images.disagree} style={{ width: 25, height: 25, }} />
              <Text style={styles.badgeCount}>Disagree</Text>
            </Button>
          </View>
          <View style={styles.footerIcons}>
            <Button transparent dark>
              <Image source={Images.comment} style={{ width: 25, height: 25, }} />
              <Text style={styles.badgeCount}>Comments</Text>
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



