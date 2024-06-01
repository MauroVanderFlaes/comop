import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
    return <Image source={require('../assets/images/ComopLogo.png')} style={styles.logo} />;
};

const styles = StyleSheet.create({
    logo: {
        width: 140,
        height: 32,
        position: 'absolute',
        top: 80,
    }
});

export default Logo;
