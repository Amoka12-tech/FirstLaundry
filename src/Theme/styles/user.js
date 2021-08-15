import { Dimensions, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { black, grey, inputBg, lightSecondary, offWhite, primaryColor, red, secondaryColor, white } from "../color";
import { bold, h2, h3, h4, h5, medium, p, regular } from "../fonts";

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
        width: '84%',
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
        fontSize: h5,
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

    itemMainHolder: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
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
        flexDirection: 'column',
        alignItems: 'center',
    },

    itemRightDetails: {
        display: 'flex',
        width: '100%',
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

    itemDetails: {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
        padding: 5,
        backgroundColor: white,
    },

    itemOrderDetails: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    //Custom bottom sheet style
    bottomSheet: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: ScreenWidth,
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

    //Order page styles end here

    confirmPageMain: {
        flex: 1,
    },

    confirmPageHolder: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        paddingBottom: 80,
    },

    confirmPageComponent: {
        display: 'flex',
        width: '100%',
        padding: 5,
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: white,
        marginBottom: 10,
    },

    confirmPageHeaderText: {
        fontFamily: medium,
        fontSize: h4,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: secondaryColor,
    },

    confirmPagePriceRow: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    confirmPagePriceRowBorder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: grey,
    },

    confirmPriceHeader: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        fontStyle: 'normal',
        color: secondaryColor,
    },

    confirmPriceText: {
        fontFamily: medium,
        fontSize: h4,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: secondaryColor,
    },

    confirmPriceText_T: {
        fontFamily: medium,
        fontSize: h3,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: primaryColor,
    },

    scheduleHolder: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: grey,
        borderRadius: 5,
        marginTop: 10,
    },

    pickupDateHolder: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        borderRightWidth: 0.5,
        borderRightColor: grey,
        padding: 10,
        alignItems: 'center',
    },

    deliveryDateHolder: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        borderLeftWidth: 0.5,
        borderLeftColor: grey,
        padding: 10,
        alignItems: 'center',
    },

    scheduleTitleHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        top: -10,
    },

    scheduleTitle: {
        display: 'flex',
        width: '50%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scheduleTitleText: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '400',
        fontStyle: 'normal',
        color: grey,
        backgroundColor: white,
    },

    scheduleDateTimeHolder: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },

    paymentScheduleHolder: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: grey,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    schedulePaymentHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    schedulePaymentText: {
        fontFamily: medium,
        fontSize: h4,
        fontStyle: 'normal',
        fontWeight: '600',
        color: secondaryColor,
        marginLeft: -10,
    },

    //Address Style

    addressBox: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: grey,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },

    addressDetails: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 88,
        width: '85%',
        marginLeft: 10
    },

    addressDivider: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 1,
        backgroundColor: grey,
        marginTop: 5,
        marginBottom: 5,
    },

    addressIcon: {
        resizeMode: 'contain',
        width: 24,
        height: 88,
    },

    calenderClose: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },

    //Location Modal

    locationModal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: white,
    },

    locationTopNav: {
        display: 'flex',
        width: '100%',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    locationInputHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
    },

    locationInputIcon: {
        width: 24,
        height: 67,
    },

    locationInputFormHolder: {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
    },

    locationInputContainer: {
        flex: 0.5,
        marginBottom: 30,
        backgroundColor: red,
    },

    locationInput: {
        fontSize: h4,
    },

    loadingText: {
        fontFamily: regular,
        fontSize: h3,
        fontStyle: 'normal',
        fontWeight: '400',
        color: primaryColor,
    },

    mapViewStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    currentLocation: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },

    sameAsPickupIcon: {
        display: 'flex',
        alignSelf: 'flex-end',
    },

    //Payment Page Styles
    payment_main: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },

    //Order Details Style
    mainContainerPadding: {
        flex: 1,
        padding: 20,
        width: '100%',
        backgroundColor: white,
    },

    orderDetailsHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },

    orderDetailsWelcome: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    orderDetailsThanks: {
        fontFamily: regular,
        fontSize: h3,
        fontWeight: '500',
        color: secondaryColor,
        fontStyle: 'normal',
    },

    orderDetailsSlogan: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        color: black,
        fontStyle: 'normal',
    },

    orderDetailsImg: {
        width: 225,
        height: 161,
    },

    orderDetailsTimeHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },

    orderIdHolder: {
        display: 'flex',
        flexDirection: 'row',
    },

    orderTypeView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: 10,
    },

    orderTypeHeaderHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    orderTypeHeader: {
        fontFamily: medium,
        fontSize: h3,
        fontWeight: '600',
        color: secondaryColor,
    },

    orderTypeItemHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    orderTypeItem: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        color: black,
    },

    orderTypePrice: {
        fontFamily: regular,
        fontSize: h4,
        fontWeight: '400',
        color: primaryColor,
    },

    orderDetailsBoxHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
    },

    orderDetailsBoxLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    orderDetailsBoxRight: {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
        marginLeft: 5,
    },

    orderBoxRightTop: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    orderBoxRightTopTextL: {
        fontFamily: medium,
        fontSize: h3,
        fontWeight: '600',
        fontStyle: 'normal',
        color: secondaryColor,
    },

    orderBoxRightTopTextR: {
        fontFamily: regular,
        fontSize: h5,
        fontWeight: '300',
        fontStyle: 'normal',
        color: primaryColor,
    },

    boldText: {
        fontFamily: medium,
        fontSize: h4,
        fontStyle: 'normal',
        fontWeight: '600',
        color: black,
    },

    regularText: {
        fontFamily: regular,
        fontSize: h5,
        fontStyle: 'normal',
        fontWeight: '500',
        color: grey,
    },

});