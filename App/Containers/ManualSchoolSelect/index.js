import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Body, Title, Left, Right } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'

class ManualSchoolSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			district: '', tehsil: '', school: '', uniqueDistrict: []
			, uniqueTehsil: [], uniqueschool: []
		};

		this.props.allSchoolsData()
			.then(() => {
				let uniqueDist = [...new Set(get(this.props, 'allSchools').map(school => school.district))];
				this.setState({ uniqueDistrict: uniqueDist })

				let uniqueTeh = [...new Set(get(this.props, 'allSchools').map(school => school.tehsil))];
				this.setState({ uniqueTehsil: uniqueTeh })

				this.setState({ uniqueschool: this.props.allSchools })
				console.log('this.state.uniqueschool', this.state.uniqueschool)


			})
	}

	updateDistrict = (district) => {
		this.setState({ district: district })
		this.props.uniqueSchoolData({ district, tehsil: '' })
			.then(() => {
				let uniqueTeh = [...new Set(get(this.props, 'uniqueData').map(school => school.tehsil))];
				this.setState({ uniqueTehsil: uniqueTeh })
			})
	}

	updateTehsil = (tehsil) => {
		this.setState({ tehsil: tehsil })
		this.props.uniqueSchoolData({ district: '', tehsil })
			.then(() => {
				this.setState({ uniqueschool: this.props.uniqueData })
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


		return (
			<View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>

				<Header>

					{/* <Left>
            <Button>
                <Text>Notification</Text>
              </Button>
            </Left>
             */}
					<Body>
						<Title>Manual Select</Title>
					</Body>

					{/* <Right>
              <Button transparent dark>
              <Image source={Images.Notification} style={{ width: 35,height:35,}} />                            
              </Button>
            </Right> */}

				</Header>


				<Text>Select District</Text>
				<View  style={styles.container}>
					<Picker selectedValue={this.state.district}
						onValueChange={(itemValue, itemIndex) => this.updateDistrict(itemValue)}>
						{this.state.uniqueDistrict && this.state.uniqueDistrict.map((district) =>
							<Picker.Item label={district} value={district} />)}
					</Picker>
				</View>

				<Text>Select Tehsil</Text>
				<View  style={styles.container}>
				<Picker selectedValue={this.state.tehsil}
					onValueChange={(itemValue, itemIndex) => this.updateTehsil(itemValue)}>
					{this.state.uniqueTehsil && this.state.uniqueTehsil.map((tehsil) =>
						<Picker.Item label={tehsil} value={tehsil} />)
					}
				</Picker>
				</View>

				<Text>Select School</Text>
				<View  style={styles.container}>
				<Picker selectedValue={this.state.school}
					onValueChange={(itemValue, itemIndex) => this.updateSchool(itemValue)}>
					{this.state.uniqueschool && this.state.uniqueschool.map((school) =>
						<Picker.Item label={school.school_name} value={school} />)}
				</Picker>
				</View>


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
	uniqueData: (state) => get(state, 'school.uniqueSchoolsData')
})

const mapDispatchToProps = (dispatch) => ({

	allSchoolsData: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),

	uniqueSchoolData: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.uniqueSchoolsDataRequest(payload, resolve, reject)))
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