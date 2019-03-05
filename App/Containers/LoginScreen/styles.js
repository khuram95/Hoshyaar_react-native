import { StyleSheet } from 'react-native'
// import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes'

// export default StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     // justifyContent: 'space-around'
//   },
//   appTitleView: {
//     flex: 0.4,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginBottom: 20
//   },
//   appTitleName: {
//     fontSize: 40,
//     fontFamily: Fonts.type.sourcesanspro,
//     color: '#0d6d93',
//   },
//   inputBlock: {
//     flex: 0.3,
//     justifyContent: 'flex-end',
//     paddingLeft: 40,
//     paddingRight:40,
//     paddingBottom: 20,
//   }
// })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
