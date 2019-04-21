import React, { Component } from 'react'
import {
  View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView, StyleSheet
} from 'react-native'
import { Item as FormItem, Text, Button, Input, Header, Container, Body, Title, Left, Right, Tabs, Tab } from 'native-base'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import AllReports from './AllReports'
import MyInterest from './MyInterest'
import MyReports from './MyInterest'
import { Images, Colors } from '../../Themes/'
import DrawLayout from '../DrawLayout'


class ShowReports extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Container>
        <DrawLayout title="Reports" image='add'/>

        <Tabs>
          <Tab heading="All Reports">
            <View style={{ flex: 1 }}>
              <AllReports />
            </View>
          </Tab>
          <Tab heading="My Reports">
            <View style={{ flex: 1 }}>
              <MyReports />
            </View>
          </Tab>
          <Tab heading="My Interest">
            <View style={{ flex: 1 }}>
              <MyInterest />
            </View>
          </Tab>
        </Tabs>


      </Container>

    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ShowReports)



const styles = StyleSheet.create({

  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },

});
