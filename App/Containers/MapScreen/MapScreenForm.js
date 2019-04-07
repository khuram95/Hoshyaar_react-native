import React, { Component } from 'react'
import { View } from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import styles from './styles'


class MapScreenForm extends Component {
  constructor(props) {
    super(props);
  }


  state = {
    markers: [
      {
        coordinate: {
          latitude: 31.5844056,
          longitude: 74.3552687,
        },
        title: "GHSS COMPRESHENSIVE GHORAY SHAH",
        description: "SHALIMAR	SECONDARY-WING	H.Sec.",
        // image: Images[0],
      },
      {
        coordinate: {
          latitude: 31.5583924,
          longitude: 74.3511501,
        },
        title: "GGHSS SHEIKH SARDAR MUHAMMAD GARHI SHAHU",
        description: "SHALIMAR	SECONDARY-WING	H.Sec.",
        // image: Images[1],
      },
      {
        coordinate: {
          latitude: 31.5420496,
          longitude: 74.3057628,
        },
        title: "GGHSS SAMANABAD",
        description: "CITY	SECONDARY-WING	H.Sec.",
        // image: Images[2],
      },
      {
        coordinate: {
          latitude: 31.4798024,
          longitude: 74.5116445,
        },
        title: "GGHSS BARKI",
        description: "CANTT	SECONDARY-WING	H.Sec.",
        // image: Images[3],
      },
    ],
    region: {
      latitude: 31.5376684,
      longitude: 74.2776854,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    mapRegion: null,
    lastLat: null,
    lastLong: null,
    school: '',
  };

  componentDidMount() {
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error) => console.log(error));
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  gotoSchoolDetail = () => {
    const { navigation } = this.props
    navigation.navigate("SchoolDetail", { id: this.state.school })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.mapRegion}
          // onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsBuildings={false}
        >

          {this.state.markers.map((marker, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
              >
                <Callout onPress={() => this.gotoSchoolDetail()}>
                </Callout>
              </MapView.Marker>
            );
          })}

        </MapView>
      </View>
    )
  }
}



export default MapScreenForm

