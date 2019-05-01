import React from 'react'
import { View,StyleSheet,Image,TouchableOpacity, Text } from 'react-native'

export default ReportImage = (data) => {
    return (
        <TouchableOpacity>
                <Image 
                source={{uri: `http://edbf6c5b.ngrok.io${data.item.image.url}`}} style={{ height: 75, width:75 }} />                            
        </TouchableOpacity>
    )
}

