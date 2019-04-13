import React  from 'react';
import Moment from 'react-moment';
import { View, Image, ImageBackground, KeyboardAvoidingView, Linking,
  ScrollView,TextInput,AppRegistry, SectionList, StyleSheet,Text } from 'react-native'

 
export default class MyComponent extends React.Component {
  
    render() {
      const dateToFormat = '2019-04-05T12:59-0500';
      const newdate = '2018-04-19T12:59-0500';

        return (
          <View>
            <Moment element={Text} format="YYYY/MM/DD">{dateToFormat}</Moment>
            <Moment element={Text} parse="YYYY-MM-DD HH:mm">{dateToFormat}</Moment>
            <Moment element={Text} subtract={{ dateToFormat,newdate }}>{dateToFormat}</Moment>
            <Moment element={Text} fromNow>{dateToFormat}</Moment>
            <Moment element={Text} format="YYYY/MM/DD">{dateToFormat}</Moment>
            <Moment element={Text} format="YYYY/MM/DD">{dateToFormat}</Moment>
            </View>
        );
    }
}