import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../theme";

const CustomButton = ({ onPress, title, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ...theme.buttonStyles,
});

export default CustomButton;
