import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // justifyContent: 'space-around'
  },
  appTitleView: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20
  },
  appTitleName: {
    fontSize: 40,
    fontFamily: Fonts.type.sourcesanspro,
    color: '#0d6d93',
  },
  inputBlock: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingLeft: 40,
    paddingRight:40,
    paddingBottom: 20,
  }
})

