import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        alignItems: "center",
    },
    titleText: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 30,
        marginTop: 20,
        fontFamily: "Roboto",
    },
    inputForm: {
        width: Dimensions.get("window").width * 0.8,
        height: 50,
        flex: 0,
        borderColor: "rgba(255,255,255,0.45)",
        borderWidth: 2,
        marginTop: Dimensions.get("window").height * 0.3,
        padding: 10,
        color: "rgba(255,255,255,0.7)",
        fontSize: 20,
        fontFamily: "Roboto",
        alignSelf: "center",
    },
    button: {
        height: 40,
        width: 160,
        borderRadius: 10,
        marginLeft: Dimensions.get("window").width * 0.5 - 80,
        marginRight: Dimensions.get("window").width * 0.5 - 80,
        marginTop: 20,
    },
});
