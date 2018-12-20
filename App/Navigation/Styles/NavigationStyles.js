import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  header: {
    height: 88,
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: Colors.white
  },
  buttonGreen: {
    width: 42,
  	height: 42,
    borderWidth: 1,
  	borderRadius: 5,
    borderStyle: "solid",
    borderColor: Colors.borderGreen,
  	backgroundColor: Colors.buttonGreen,
    shadowColor: "rgba(0, 0, 0, 0.1)",
  	shadowOffset: {
  		width: 0,
  		height: 0
  	},
  	shadowRadius: 1,
  	shadowOpacity: 1
  },
  buttonText: {
    width: '100%',
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  menuButton: {
    resizeMode: 'contain',
    width: 5,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Fonts.avenir,
    color: Colors.buttonGreen,
  },
  cancelButton: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: Fonts.avenir,
    color: Colors.buttonGreen,
  }
})
