import React, { Component } from 'react'
import { View } from 'react-native'
import { Item, Button, Text, Header, Body, Title, Left, Right } from 'native-base'
import Actions from '../../Redux/Actions'
import { connect } from 'react-redux'
import DrawLayout from '../DrawLayout'



class ManualGoogleMap extends Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    header: null,
  }

  ManualSelect = () => {
    const { navigation } = this.props
    navigation.navigate("ManualSchoolSelect")
  }

  mapsSelect = () => {
    const { navigation } = this.props
    navigation.navigate("MapScreen")
  }
  render() {
    return (
      <View>
        <DrawLayout title="Select School" image='' />
        <Text>{'\n\n\n\n\n\n\n'}</Text>
        <Button style={{ alignSelf: 'center', width: '80%' }} onPress={this.mapsSelect}>
          <Text style={{ width: '100%', fontWeight: "800", textAlign: "left" }}>
            Google Map
					</Text>
        </Button>
        <Text>{'\n'}</Text>
        <Button style={{ alignSelf: 'center', width: '80%' }}
          onPress={this.ManualSelect}>
          <Text style={{ width: '100%', fontWeight: "800", textAlign: "left" }}>
            Manual Select
					</Text>
        </Button>
        <Text>{'\n'}</Text>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  state,
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ManualGoogleMap)

