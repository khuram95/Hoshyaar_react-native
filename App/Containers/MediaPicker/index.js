import React from 'react';
import {
    AppRegistry,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {
    state = {
        avatarSource: null,
        videoSource: null,
    };

    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectVideoTapped = this.selectVideoTapped.bind(this);
    }

    selectPhotoTapped() {
        const options = {
            mediaType: 'photo'
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let source = { uri: response.uri };


                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        };

        ImagePicker.showImagePicker(options, (response) => {
s
            if (response.didCancel) {
s            } else if (response.error) {
s            } else if (response.customButton) {
s            } else {
                this.setState({
                    videoSource: response.uri,
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View
                        style={[
                            styles.avatar,
                            styles.avatarContainer,
                            { marginBottom: 20 },
                        ]}
                    >
                        {this.state.avatarSource === null ? (
                            <Text>Select a Photo</Text>
                        ) : (
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                            )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer]}>
                        <Text>Select a Video</Text>
                    </View>
                </TouchableOpacity>

                {this.state.videoSource && (
                    <Text style={{ margin: 8, textAlign: 'center' }}>
                        {this.state.videoSource}
                    </Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
});