import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import Divider from 'react-native-divider';



class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  static navigationOptions = {
    header: null,
  }


  componentDidMount = () => {

  }

  render() {
    const notifications = this.props.notifications
    console.log("this.state.notifications : ", notifications)
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {notifications && notifications.map((notification) =>
            <View>
              <Text style={[styles.text, styles.name]}>{notification && notification.school_name}</Text>
              <Text style={styles.text}>{notification && notification.notification_text}</Text>
              <Text style={[styles.text, styles.created]}>
                <Moment element={Text} fromNow>{notification && notification.report_time}</Moment>
              </Text>
              <Divider orientation="center"></Divider>

            </View>
          )}
        </View>
      </View>

    )
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: (state) => get(state, 'auth.currentUser'),
  notifications: (state) => get(state, 'notification.notification'),

})

const mapDispatchToProps = (dispatch) => ({
  getNotification: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.NotificationRequest(payload, resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
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