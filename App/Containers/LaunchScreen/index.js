import React, { Component } from 'react'
import { View } from 'react-native'

import { Button, Text, Container, Content, Radio, Right, ListItem } from 'native-base'
import { Colors, Images } from '../../Themes'
import styles from './styles'

const Separator = (
  <View style={{ marginTop: 3, marginBottom: 3 }}></View>
)

export default class LaunchScreen extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={{ backgroundColor: "#fff", padding: 20 }}>
          <Button primary style={styles.buttonGreen}>
            <Text style={styles.buttonText}> LOGIN </Text>
          </Button>
          {Separator}

          <Button primary style={styles.buttonOrange}>
            <Text style={styles.buttonText}> LOGIN </Text>
          </Button>
          {Separator}

          <Button primary style={styles.buttonGrey}>
            <Text style={styles.buttonText}> LOGIN </Text>
          </Button>
          {Separator}

          <Button primary style={styles.buttonWhite}>
            <Text style={{ width: '100%', color: Colors.buttonGreen, textAlign: 'center', fontWeight: "800" }}> LOGIN </Text>
          </Button>
          {Separator}


          {Separator}

          <Button light style={{ width: 280, height: 46, opacity: 0.6 }}>
            <Text style={{ width: '100%' }}> CANCEL JOB </Text>
          </Button>
          {Separator}

          <Button light style={{ width: 280, height: 46 }}>
            <Text style={{ width: '100%' }}> CANCEL JOB </Text>
          </Button>
          {Separator}

          <Button light style={{ width: 130, height: 46 }}>
            <Text style={{ width: '100%' }}> PAUSE JOB </Text>
          </Button>
          {Separator}

          <Button primary style={{ width: 130, height: 60 }}>
            <Text style={{ width: '100%' }}> LOG IN </Text>
          </Button>
          {Separator}

          <Button bordered style={{ width: 130, height: 60 }}>
            <Text> APPLIANCE REPAIR </Text>
          </Button>
          {Separator}

          <Button transparent style={{ width: 280, height: 46 }}>
            <Text style={{ fontSize: 12 }}> ADD MORE </Text>
          </Button>
          {Separator}

          <ListItem>
            <Text>Option 1</Text>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>
          <ListItem>
            <Text>Option 2</Text>
            <Radio selected={false} />
          </ListItem>
          {Separator}

          <Button primary
            style={{ width: 280, height: 46 }}
            onPress={() => { this.goToLoginScreen }}
          >
            <Text style={{ width: '100%' }}> GO TO LOG IN </Text>
          </Button>
          {Separator}
        </Content>
      </Container>
    )
  }
}
