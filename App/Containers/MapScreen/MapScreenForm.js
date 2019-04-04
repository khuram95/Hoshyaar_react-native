import React, { Component } from 'react'
import { View} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import styles from './styles'


class MapScreenForm extends Component{
  constructor(props) {
    super(props);
  
  }	

  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }
  

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  // onMapPress(e) {
  //   let region = {
  //     latitude:       e.nativeEvent.coordinate.latitude,
  //     longitude:      e.nativeEvent.coordinate.longitude,
  //     latitudeDelta:  0.00922*1.5,
  //     longitudeDelta: 0.00421*1.5
  //   }
  //   this.onRegionChange(region, region.latitude, region.longitude);
  // }
  
  render(){
    return(
    // <View style={styles.container}>
    //     <MapView
    //         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //         style={styles.map}
    //         region={{
    //         latitude: 37.78825,
    //         longitude: -122.4324,
    //         latitudeDelta: 0.015,
    //         longitudeDelta: 0.0121,
    //       }}
    //     >
    //     </MapView>
    //   </View>
      <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={this.state.mapRegion}
            // onRegionChange={this.onRegionChange.bind(this)}
            // showsMyLocationButton={true}
            showsUserLocation={true}
        >
        </MapView>
      </View>
    )
  }
}


  
  export default MapScreenForm

