import React, { Component } from 'react'
import { View,Picker,StyleSheet} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'

class ManualSchoolSelect extends Component{
	constructor(props) {
		super(props);
		this.state = {district: '',tehsil:'',school:''};

	}

	updateDistrict = (district) => {
		 this.setState({ district: this.state.district })
		 console.log(this.state.district)
	}

		updateTehsil = (tehsil) => {
			this.setState({ tehsil: this.state.tehsil })
	}

	updateSchool = (school) => {
		this.setState({ district: this.state.school })
	}


	CreateReport = () => {
    const { navigation } = this.props
      navigation.navigate("Report")
  }

	// showcontent = () => { 
	// 	const reportContent = this.state.reportcontent
	
	// 	this.props.createReport(reportContent)
	// 	.then(() =>{
	// 		console.log('successfully done')
	// 	})
	// }


	render(){
		return(
			<View>
				<Text style={{textAlign: "center"}}>Manual Select</Text>	

				<Text>{'\n\n\n\n'}</Text>

			<Picker selectedValue = {this.state.district} onValueChange = {this.updateDistrict}>
				<Picker.Item label = "Select Districts" value = "steve" />
				<Picker.Item label = "Steve" value = "steve" />
				<Picker.Item label = "Ellen" value = "ellen" />
				<Picker.Item label = "Maria" value = "maria" />
			</Picker>
			<Text style = {styles.text}>{this.state.district}</Text>

			<Text>{'\n\n'}</Text>

			<Picker selectedValue = {this.state.tehsil} onValueChange = {this.updateSchool}>
				<Picker.Item label = "Select Tehsils" value = "steve" />
				<Picker.Item label = "Steve" value = "steve" />
				<Picker.Item label = "Ellen" value = "ellen" />
				<Picker.Item label = "Maria" value = "maria" />
			</Picker>
			<Text style = {styles.text}>{this.state.tehsil}</Text>

			<Text>{'\n\n'}</Text>

			<Picker selectedValue = {this.state.school} onValueChange = {this.updateSchool}>
				<Picker.Item label = "Select Schools" value = "steve" />
				<Picker.Item label = "Steve" value = "steve" />
				<Picker.Item label = "Ellen" value = "ellen" />
				<Picker.Item label = "Maria" value = "maria" />
			</Picker>
			<Text style = {styles.text}>{this.state.school}</Text>


			<Button style={{alignSelf: 'center',width: '50%'}}    
								onPress={this.CreateReport}> 
					<Text style={{width: '100%',fontWeight: "800",textAlign: "center"}}>
						Ok
					</Text>
				</Button>

			</View>




		)
	}
}


const mapStateToProps = (state) => ({
	// loginError: (state) => get(state, 'auth.loginError')
})

const mapDispatchToProps = (dispatch) => ({
	// createReport: (payload) => new Promise((resolve, reject) =>
		// dispatch(Actions.createReportRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManualSchoolSelect)





	
	const styles = StyleSheet.create({
		text: {
			 fontSize: 30,
			 alignSelf: 'center',
			 color: 'red'
		}
 })

