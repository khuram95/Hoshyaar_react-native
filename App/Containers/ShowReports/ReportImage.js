import React from 'react'
import { View,StyleSheet,Image,TouchableOpacity, Text } from 'react-native'

export default ReportImage = (data) => {
    console.log('lore kha, ', data.item.image.url)
    return (
        <TouchableOpacity>
                <Image 
                source={{uri: `http://b150f51e.ngrok.io${data.item.image.url}`}} style={{ height: 75, width:75 }} />                            
        </TouchableOpacity>
    )
}

