import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Item as FormItem, Container, Tabs, Tab } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import AllReports from './AllReports'
import MyInterest from './MyInterest'
import MyReports from './MyReports'
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
        <DrawLayout title="Reports" 
          // image='add'
          // navigateTo='AddInterest'
          // componentNavigation={this.props.navigation}
           />

        <Tabs>
          <Tab heading="All Reports">
            <View style={{ flex: 1 }}>
              <AllReports navigation={this.props.navigation} />
            </View>
          </Tab>
          <Tab heading="My Reports">
            <View style={{ flex: 1 }}>
              <MyReports navigation={this.props.navigation} />
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
