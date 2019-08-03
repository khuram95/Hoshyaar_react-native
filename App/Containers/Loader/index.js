import React, { Component } from 'react'
import {
	View, StyleSheet, Modal, ActivityIndicator
} from 'react-native'

export default Loader = (isShow) => {
	return (
		<Modal transparent visible={isShow.isShow}>
			<View style={styles.loaderModal}>
				<ActivityIndicator size={'large'} />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	loaderModal: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000ae'
	},
})



