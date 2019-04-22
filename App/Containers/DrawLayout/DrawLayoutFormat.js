import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { Images } from '../../Themes'

export default DrawLayoutFormat = (data, navigation) => {
  return (
    <TouchableOpacity style={styles.footerIcons} onPress={() => navigation.navigate(data.navigateTo)}>
      <View style={styles.textImage}>
        <Image source={Images[data.image]} style={styles.image} />
        <Text style={styles.badgeCount}>
          {data.text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  badgeCount: {
    fontSize: 15,
    paddingTop: '10%',
  },
  footerIcons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
  textImage: {
    justifyContent: 'space-evenly',
    flexDirection: "row",
    alignItems: 'center',
  },
});