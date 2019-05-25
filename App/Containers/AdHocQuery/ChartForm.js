import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Item } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'

class ChartForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  static navigationOptions = {
    header: null,
  }


  componentDidMount = () => {

  }
  render() {


    return (
    <View></View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartForm)
