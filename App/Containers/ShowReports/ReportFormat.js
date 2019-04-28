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
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/AntDesign";




import {
  View,
  CheckBox,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  Platform,
  ProgressBarAndroid,
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
      isModalVisible: false,
      text: undefined,
      comment_count: get(this.props, 'report.comments.length'),
      isAgree: false,
      isDisagree: false,
      user_id: get(this.props, 'currentUser.id'),
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

  onChangeText = (text) => this.setState({ text });


  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  submitComment = () => {
    this.props.comments({
      user_id: this.props.currentUser.id,
      report_id: this.props.report.id,
      text: this.state.text
    })
      .then(() => {
        alert('Comment Submit');
        this.setState({ comment_count: comment_count + 1 })
      })
  }

  reportReaction = (isagree) => {
    this.props.reportReactions({
      user_id: this.props.currentUser.id,
      report_id: this.props.report.id,
      is_agree: isagree
    })
      .then(() => {
        alert('Reaction Submit');
      })

  }

  isAgreeHandler = () => {
    if (!this.state.isAgree) {
      this.setState({
        isAgree: true,
        isDisagree: false,
      });
    }
    else {
      this.setState({
        isAgree: false,
        isDisagree: false,
      });

    }
    this.reportReaction(this.state.isAgree)

  }
  isDisagreeHandler = () => {
    if (!this.state.isDisagree) {
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
    this.reportReaction(this.state.isAgree)

  }

  render() {
    const { report } = this.props;
    return (
      <View>
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
          {report.report_reactions && report.report_reactions.map((reaction) => {
            if (reaction.user_id == this.state.user_id) {
              if (reaction.isagree == true) {
                this.setState({ isAgree: reaction.is_agree })
                console.log("this.setState({ isAgree: reaction.is_agree }) ", this.state.isAgree)
              } else if (reaction.isagree == false) {
                this.setState({ isDisagree: reaction.is_agree })
                console.log("this.setState({ isDisagree: reaction.is_agree }) ", this.state.isDisagree)
              }
            }
          }
          )}
          <View style={styles.reportFooter}>
            <View style={styles.footerIcons}>
              <TouchableOpacity >
                <Text style={styles.badgeCount}>{report.agree} Agree</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerIcons}>
              <TouchableOpacity>
                <Text style={styles.badgeCount}>{report.dis_agree} Disagree</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerIcons}>
              <TouchableOpacity>
                <Text style={styles.badgeCount}>{this.state.comment_count} Comments</Text>
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
              <Button transparent dark onPress={this.toggleModal}>
                <Image source={Images.comment} style={{ width: 25, height: 25, }} />
                <Text style={styles.badgeCount}>Comment</Text>
              </Button>
            </View>
          </View>

        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>
            <ScrollView style={{ backgroundColor: 'white', flex: 1, padding: '1%' }}>
              {report.comments && report.comments.map((comment) =>
                <View>
                  <Text>{comment && comment.user_name}</Text>
                  <Text>{comment && comment.text}</Text>
                  <Moment element={Text} fromNow>{comment && comment.created_at}</Moment>
                </View>
              )}
            </ScrollView>
            <TextInput
              placeholder="Add a comment..."
              keyboardType="twitter"
              autoFocus={true}
              style={styles.input}
              value={this.state.text}
              onChangeText={this.onChangeText}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
              <TouchableOpacity onPress={this.submitComment}>
                <View style={styles.button}>
                  <Text>Post</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleModal}>
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
})

const mapDispatchToProps = (dispatch) => ({
  comments: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.commentsRequest(payload, resolve, reject))),

  reportReactions: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.reportReactionsRequest(payload, resolve, reject)))


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
    height: 40,
    fontSize: 15,
  },
});



