import React, { Component } from 'react'
import { View} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import styles from './styles'


class MapScreenForm extends Component{
  constructor(props) {
    super(props);
  
  }	

  render(){
    return(
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    )
  }
}


  
  export default MapScreenForm

