import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import theme from "../theme";

const Nav = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeName = route.name;

    return (
        <View style={styles.nav}>
            <TouchableOpacity onPress={() => navigation.navigate("newsfeed")}>
                <Image
                    style={[styles.icon, routeName === "newsfeed" && styles.selectedIcon]}
                    source={routeName === "newsfeed" ? require("../assets/images/NewsfeedWhite.png") : require("../assets/images/NewsfeedDark.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("challenges")}>
                <Image
                    style={[styles.icon, routeName === "challenges" && styles.selectedIcon]}
                    source={routeName === "challenges" ? require("../assets/images/ChallengesWhite.png") : require("../assets/images/ChallengesDark.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("fitpass")}>
                <Image
                    style={[styles.icon, routeName === "fitpass" && styles.selectedIcon]}
                    source={routeName === "fitpass" ? require("../assets/images/FitpassWhite.png") : require("../assets/images/FitpassDark.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Image
                    style={[styles.icon, routeName === "profile" && styles.selectedIcon]}
                    source={routeName === "profile" ? require("../assets/images/ProfileWhite.png") : require("../assets/images/ProfileDark.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.offblack,
        position: "absolute",
        bottom: 20,
        zIndex: 50,
    },
    icon: {
        width: 75,
        height: 52,
        resizeMode: "contain",
    },
});

export default Nav;
