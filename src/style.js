import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { black, primaryColor, secondaryColor } from "./Theme/color";

export default StyleSheet.create({
    landingContainer: {
        flex: 1,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    brandHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    brandLogo: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },

    brandTitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: secondaryColor,
    },

    captionHolder: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },

    captionText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 45,
        fontWeight: '700',
        fontStyle: 'normal',
        color: secondaryColor,
        marginLeft: 20,
    },

    captionImage: {
        width: '100%',
        height: 460,
        resizeMode: 'cover',
    },

    getStarted: {
        display: 'flex',
        width: '80%',
        backgroundColor: secondaryColor,
        borderRadius: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    getStartedText: {
        color: primaryColor,
        fontSize: 20,
        fontWeight: '700',
        fontStyle: 'normal',
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
        fontFamily: 'Poppins_400Regular',
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