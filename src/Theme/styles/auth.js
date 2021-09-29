import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { black, grey, inputBg, lightSecondary, primaryColor, red, secondaryColor, white } from "../color";
import { bold, h2, h3, h4, h5, p, regular, thin } from '../fonts';

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
        marginBottom: 40,
    },

    brandHolderLanding: {
        display: 'flex',
        height: 100,
        marginBottom: 100,
        marginTop: 80,
    },

    brandLogo: {
        width: 100,
        height: 100,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginFormHolder: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
    },

    loginInput: {
        width: '100%',
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        backgroundColor: inputBg,
        borderRadius: 8,
        color: black,
        padding: 10,
        paddingLeft: 20,
    },

    noBorder: {
        borderBottomWidth: 0,
        borderColor: inputBg,
        backgroundColor: inputBg,
        borderRadius: 8,
    },

    big40MarginTop: {
        marginTop: 40,
    },

    authLeftSideItem: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 10,
    },

    authLeftSideText: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        color: primaryColor,
    },

    authButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        padding: 10,
        width: '100%',
        borderRadius: 8,
    },

    authButtonText: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        color: white,
    },

    rowViewTextWithMargin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },

    rowViewText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    smallBlackText: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        color: black,
    },

    smallColorText: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        color: primaryColor,
    },

    normalContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },

    topHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 47,
        paddingLeft: 20,
        paddingRight: 20,
    },

    topHeaderText: {
        fontFamily: regular,
        fontSize: h3,
        fontStyle: 'normal',
        fontWeight: '500',
    },

    nextFormHolder: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        marginTop: 167,
    },

    bigColorText: {
        fontFamily: regular,
        fontSize: h4,
        fontStyle: 'normal',
        fontWeight: '500',
        color: primaryColor,
    },

    spanText: {
        fontFamily: regular,
        fontSize: p,
        fontStyle: 'normal',
        fontWeight: '400',
        color: black,
    },

    singleInput: {
        width: 40,
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        backgroundColor: inputBg,
        borderRadius: 8,
        color: black,
        padding: 10,
        paddingLeft: 20,
    },

    noBorderSingle: {
        width: 40,
        borderBottomWidth: 0,
        borderColor: inputBg,
        backgroundColor: inputBg,
        borderRadius: 8,
    },

    singleInputCont: {
        width: 40,
    },

    nextCenterFormHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 34,
    },

    singleInputHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    errorText: {
        fontFamily: regular,
        fontSize: p,
        fontStyle: 'normal',
        fontWeight: '400',
        color: red,
    },

    loadingText: {
        fontFamily: regular,
        fontSize: h3,
        fontStyle: 'normal',
        fontWeight: '400',
        color: primaryColor,
    },

    loadingIcon: {
        color: primaryColor
    },

});