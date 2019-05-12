import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	View, ImageBackground,StyleSheet, Modal, TouchableOpacity, ActivityIndicator
} from 'react-native'
// import { Button, Text, Form, Item, Input } from 'native-base'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import Hr from 'react-native-hr-plus'
import { Images, Colors } from '../../Themes'
import Actions from '../../Redux/Actions'
import { resolve } from 'url';
import { rejects } from 'assert';

export default Loader = (isShow) => {
	{console.log('helo loader: ', isShow.isShow)}
	return (
		<Modal transparent visible={isShow.isShow}>
			<View style={styles.loaderModal}>
				<ActivityIndicator size={'large'} />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({  
	loaderModal : {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000ae'
  },
})



