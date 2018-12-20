import Colors from './Colors';

const type = {
  roboto: 'Roboto',
  montserrat: 'Montserrat',
  avenir: 'Avenir',
}

const fontWeight = {
  regular: 'normal',
  semibold: '500',
  bold: 'bold',
  light: '300',
}

const style = {
  dashboardFont: {
    fontFamily: type.roboto,
  	fontSize: 28,
  	fontWeight: fontWeight.bold,
  	color: Colors.darkSlateBlue,
  },
  cta: {
  	fontSize: 14,
  	fontWeight: fontWeight.semibold,
  	textAlign: "center",
  	color: Colors.white,
  },
  label4: {
    fontFamily: type.roboto,
  	fontSize: 13,
    fontWeight: fontWeight.semibold,
  	textAlign: "center",
  	color: Colors.white,
  },
  activeMenuItem: {
    fontFamily: type.roboto,
    fontWeight: fontWeight.semibold,
    fontSize: 14,
    color: Colors.midBlue,
  },
  bodyText: {
    fontFamily: type.roboto,
    fontSize: 14,
    color: Colors.darkSlateBlue,
    lineHeight: 24,
  },
  header1: {
    fontFamily: type.roboto,
    fontSize: 14,
    color: Colors.grayFour,
  },
  header2: {
    fontFamily: type.roboto,
    fontWeight: fontWeight.light,
    fontSize: 14,
    color: Colors.grayFour,
  },
  label1: {
    fontFamily: type.roboto,
    fontSize: 12,
    color: Colors.grayFour,
    fontWeight: fontWeight.semibold,
  },
  label2: {
    fontFamily: type.roboto,
    fontWeight: fontWeight.light,
    fontSize: 12,
    color: Colors.grayFour,
  },
  label3: {
    fontFamily: type.montserrat,
    fontSize: 11,
    color: Colors.midBlue,
  },
}

export default {
  type,
  style,
  weight: fontWeight,
}
