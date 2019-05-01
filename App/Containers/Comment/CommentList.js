import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import CommentFormat from './CommentFormat';
import CommentInput from './CommentInput';
import Actions from '../../Redux/Actions'
import Icon from "react-native-vector-icons/AntDesign";



class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
    };
  }


  static navigationOptions = ({
    navigation
  }) => ({
    headerLeft: <TouchableOpacity
      onPress={
        () => {
          navigation.state.params.onSubmitComment()
          navigation.goBack(null)
        }
      }
    ><Icon name="arrowleft" size={30} />
    </TouchableOpacity>,
  })

  static rightHeaderAction() {
    console.log('hello abc')
  }


  // onRefresh = () => this.fetchComments();

  // fetchComments =  () => {
  //   this.setState({ refreshing: true });
  // };

  submitComment = (comment) => {
    // this._scrollView.scrollTo({ y: 0 });
    // console.log("comment going  :", this.props.navigation.state.params.user.id,this.props.navigation.state.params.report.id,comment)
    this.props.comments({
      user_id: this.props.currentUser.id,
      report_id: this.props.singleReport.id,
      text: comment,
    })
      .then(() => {
        alert('Comment Submit');
      })
      .catch(error => console.log(error))
  };

  render() {
    const { singleReport } = this.props
    console.log('hello update: ', singleReport)
    console.log("this.props comment: ", singleReport)
    return (
      <View style={styles.container}>
        <ScrollView
        // ref={(scrollView) => { this._scrollView = scrollView; }}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.refreshing}
        //     onRefresh={this.onRefresh}
        //   />
        // }
        >
          {singleReport.comments && singleReport.comments.map((comment) =>
            <CommentFormat comment={comment} />
          )}
        </ScrollView>
        <CommentInput onSubmit={this.submitComment} />
      </View>
    );
  }

}
const mapStateToProps = createStructuredSelector({
  singleReport: (state) => get(state, 'report.singleReport'),
  currentUser: (state) => get(state, 'auth.currentUser'),
})
const mapDispatchToProps = (dispatch) => ({
  comments: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.commentsRequest(payload, resolve, reject))),
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  }
});