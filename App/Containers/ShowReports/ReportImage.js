import React from 'react'
import { View,StyleSheet,Image,TouchableOpacity, Text } from 'react-native'

export default ReportImage = (data) => {
    console.log('lore kha, ', data.item)
    return (
        <TouchableOpacity>
                <Image 
                source={{uri: 'https://c.tribune.com.pk/2016/02/1055025-schoolchildren-1456494957-675-640x480.jpg'}} style={{ height: 75, width:75 }} />                            
        </TouchableOpacity>
       // source={{ uri: 'https://c.tribune.com.pk/2016/02/1055025-schoolchildren-1456494957-675-640x480.jpg' }}
         //pic.image.url
    )
}

