import React, { Component} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import CommentFormat from './CommentFormat';
import CommentInput from './CommentInput';
import Actions from '../../Redux/Actions'


class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
    };
  }

  static navigationOptions = {
    header: null,
  }

  // onRefresh = () => this.fetchComments();

  // fetchComments =  () => {
  //   this.setState({ refreshing: true });
  // };

  submitComment = (comment) => {
    // this._scrollView.scrollTo({ y: 0 });
    console.log("comment going  :", this.props.navigation.state.params.user.id,this.props.navigation.state.params.report.id,comment)
    this.props.comments({
      user_id: this.props.navigation.state.params.user.id,
      report_id: this.props.navigation.state.params.report.id,
      text: comment,
    })
      .then(() => {
        alert('Comment Submit');
      })
      .catch(error=>console.log(error))
  };

  render() {
    const report = this.props.navigation.state.params.report
    const user = this.props.navigation.state.params.user
    console.log("this.props comment: ", report, user)
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
          {report.comments && report.comments.map((comment) =>
            <CommentFormat comment={comment} />
          )}
        </ScrollView>
        <CommentInput onSubmit={this.submitComment} />
      </View>
    );
  }

}
const mapStateToProps = createStructuredSelector({

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