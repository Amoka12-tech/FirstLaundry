import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { black, grey, primaryColor, secondaryColor, white } from "../color";
import { bold, h2, h3, h5, p, regular, thin } from '../fonts';

export default StyleSheet.create({
    landingContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    statusBar: {
        backgroundColor: 'transparent',
    },

    brandHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 102,
    },

    brandLogo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 0,
    },

    brandTitle: {
        fontFamily: regular,
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: primaryColor,
    },

    captionHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        marginTop: -120,
    },

    captionText: {
        fontFamily: bold,
        fontSize: 45,
        fontWeight: '700',
        fontStyle: 'normal',
        color: secondaryColor,
        marginLeft: 20,
    },

    captionImage: {
        width: 291,
        height: 289,
        resizeMode: 'cover',
    },
    captionImageLong: {
        width: 391,
        height: 289,
        resizeMode: 'cover',
    },

    captionHeading: {
        fontFamily: bold,
        fontWeight: '500',
        fontSize: h2,
        fontStyle: 'normal',
        textAlign: 'center',
    },

    captionText: {
        fontFamily: regular,
        fontSize: h5,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        color: black,
        paddingLeft: 20,
        paddingRight: 20,
    },

    dotHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },

    dot: {
        display: 'flex',
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: grey,
        marginRight: 5,
    },

    dotActive: {
        display: 'flex',
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: primaryColor,
        marginRight: 5,
    },

    footerHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        width: '100%',
    },

    footerLeft: {
        fontFamily: regular,
        fontSize: h5,
        fontStyle: 'normal',
        color: black
    },

    footerRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: primaryColor,
    },

    loginContainer: {
        flex: 1,
        width: '100%',
        height: ScreenHeight
    },

    topLoginContainer: {
        display: 'flex',
        width: '100%',
        backgroundColor: primaryColor,
        height: ScreenHeight/1.5,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
    },

    loginFormHolder: {
        position: 'absolute',
        padding: 20,
        top: ScreenHeight/6,
        width: '100%',
    },

    loginTitle: {
        fontFamily: regular,
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: secondaryColor,
    },

    loginInput: {
        borderColor: secondaryColor, 
        width: '100%',
        tintColor: secondaryColor,
    },

    floatLeft: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
    },

    bottomAuthBtnHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '25%',
    },

    authBtn_secondary: {
        display: 'flex',
        width: 120,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: black,
        borderRadius: 25,
    },

    authBtn_primary: {
        display: 'flex',
        width: 120,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        marginRight: 40,
        borderRadius: 25,
    },

    authBtnText_secondary: {
        color: black
    },

    authBtnText_primary: {
        color: secondaryColor
    },

    authBottomHolder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
    },

    authSocialHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    otherAuthOption: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
    },

});