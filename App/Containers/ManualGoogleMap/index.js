import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import { connect } from 'react-redux'
import DrawLayout from '../DrawLayout'

class ManualGoogleMap extends Component {
  constructor(props) {
    super(props)
    // console.log("This.props ::::: you : ",this.props)

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
        <DrawLayout title="Select School"
          leftimage=''
          rightimage=''
          componentNavigation={this.props.navigation}
        />
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
})
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(ManualGoogleMap)

