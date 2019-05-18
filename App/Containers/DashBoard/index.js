import React, { Component } from 'react'
import { View } from 'react-native'
import { Item } from 'native-base'
import DashBoardScreen from './DashBoardScreen'
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'


class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // deviceInformation: {},
        }

    }
    static navigationOptions = {
        header: null,
    }
    // componentDidMount = () => {
    //     OneSignal.init("289a3983-3872-4647-aa6f-1740c1d57c82");
    //     console.log("OneSignal Working")
    //     console.log("this.props.currentuser", this.props.currentUser)
    //     // OneSignal.addEventListener('ids', (payload) => this.props.onesignal({ payload }));
    //     OneSignal.addEventListener('received', this.onReceived);
    //     OneSignal.addEventListener('opened', this.onOpened);
    //     OneSignal.addEventListener('ids', (payload) => this.props.oneSignal({ 
    //         user_id: this.props.currentUser.id,payload }));
    //     OneSignal.configure()
    //     console.log("this.props cdm :", this.props)

    // }
    // onReceived(notification) {
    //     console.log("Notification received: ", notification);
    // }

    // onOpened(openResult) {
    //     console.log('Message: ', openResult.notification.payload.body);
    //     console.log('Data: ', openResult.notification.payload.additionalData);
    //     console.log('isActive: ', openResult.notification.isAppInFocus);
    //     console.log('openResult: ', openResult);
    // }

    // onIds(device) {
    //     console.log('Device info: ', device);
    //     console.log("this.props.deviceInformation :", device)
    //     console.log("this.props :", this.props)

    //     // this.props.onesignal({ payload: device })
    // }

    render() {
        // console.log("this.props render :", this.props)
        return (
            <DashBoardScreen navigation={this.props.navigation} />
        )
    }
}
const mapStateToProps = createStructuredSelector({
    // currentUser: (state) => get(state, 'auth.currentUser'),
})

const mapDispatchToProps = (dispatch) => ({
    // oneSignal: (payload) => new Promise((resolve, reject) =>
    //     dispatch(Actions.oneSignalRequest(payload, resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
