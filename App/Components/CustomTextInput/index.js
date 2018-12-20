import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, Text } from 'react-native'
import { isEmpty } from 'lodash'
import styles from './styles'
import { Colors } from '../../Themes'

export default class CustomTextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
  }
  render() {
    const { errors, value, editable } = this.props
    return (
      <View style={styles.inputContainer}>
        {
          this.props.label &&
            <Text style={styles.inputLabel}>{this.props.label}</Text>
        }
        <TextInput
          underlineColorAndroid='transparent'
          style={this.props.isLarge ? styles.inputTextLarge : styles.inputText}
          placeholder={this.props.placeholder ? this.props.placeholder : ''}
          value={value ? value : ''}
          autoCorrect={false}
          editable={editable}
          multiline={this.props.isLarge ? true : false}
          onChange={(e) => { this.props.changeText(e.nativeEvent.text) }}
        />
        {!isEmpty(errors) && <Text style={styles.errorSignleLine}>
          {errors}
        </Text>}
      </View>
    )
  }
}
