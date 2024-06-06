import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../theme";

const ArrowBack = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.touchable}>
            <Image source={require('../assets/icons/arrowBackIcon.png')} style={styles.ArrowStyle} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        position: "absolute",
        top: 80,
        left: 10, // Adjust this value
        zIndex: 1, // Ensure it's on top
    },
    ArrowStyle: {
        width: 28,
        height: 22,
    }
});

export default ArrowBack;

