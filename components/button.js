import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ onPress, title, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#1C1B1B",
        borderRadius: 24,
        width: 242,
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#F2F2F2",
        fontSize: 16,
    },
});

export default CustomButton;
