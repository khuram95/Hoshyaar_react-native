import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { Item as FormItem, Button, Input } from 'native-base'
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

class AudioExample extends Component {

    state = {
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
            console.warn('Can\'t pause, not recording!');
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
            console.warn('Can\'t resume, not paused!');
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
            console.warn('Can\'t stop, not recording!');
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

        // if (this.state.audioPaused) {
        //     sound.play();
        //     this.setState({ playing: true, audioPaused: false });
        // }

        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
            var sound = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });
            this.setState({ playing: !this.state.playing });
            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        this
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }

    _poose = async () => {
        sound.pause();
        // this.setState({ playing: false, audioPaused: true });
    }

    _record = async () => {
        if (this.state.recording) {
            console.warn('Already recording!');
            this._stop();
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
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
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.progressText}>{this.state.currentTime}s</Text>

                <Button /* style={{ alignSelf: 'center', width: '80%' }} */ onPress={this._record}>
                    <Text /* style={{ width: '100%', fontWeight: "800", textAlign: "left" }} */>
                        {this.state.recording?'Stop Record':'Start Record'} {'    '}
                    </Text>
                </Button>
                
                
                <Button /* style={{ alignSelf: 'center', width: '80%' }} */ onPress={this._play}>
                    <Text /* style={{ width: '100%', fontWeight: "800", textAlign: "left" }} */>
                    {this.state.playing?'Stop Audio':'Play Audio'}
                    </Text>
                </Button>
                

            </View>


            // <View style={styles.container}>
            //     <View style={styles.controls}>
            //         {this._renderButton("RECORD", () => { this._record() }, this.state.recording)}
            //         {this._renderButton("PLAY", () => { this._play() })}
            //         {this._renderButton("STOP", () => { this._stop() })}
            //         {/* {this._renderButton("PAUSE", () => { this._pause() })} */}
            //         {this._renderPauseButton(() => { this.state.paused ? this._resume() : this._pause() })}
            //         <Text style={styles.progressText}>{this.state.currentTime}s</Text>
            //     </View>
            // </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        // paddingTop: 50,
        // fontSize: 50,
        color: "#fff"
    },
    button: {
        // padding: 20
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

export default AudioExample;