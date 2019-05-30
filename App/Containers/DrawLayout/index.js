import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Item as FormItem, Header, Body, Title, Left, Right } from 'native-base'
import { Images, Colors } from '../../Themes'


class DrawLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    console.log("this.props is youshimistu :", this.props)

  }
  static navigationOptions = {
    header: null,
  }
  openDrawer = () => {
    this.props.componentNavigation.navigate('DrawerOpen')
  }

  navigationHandler = () => {
    const { componentNavigation } = this.props
    componentNavigation.navigate(this.props.navigateTo)
  }

  render() {

    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={this.openDrawer}>
            <Image source={Images[this.props.leftimage]} style={{ width: 25, height: 25, }} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={this.navigationHandler}>
            <Image source={Images[this.props.rightimage]} style={{ width: 30, height: 30, }} />
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }
}
export default DrawLayout