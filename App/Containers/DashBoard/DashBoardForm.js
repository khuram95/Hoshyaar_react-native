import React, { Component } from 'react'
import { View} from 'react-native'
import { Item as FormItem, Text, Button, Input } from 'native-base'
import style from './style'


class DashBoardForm extends Component{
  constructor(props) {
    super(props);
  
  }	

  CreateReport = () => {
    const { navigation } = this.props
      navigation.navigate("ManualGoogleMap")
  }

  OpenCamera = () => {
    const { navigation } = this.props
      navigation.navigate("VideoRecording")
  }

  AudioRecorder = () => {
    const { navigation } = this.props
      navigation.navigate("AudioRecorder")
  }


  render(){
    return(
      <View>
        <Text style={{textAlign: "center"}}>
					DashBoard
				</Text>	

      
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>


      
        <Button style={{alignSelf: 'center',width: '80%'}}> 
          <Text style={{width: '100%',fontWeight: "800",textAlign: "left"}}>
            All Reports
          </Text>
        </Button>

        <Text>{'\n'}</Text>

        <Button style={{alignSelf: 'center',width: '80%'}}    
                onPress={this.CreateReport}> 
          <Text style={{width: '100%',fontWeight: "800",textAlign: "left"}}>
            Create Report
          </Text>
        </Button>
        <Text>{'\n'}</Text>


        <Button style={{alignSelf: 'center',width: '80%'}}
        onPress={this.AudioRecorder}
        > 
          <Text style={{width: '100%',fontWeight: "800",textAlign: "left"}}>
            Verify School Data / AR
          </Text>
        </Button>

        <Text>{'\n'}</Text>

        <Button style={{alignSelf: 'center',width: '80%'}}> 
          <Text style={{width: '100%',fontWeight: "800",textAlign: "left"}}>
            Ad-Hoc Query
          </Text>
        </Button>
        <Text>{'\n'}</Text>

        <Button style={{alignSelf: 'center',width: '80%'}}
                        onPress={this.OpenCamera}>
          <Text style={{width: '100%',fontWeight: "800",textAlign: "left"}}>
            Record Video
          </Text>
        </Button>
        <Text>{'\n'}</Text>


          
      </View>
    )
  }
}


  
  export default DashBoardForm

