import React, { Component } from 'react'
import DashBoardScreen from './DashBoardScreen'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'


class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    static navigationOptions = {
        header: null,
    }


    componentDidMount = () => {
        this.props.getNotification({
            user_id: this.props.currentUser.id,
        })
            .then(() => {
            })
    }

    render() {
        return (
            <DashBoardScreen navigation={this.props.navigation} />
        )
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: (state) => get(state, 'auth.currentUser'),
})

const mapDispatchToProps = (dispatch) => ({
    getNotification: (payload) => new Promise((resolve, reject) =>
        dispatch(Actions.NotificationRequest(payload, resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
