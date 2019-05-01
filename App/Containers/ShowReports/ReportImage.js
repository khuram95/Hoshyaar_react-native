import React from 'react'
import { View,StyleSheet,Image,TouchableOpacity, Text } from 'react-native'

export default ReportImage = (data) => {
    console.log('lore kha, ', data.item.image.url)
    return (
        <TouchableOpacity>
                <Image 
                source={{uri: `http://01af71b3.ngrok.io${data.item.image.url}`}} style={{ height: 75, width:75 }} />                            
        </TouchableOpacity>
    )
}

