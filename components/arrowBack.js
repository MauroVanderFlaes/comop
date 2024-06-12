// ArrowBack.js

import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ArrowBack = ({ style }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.touchable, style]}>
            <Image source={require('../assets/icons/arrowBackIcon.png')} style={styles.arrowStyle} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        position: "absolute",
        top: 80,
        left: 10,
        zIndex: 1,
    },
    arrowStyle: {
        width: 28,
        height: 22,
    }
});

export default ArrowBack;
