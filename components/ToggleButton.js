// ToggleButton.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme'; // Zorg ervoor dat het pad naar je thema correct is

const ToggleButton = ({ option1, option2, onOptionSelect }) => {
    const [selectedOption, setSelectedOption] = useState(option1);

    const handlePressOption1 = () => {
        setSelectedOption(option1);
        onOptionSelect(option1);
    };

    const handlePressOption2 = () => {
        setSelectedOption(option2);
        onOptionSelect(option2);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.button, selectedOption === option1 && styles.selectedButton]}>
                <TouchableOpacity
                    onPress={handlePressOption1}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            selectedOption === option1 && styles.selectedButtonText,
                        ]}
                    >
                        {option1}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.button, selectedOption === option2 && styles.selectedButton]}>
                <TouchableOpacity
                    onPress={handlePressOption2}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            selectedOption === option2 && styles.selectedButtonText,
                        ]}
                    >
                        {option2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: theme.colors.offblack,
        height: 50,
        borderWidth: 4,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: theme.colors.offwhite,
        borderRadius: 50,
        overflow: 'hidden',
    },
    buttonText: {
        color: theme.colors.offwhite,
        ...theme.textStyles.customText,
    },
    selectedButtonText: {
        color: theme.colors.offblack,
    },
});

export default ToggleButton;
