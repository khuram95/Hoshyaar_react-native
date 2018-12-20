import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  inputContainer: {
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.avenir,
    backgroundColor: 'transparent',
    color: Colors.buttonGrey,
    marginBottom: 4,
  },
  inputText: {
    height: 40,
    fontSize: 18,
    fontFamily: Fonts.avenir,
    color: Colors.borderGrey,
    borderColor: Colors.buttonGrey,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 5
  },
  inputTextLarge: {
    height: 110,
    fontSize: 12,
    fontFamily: Fonts.avenir,
    color: Colors.borderGrey,
    borderColor: Colors.buttonGrey,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 5
  },
  errorSignleLine:{
    width: '100%',
    color: Colors.error,
    marginTop: 5,
    fontSize: 16,
  }
})
