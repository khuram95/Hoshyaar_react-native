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
      singleReport: this.props.getCommentedReport
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
  }

  submitComment = (comment) => {
    this.props.comments({
      user_id: this.props.currentUser.id,
      report_id: this.state.singleReport.id,
      text: comment,
    })
      .then(() => {
        this.setState({ singleReport: this.props.getCommentedReport})
      })
      .catch(error => console.log(error))
  };

  render() {
    const { singleReport } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
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
  currentUser: (state) => get(state, 'auth.currentUser'),
  getCommentedReport: (state) => get(state, 'report.commentedReport'),

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