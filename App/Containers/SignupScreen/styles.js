import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // justifyContent: 'space-around'
  },
  appTitleView: {
     flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleName: {
    fontSize: 40,
    fontFamily: Fonts.type.sourcesanspro,
    color: '#0d6d93',
  },
  inputBlock: {
     flex: 0.5,
    justifyContent: 'flex-end',
    paddingLeft: 40,
    paddingRight:40,
    paddingBottom: 20,
  },
  bottomView:{

    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '80%'
  },

  textStyle:{
    width: '100%',
    fontWeight: "800",
    textAlign: "center"
  }
})

