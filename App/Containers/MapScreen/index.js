import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, isEmpty } from 'lodash'
import Actions from '../../Redux/Actions'
import MapScreenForm from './MapScreenForm'
import Geocoder from 'react-native-geocoding';
import { PermissionsAndroid } from 'react-native';


class MapScreen extends Component {
  static propTypes = {
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    Geocoder.init('AIzaSyBiydvNpL7d40Nvj8KOo3qt9gYEVmvWArM'); // use a valid API key
    this.requestCameraPermission()


  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'current location Permission',
          message:
            'allow to it.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  }
  updateTehsil = (tehsil) => {
    if (tehsil) {
      this.props.allSchoolsData({ tehsil })
        .then(() => {
        })
    }

  }

  componentDidMount = () => {
    let region = ''
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {

      region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          var addressComponent = json.results[0].address_components[0];
          json.results.map((address) => {
            if (address.address_components.length == 4) {
              this.updateTehsil(address.address_components[0].long_name.split(' ')[1])
              return
            }

          })

        })
        .catch(error => console.warn(error));

    }, (error) => console.log(error));
  }
  render() {
    const allSchoolDetails = get(this.props, 'allSchools')
    return (
      <MapScreenForm navigation={this.props.navigation} schoolsData={get(this.props, 'allSchools')} />
    )

  }
}
const mapStateToProps = createStructuredSelector({
  allSchools: (state) => get(state, 'school.allSchoolsData'),
})

const mapDispatchToProps = (dispatch) => ({
  allSchoolsData: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.allSchoolsDataRequest(payload, resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
