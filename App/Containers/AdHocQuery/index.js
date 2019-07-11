import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Item } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../../Redux/Actions'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import Chart from './Chart'
import ChartForm from './ChartForm'
import DrawLayout from '../DrawLayout'


class AdHocQuery extends Component {
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
      <View>
        <DrawLayout title="Comparison Data"
          leftimage='menu'
          rightimage=''
          componentNavigation={this.props.navigation}
        />
        {/* <DrawLayout title="Comparison Data" /> */}
        <ChartForm navigation={this.props.navigation} />
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AdHocQuery)
