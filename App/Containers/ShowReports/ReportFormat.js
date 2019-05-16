import Moment from 'react-moment';
import 'moment-timezone';
import { Images, Colors } from '../../Themes/'
import React, { Component } from 'react'
import * as Progress from 'react-native-progress';
import ReportImage from './ReportImage'
import ViewMoreText from 'react-native-view-more-text';
import Divider from 'react-native-divider';
import Modal from "react-native-modal";
import Actions from '../../Redux/Actions'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/EvilIcons";
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import {
  Text,
  Button,

} from 'native-base'

class ReportFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAgreeModalVisible: false,
      isDisagreeModalVisible: false,
      isAgree: false,
      isDisagree: false,
      report: this.props.report,
      user_id: get(this.props, 'currentUser.id'),
    };
    // console.log("current user : ", get(this.props, 'currentUser'))

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

  onChangeText = (text) => this.setState({ text });

  toggleAgreeModal = () =>
    this.setState({ isAgreeModalVisible: !this.state.isAgreeModalVisible });


  toggleDisagreeModal = () =>
    this.setState({ isDisagreeModalVisible: !this.state.isDisagreeModalVisible });

  componentDidMount = () => {
    this.props.report.report_reactions && this.props.report.report_reactions.map((reaction) => {
      if (reaction.user_id === this.state.user_id) {
        if (reaction.is_agree === true) {
          this.setState({ isAgree: reaction.is_agree })
        } else if (reaction.is_agree === false) {
          this.setState({ isDisagree: !reaction.is_agree })
        }
      }
    })
    // console.log('report cdm', this.state.report)
  }
  reportReaction = (isagree) => {
    this.props.reportReactions({
      user_id: this.props.currentUser.id,
      report_id: this.props.report.id,
      is_agree: isagree
    })
      .then(() => {
        this.setState({ report: this.props.getSingleReport })
        console.log("report reaction then : ",this.state.report)
        // this.props.onSubmitComment()
        // alert('Reaction Submit');
      })
  }
  onSubmitComment = () => {
    this.setState({ report: this.props.getCommentedReport })
  }
  toggleComment = () => {
    const { navigation, report } = this.props
    const { onSubmitComment } = this
    this.props.commentedReport(report)
    navigation.navigate("Comment", { onSubmitComment,report })
  }
  isAgreeHandler = () => {
    var backend = ''
    if (!this.state.isAgree) {
      backend = true;
      this.setState({
        isAgree: true,
        isDisagree: false
      })
    }
    else {
      this.setState({
        isAgree: false,
        isDisagree: false,
      });

    }
    this.reportReaction(backend)
  }
  isDisagreeHandler = () => {
    var backend = ''
    if (!this.state.isDisagree) {
      backend = false;
      this.setState({
        isDisagree: true,
        isAgree: false
      });
    }
    else {
      this.setState({
        isDisagree: false,
        isAgree: false
      });
    }
    this.reportReaction(backend)

  }

  render() {
    const { report } = this.state;
    {console.log('state ++', report)}
    return (
      <View>
        <View style={styles.report}
        //onPress={() => this.props.gotoReportDetail && this.props.gotoReportDetail(report)}
        >
          <View style={{ flex: 1, justifyContent: "flex-start" }}>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ flex: 0.6 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, }}>
                  {report.school && report.school.school_name}</Text>
              </View>
              <View style={{
                right: 5,
                position: 'absolute',
                width: '40%',
                alignItems: 'flex-end',
                display: 'flex'
              }}>
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
              renderItem={(image) => 
                <ReportImage
                data = {image}
              />
              }
              horizontal
              pagingEnabled
              ref={(sl) => this.scrollList = sl}
            />
          </View>

          <View style={styles.reportFooter}>
            <View style={styles.footerIcons}>
              <TouchableOpacity onPress={this.toggleAgreeModal}>
                <Text style={styles.badgeCount}>{report.agree} Agree</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerIcons}>
              <TouchableOpacity onPress={this.toggleDisagreeModal}>
                <Text style={styles.badgeCount}>{report.dis_agree} Disagree</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerIcons}>
              <TouchableOpacity onPress={this.toggleComment}>
                <Text style={styles.badgeCount}>{report.comments.length} Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider orientation="center"></Divider>
          <View style={styles.reportFooter}>
            <View style={styles.footerIcons}>
              <Button transparent dark onPress={this.isAgreeHandler}>
                {this.state.isAgree ?
                  <View style={styles.footerIcons}>
                    <Icon name="like1" color="blue" size={30} />
                    <Text style={styles.afterbadgeCount}>AGREE</Text></View> :
                  <View style={styles.footerIcons}>
                    <Icon name="like2" size={30} />
                    <Text style={styles.beforebadgeCount}>AGREE</Text></View>
                }
              </Button>
            </View>
            <View style={styles.footerIcons}>
              <Button transparent dark onPress={this.isDisagreeHandler}>
                {this.state.isDisagree ?
                  <View style={styles.footerIcons}>
                    <Icon name="dislike1" color="blue" size={30} />
                    <Text style={styles.afterbadgeCount}>DISAGREE</Text></View> :
                  <View style={styles.footerIcons}>
                    <Icon name="dislike2" size={30} />
                    <Text style={styles.beforebadgeCount}>DISAGREE</Text></View>
                }
              </Button>
            </View>
            <View style={styles.footerIcons}>
              <Button transparent dark onPress={this.toggleComment}>
                <Icons name="comment" size={30} />
                <Text style={styles.badgeCount}>Comment</Text>
              </Button>
            </View>
          </View>

        </View>
        <Modal
          isVisible={this.state.isAgreeModalVisible
          }>
          <View style={styles.modalContent}>
            <ScrollView style={styles.report}>
              {report.report_reactions && report.report_reactions.map((reaction) =>
                reaction.is_agree === true ?
                  <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, }}>
                      {reaction && reaction.user_name}</Text>
                    <Moment element={Text} fromNow>{reaction && reaction.created_at}</Moment>
                    <Divider orientation="center"></Divider>
                  </View> : null
              )}
            </ScrollView>


            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
              <TouchableOpacity onPress={this.toggleAgreeModal}>
                <View style={styles.button}>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isDisagreeModalVisible
          }>
          <View style={styles.modalContent}>
            <ScrollView style={styles.report}>
              {report.report_reactions && report.report_reactions.map((reaction) =>
                reaction.is_agree === false ?
                  <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, }}>
                      {reaction && reaction.user_name}</Text>
                    <Moment element={Text} fromNow>{reaction && reaction.created_at}</Moment>
                    <Divider orientation="center"></Divider>
                  </View> : null
              )}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
              <TouchableOpacity onPress={this.toggleDisagreeModal}>
                <View style={styles.button}>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>




      </View>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: (state) => get(state, 'auth.currentUser'),
  getSingleReport: (state) => get(state, 'report.singleReport'),
  getCommentedReport: (state) => get(state, 'report.commentedReport'),
})
const mapDispatchToProps = (dispatch) => ({
  comments: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.commentsRequest(payload, resolve, reject))),
  reportReactions: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.reportReactionsRequest(payload, resolve, reject))),
  singleReport: (report) => dispatch(Actions.saveSingleReport(report)),
  commentedReport: (report) => dispatch(Actions.saveCommentedReport(report)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ReportFormat)

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
  beforebadgeCount: {
    fontSize: 12,
    paddingLeft: '5%',
    color: "black"
  },
  afterbadgeCount: {
    fontSize: 12,
    paddingLeft: '5%',
    color: "blue"
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 22,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    height: 20,
    fontSize: 15,
  },
  bottomModal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'green',
  },
});



