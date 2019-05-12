import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import ViewMoreText from 'react-native-view-more-text';

export default class CommentFormat extends Component {

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

  render() {
    const { comment } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          
            <Text style={[styles.text, styles.name]}>{comment && comment.user_name}</Text>
          
            <ViewMoreText
						numberOfLines={2}
						renderViewMore={this.renderViewMore}
						renderViewLess={this.renderViewLess}
					>
            <Text style={styles.text}>{comment && comment.text}</Text>
					</ViewMoreText>

          <Text style={[styles.text, styles.created]}>
            <Moment element={Text} fromNow>{comment && comment.created_at}</Moment>
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});