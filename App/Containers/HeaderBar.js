import React from 'react'
import { View} from 'react-native'
import { Item as FormItem, Text, Button, Input,Header,Body,Title,Left,Right } from 'native-base'


export default HeaderBar = (left, title, right) => {
    return (
        <Header>
          <Left>
            </Left>
            
          <Body>
            <Title>{title}</Title>
          </Body>

          <Right>
            </Right>
        </Header>
    )
}