import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { black, grey, inputBg, lightSecondary, offWhite, primaryColor, red, white } from "../color";
import { bold, h3, h4, h5, medium, p, regular } from "../fonts";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    mainHeader: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: 20,
    },

    mainPersonHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    mainPersonDetailHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    mainPersonName: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },

    mainPersonNameText: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '500',
        fontStyle: 'normal',
        color: primaryColor,
    },

    mainPersonNamePhone: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        fontStyle: 'normal',
        color: black,
    },

    //Now our service style

    servicesHolder: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 20,
    },

    serviceTitle: {
        fontFamily: regular,
        fontSize: h3,
        fontWeight: '600',
        fontStyle: 'normal',
        color: primaryColor,
    },

    serviceListHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },

    serviceListItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 84,
        elevation: 1,
        backgroundColor: white,
        borderRadius: 5,
    },

    serviceListItemText: {
        fontFamily: regular,
        fontSize: h5,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        color: black,
    },

    serviceListItemImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },

    bannerHolder: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
    },

    bannerImage: {
        resizeMode: 'cover',
        width: 374,
        height: 122,
    },

    orderTitle: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        fontStyle: 'normal',
        color: primaryColor,
    },

    //Order list style
    orderListHolder: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
    },

    orderListItem: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: white,
        elevation: 1,
        padding: 5,
    },

    orderListItemDetailsHolder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    orderText: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '600',
        fontStyle: 'normal',
        color: black,
        marginRight: 5,
    },

    orderSmallText: {
        fontFamily: regular,
        fontSize: p,
        fontWeight: '400',
        fontStyle: 'normal',
        color: grey,
    },

    orderPriceText: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        fontStyle: 'normal',
        color: red,
    },

    orderScheduleHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    orderScheduleItem: {
        display: 'flex',
        flexDirection: 'column'
    },

    orderScheduleItemTime: {
        fontFamily: bold,
        fontSize: h4,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: primaryColor,
    },

    orderScheduleItemDate: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        fontStyle: 'normal',
        color: grey,
    },

    orderScheduleItemToFro: {
        width: 60,
        height: 7,
        marginLeft: 10,
        marginRight: 10,
    },
    //Home style ends here

    //Modal Style
    mainModal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        position: 'absolute',
        top: 0,
        height: ScreenHeight,
        width: ScreenWidth,
    },

    mainModalBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: ScreenWidth/1.4,
        height: 400,
        backgroundColor: white,
        borderRadius: 5,
        padding: 10,
        borderColor: grey,
        borderWidth: 2,
    },

    mainModalCloseHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    mainModalCloseIconHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderRadius: 50,
        width: 30,
        height: 30,
    },

    mainModalCloseIcon: {
        fontSize: h3,
        color: white,
    },

    profilePicEditHolder: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    profilePicEdit: {
        resizeMode: 'contain',
    },

    profileUpdateFormHolder: {
        display: 'flex',
        width: '100%',
        padding: 5,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
    },

    standardInput: {
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

    noInputBorder: {
        borderBottomWidth: 0,
        borderColor: inputBg,
        backgroundColor: inputBg,
        borderRadius: 8,
    },

    standardButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
        padding: 10,
        width: '100%',
        borderRadius: 8,
    },

    standardButtonText: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        color: white,
    },

    //Top nav style
    topNavHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    topNavText: {
        fontFamily: medium,
        fontSize: h3,
        fontStyle: 'normal',
        fontWeight: '600',
        color: black
    },

    //Top Item Holder

    itemMainContainer: {
        flex: 1,
        padding: 20,
    },

    itemHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: white,
    },

    itemRight: {
        display: 'flex',
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },

    itemLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemLeftDetails: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },

    itemLeftDetailsAction: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemTextPrice: {
        fontFamily: regular,
        fontSize: p,
        color: red,
        fontStyle: 'normal',
        fontWeight: '400',
        marginRight: 10,
    },

    itemTextHolder: {
        fontFamily: regular,
        fontSize: h4,
        color: black,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    
    itemImage: {
        width: 38,
        height: 38,
        resizeMode: 'contain',
    },

    pickerStyle: {
        width: 120,
    },

    //Custom bottom sheet style
    bottomSheet: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: ScreenWidth,
        height: 120,
        backgroundColor: white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 1,
        borderTopColor: 'rgba(255,255,255, 0.5)',
        borderTopWidth: 5,
    },

    confirmOrderHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1,
    },

    confirmOrderTextHolder: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },

    confirmOrderTextHeader: {
        fontFamily: regular,
        fontSize: p,
        fontStyle: 'normal',
        fontWeight: '400',
        color: grey,
    },

    confirmOrderTextCount: {
        fontFamily: medium,
        fontSize: h4,
        fontStyle: 'normal',
        fontWeight: '500',
        color: black,
    },

    confirmOrderTextPrice: {
        fontFamily: medium,
        fontSize: h4,
        fontStyle: 'normal',
        fontWeight: '500',
        color: red,
    },

    confirmOrderIconCont: {
        borderRadius: 25,
        backgroundColor: lightSecondary,
        padding: 2,
        opacity: 0.5,
    },

});