import React, { Component, } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View, TouchableOpacity
} from 'react-native';

export default class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
    };
  }

  onChangeText = (text) => this.setState({ text });

  onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text }, this.submit);

  submit = () => {
    console.log("I am press")
    const { text } = this.state;
    if (text) {
      this.setState({ text: undefined }, () => this.props.onSubmit(text));
    } else {
      alert('Please enter your comment first');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="height" enabled>
        <View style={styles.container}>
          <TextInput
            placeholder="Add a comment..."
            autoFocus={true}
            style={styles.input}
            value={this.state.text}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEditing}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.submit}
          >
            <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>Post</Text>
          </TouchableOpacity>

        

        </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    // borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});