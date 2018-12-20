import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  buttonGreen: {
    width: 280,
  	height: 46,
  	borderRadius: 5,
    borderColor: Colors.borderGreen,
  	backgroundColor: Colors.buttonGreen,
  },

  buttonOrange: {
    width: 280,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.borderOrange,
    backgroundColor: Colors.buttonOrange,
  },

  buttonGrey: {
    width: 280,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.buttonGrey,
  },

  buttonWhite: {
    width: 280,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.borderGreen,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },

  buttonText: {
    width: '100%',
  	fontWeight: "800",
  	textAlign: "center",
  },
  buttonActive: {
    flex: 1,
    height: 30,
    borderRadius: 0,
  	backgroundColor: Colors.buttonGreen,
  },
})
