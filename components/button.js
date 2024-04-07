import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#1C1B1B",
        position: "absolute",
        bottom: 132,
        borderRadius: 24,
        width: 242,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#F2F2F2",
        fontSize: 16,
    },
});

export default CustomButton;
