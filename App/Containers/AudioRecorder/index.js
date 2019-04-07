import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
    View, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView, Linking,
    ScrollView
} from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Hr from 'react-native-hr-plus'
import { Images, Colors } from '../../Themes/'
import Actions from '../../Redux/Actions'
import styles from './styles'
import AudioExample from './AudioExample';


class AudioRecorder extends Component {
    static propTypes = {
    }

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = { isPlaying: false }
    }

    stopPlaying = () => {
        this.setState({ isPlaying: false })
        // AudioPlayer.stop()
    }

    startPlaying = (item) => {
        // const audio = item.voiceTag
        this.setState({ isPlaying: true })
        // AudioPlayer.playWithUrl(audio)
    }

    componentDidMount() {
    }

    render() {
        return (
            // <TouchableOpacity
            //     style={{ backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', height: '100%' }}
            //     onPress={() => this.state.isPlaying ? this.stopPlaying() : this.startPlaying()}
            // >
            //     {this.state.isPlaying
            //         ? <Image source={Images.stopIcon} style={{ width: 65, height: 65 }} />
            //         : <Image source={Images.playIcon} style={{ width: 65, height: 65 }} />
            //     }
            // </TouchableOpacity>
            <AudioExample navigation={ this.props.navigation}/>
        )
    }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder)