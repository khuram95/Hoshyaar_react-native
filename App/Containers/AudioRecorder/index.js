import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
// import { get } from 'lodash'
// import { createStructuredSelector } from 'reselect'
import { Item as FormItem, Button, Input } from 'native-base'
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Images from '../../Themes/Images'
import Icon from 'react-native-vector-icons/FontAwesome';

class AudioExample extends Component {

    state = {
        uri: null,
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
        playing: false,
        audioPaused: false,
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    componentDidMount() {
        Sound.setCategory('Playback');
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });

            if (!isAuthorised) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({ currentTime: Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;

        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    _renderPauseButton(onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var title = this.state.paused ? "RESUME" : "PAUSE";
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    _pause = async () => {
        if (!this.state.recording) {
            return;
        }

        try {
            const filePath = await AudioRecorder.pauseRecording();
            this.setState({ paused: true });
        } catch (error) {
            console.error(error);
        }
    }

    _resume = async () => {
        if (!this.state.paused) {
            return;
        }

        try {
            await AudioRecorder.resumeRecording();
            this.setState({ paused: false });
        } catch (error) {
            console.error(error);
        }
    }

    _stop = async () => {
        if (!this.state.recording) {
            return;
        }

        this.setState({ stoppedRecording: true, recording: false, paused: false });

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    _play = async () => {
        if (this.state.recording) {
            await this._stop();
        }
        if (this.state.playing) {
            this._poose();
            this.setState({ playing: !this.state.playing });
            return;
        }
        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.

        var sound = new Sound(this.state.audioPath, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                this.setState({ playing: !this.state.playing });
                sound.play((success) => {
                    if (success) {
                        this.setState({ playing: !this.state.playing });
                    } else {

                    }
                });
            }
        });
    }

    _poose = async () => {
        sound.pause();
    }

    _record = async () => {
        if (this.state.recording) {
            this._stop();
            return;
        }

        if (!this.state.hasPermission) {
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({ recording: true, paused: false });

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        this.setState({
            uri: filePath,
        })
        this.props.saveReportAudioRequest(filePath);
    }

    render() {

        return (
            <View style={styles.container}>
                {
                    this.state.stoppedRecording ?
                        <React.Fragment>
                            <TouchableOpacity onPress={() => { this.setState({ stoppedRecording: !this.state.stoppedRecording, currentTime: 0.0 }) }}>
                                <Icon name="refresh" size={40} color="#841584" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._play}>
                                {this.state.playing
                                    ? <Icon name="stop-circle" size={40} color="#841584" />
                                    : <Icon name="play-circle" size={40} color="#841584" />
                                }
                            </TouchableOpacity>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Text style={styles.progressText}>{this.state.currentTime} s</Text>
                            <TouchableOpacity onPress={this._record}>
                                {
                                    this.state.recording ?
                                        <Icon name="microphone-slash" size={40} color="#841584" />
                                        :
                                        <Icon name="microphone" size={40} color="#841584" />
                                }

                            </TouchableOpacity>
                        </React.Fragment>
                }
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        // color: "#fff"
        fontSize: 28,
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }
});

const mapDispatchToProps = (dispatch) => ({
    saveReportAudioRequest: (audio) => dispatch(Actions.saveReportAudio(audio)),
})

export default connect(null, mapDispatchToProps)(AudioExample)