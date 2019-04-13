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
        <Header>
          {/* <Left>
            <Button>
                <Text>Notification</Text>
              </Button>
            </Left> */}
          <Body>
            <Title>Reports</Title>
          </Body>
          <Right>
            <View style={styles.footerIcons}>
              <Button transparent dark>
                <Text style={{ fontSize: 14, color: "white" }}>Interest</Text>
                <Image source={Images.add} style={{ width: 15, height: 15, }} />
              </Button>
            </View>

          </Right>
        </Header>
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
