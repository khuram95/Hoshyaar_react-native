import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Body, Title, Left, Right } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import DrawLayout from '../DrawLayout'


class ManualSchoolSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			district: '', tehsil: '', school: '', uniqueDistrict: []
			, uniqueTehsil: [], uniqueschool: []
		};
		this.props.getDistrict()
		.then((response) =>
			console.log("hahhasdah", get(this.props))
		)
	}
	static navigationOptions = {
		header: null,
	}
	// getDistrict = () => {
	// 	this.props.dist
	// }
	updateDistrict = (district) => {
		this.setState({ district: district })
		this.props.getTehsil({ district })
			.then(() => {
				console.log('ok')
			})
	}
	updateTehsil = (tehsil) => {
		this.setState({ tehsil: tehsil })
		this.props.allSchoolsData({ tehsil })
			.then(() => {
				console.log('tehsil was going')
				//this.setState({ uniqueschool: this.props.uniqueData })
			})
	}

	updateSchool = (school) => {
		this.setState({ school: school })
	}
	gotoSchoolDetail = () => {
		const { navigation } = this.props
		navigation.navigate("SchoolDetail", { id: this.state.school })
	}
	render() {
		console.log("hahhah", this.props)
		return (
			<View style={{
				flex: 1,
				flexDirection: 'column',
				// justifyContent: 'space-between',
			}}>
				<DrawLayout title="Manual Select" image='' />
				<Text>Select District</Text>
				<View style={styles.container}>
					<Picker selectedValue={this.state.district}
						onValueChange={(itemValue, itemIndex) => this.updateDistrict(itemValue)}>
						{get(this.props, 'allDistricts').map((district) =>
							<Picker.Item label={district} value={district} />)}
					</Picker>
				</View>
				<Text>Select Tehsil</Text>
				{get(this.props, 'allTehsils') &&
				<View style={styles.container}>
					<Picker selectedValue={this.state.tehsil}
						onValueChange={(itemValue, itemIndex) => this.updateTehsil(itemValue)}>
						{get(this.props, 'allTehsils').map((tehsil) =>
							<Picker.Item label={tehsil} value={tehsil} />)
						}
					</Picker>
				</View>
				}
				<Text>Select School</Text>
				{ get(this.props, 'allSchools') &&
				<View style={styles.container}>
					<Picker selectedValue={this.state.school}
						onValueChange={(itemValue, itemIndex) => this.updateSchool(itemValue)}>
						{get(this.props, 'allSchools').map((school) =>
							<Picker.Item label={school.school_name} value={school} />)}
					</Picker>
				</View>
				}
				<Button style={{ alignSelf: 'center', width: '50%' }}
					onPress={this.gotoSchoolDetail}>
					<Text style={{ width: '100%', fontWeight: "800", textAlign: "center" }}>
						Ok
					</Text>
				</Button>
			</View>
		)
	}
}
const mapStateToProps = createStructuredSelector({
	allSchools: (state) => get(state, 'school.allSchoolsData'),
	uniqueData: (state) => get(state, 'school.uniqueSchoolsData'),
	allDistricts: (state) =>  get(state, 'school.districts'),
	allTehsils: (state) =>  get(state, 'school.tehsils'),
})
const mapDispatchToProps = (dispatch) => ({
	getDistrict: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.getDistrictsRequest(payload, resolve, reject))),
	getTehsil: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.getTehsilsRequest(payload, resolve, reject))),
			
	allSchoolsData: (payload) => new Promise((resolve, reject) =>
	 	dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),
	// uniqueSchoolData: (payload) => new Promise((resolve, reject) =>
	// 	dispatch(Actions.uniqueSchoolsDataRequest(payload, resolve, reject)))
})
export default connect(mapStateToProps, mapDispatchToProps)(ManualSchoolSelect)
const styles = StyleSheet.create({
	text: {
		fontSize: 30,
		alignSelf: 'center',
		color: 'red'
	},
	container: {
		borderRadius: 10,
		borderWidth: 1,
	},
})