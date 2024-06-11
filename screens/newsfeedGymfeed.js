import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Nav from "../components/nav";
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import theme from "../theme";
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';

const NewsfeedGymfeed = () => {
  const navigation = useNavigation();

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationY > 50) { // Adjust the threshold as needed
      navigation.navigate('newsfeed');
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.greetingContainer}>
          <UserGreeting />
          <Text style={theme.textStyles.customSubtitle}>What happened in your gym today?</Text>
        </View>
        <View style={styles.feedContainer}>
        <Text style={styles.contentGymfeed}>Tap or swipe down to close</Text>
          <TouchableOpacity 
            style={styles.navigationRect} 
            onPress={() => navigation.navigate('newsfeed')}
          />
          <View style= {styles.gymfeedContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.contentGymfeed}>placeholder voor gymfeed messages</Text>
            </ScrollView>
          </View>
        </View>
        <Nav />
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  greetingContainer: {
    marginTop: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  feedContainer: {
    width: "100%",
    height: "80%",
    backgroundColor: "#343434",
    color: "#F2F2F2",
    borderRadius: 15,
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navigationRect: {
    backgroundColor: "#F2F2F2",
    width: "80%",
    height: 10,
    borderRadius: 50,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentGymfeed: {
    color: "#F2F2F2",
 },

 gymfeedContainer: {
  width: "100%",
  height: "70%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: 10,
  marginTop: 20,
},

});

export default NewsfeedGymfeed;
