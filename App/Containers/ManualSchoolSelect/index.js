import React, { Component } from 'react'
import { View,Picker,StyleSheet} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'

class ManualSchoolSelect extends Component{
	constructor(props) {
		super(props);
		this.state = {district: '',tehsil:'',school:'',uniqueDistrict:[]
																				,uniqueTehsil:[],uniqueschool:[]};

		this.props.allSchoolsData()
		.then(() => {
			let uniqueDist = [...new Set(get(this.props, 'allSchools').map(school => school.district))];
			this.setState({uniqueDistrict: uniqueDist})
			let uniqueTeh = [...new Set(get(this.props, 'allSchools').map(school => school.tehsil))];
			this.setState({uniqueTehsil: uniqueTeh})
			let uniqueScl = [...new Set(get(this.props, 'allSchools').map(school => school.school_name))];
			this.setState({uniqueschool: uniqueScl})
			
		})
	}

	updateDistrict = (district) => {
		 this.setState({district:district})
		 console.log("District Name is : ",district)

	}

		updateTehsil = (tehsil) => {
			this.setState({ tehsil:tehsil})
	}

	updateSchool = (school) => {
		this.setState({ school:school })
	}


	gotoSchoolDetail = () => {
    const { navigation } = this.props
      navigation.navigate("SchoolDetail")
  }

	render(){


		return(
			<View style = {{ 
					flex:1,
					flexDirection:'column',
					justifyContent:'space-between',
					 }}>
				<Text style={{textAlign: "center"}}>Manual Select</Text>	

			

			<Picker selectedValue = {this.state.district} 
														 onValueChange = {this.updateDistrict}>
				<Picker.Item label = "Select Districts"  value = "" />
					{this.state.uniqueDistrict && this.state.uniqueDistrict.map((district) =>
				<Picker.Item label = {district} value = {district} />)}
			</Picker>
			<Text style = {styles.text}>{this.state.district}</Text>

		
			<Picker selectedValue = {this.state.tehsil} onValueChange = {this.updateTehsil}>
				<Picker.Item label = "Select Tehsils" value = "" />
				{this.state.uniqueTehsil && this.state.uniqueTehsil.map((tehsil) =>
				<Picker.Item label = {tehsil} value = {tehsil} />)}
			</Picker>
			<Text style = {styles.text}>{this.state.tehsil}</Text>


			<Picker selectedValue = {this.state.school} onValueChange = {this.updateSchool}>
				<Picker.Item label = "Select Schools" value = "" />
				{this.state.uniqueschool && this.state.uniqueschool.map((school_name) =>
				<Picker.Item label = {school_name} value = {school_name} />)}
			</Picker>
			<Text style = {styles.text}>{this.state.school}</Text>


			<Button style={{alignSelf: 'center',width: '50%'}}    
								onPress={this.gotoSchoolDetail}> 
					<Text style={{width: '100%',fontWeight: "800",textAlign: "center"}}>
						Ok
					</Text>
				</Button>

			</View>




		)
	}
}


const mapStateToProps = createStructuredSelector ({
	allSchools: (state) => get(state, 'school.allSchoolsData')
})

const mapDispatchToProps = (dispatch) => ({
	allSchoolsData: (payload) => new Promise((resolve, reject) =>
		dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManualSchoolSelect)
	
	const styles = StyleSheet.create({
		text: {
			 fontSize: 30,
			 alignSelf: 'center',
			 color: 'red'
		}
 })