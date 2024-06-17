import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Logo from "../components/logo";
import { useNavigation } from "@react-navigation/native";
import UserGreeting from "../components/userGreeting";
import theme from "../theme";
import Nav from "../components/nav";
import { IPADRESS, prod, render, COMOP_API_KEY } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "../components/arrowBack";
import * as ImagePicker from "expo-image-picker";
import LoadingScreen from "./loadingScreen";
import {
  CLOUDINARY_URL,
  CLOUDINARY_PRESET,
  CLOUDINARY_CLOUD_NAME,
} from "../config";

const ChallengesProof = ({ route }) => {
  const { challenge } = route.params;
  const [challenges, setChallenges] = useState([]);
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const requiredImages = challenge.requiredImages;
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadIndex, setUploadIndex] = useState(0);
  // console.log("upload index", uploadIndex);
  const [skipped, setSkipped] = useState(false);
  const [loading, setLoading] = useState(false);


  //const url = CLOUDINARY_URL;
  const preset = CLOUDINARY_PRESET;
  const cloudName = CLOUDINARY_CLOUD_NAME;

  const handleNextButtonPress = async () => {
    if (uploadIndex === requiredImages) {
      // post the images to the newsfeed in the database
      let url = `${render}/api/v1/gymfeed`;

      console.log("Posting newsfeed:", url);
  
      try {
        // Start het uploaden, toon het loading screen
        setLoading(true);
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'comop-api-key': COMOP_API_KEY,
          },
          body: JSON.stringify({
            userId: userData._id,
            challengeId: challenge._id,
            requiredImages: requiredImages,
            uploadedImages: imageUrls,
            skipped: false,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        console.log('Newsfeed posted:', result);
        navigation.navigate("challengesFinish", { challenge }); // Navigate when all images are uploaded
      } catch (error) {
        console.error('Error posting newsfeed:', error);
      } finally {
        // Stop het uploaden, verberg het loading screen
        setLoading(false);
      }
    } else {
      try {
        // Start het uploaden, toon het loading screen
        setLoading(true);
  
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
  
        if (!result.cancelled && result.assets && result.assets.length > 0) {
          const uploadedUrl = await uploadImage(result.assets[0].uri);
          if (uploadedUrl) {
            // Toon de afbeelding
            const tempImage = {
              uri: uploadedUrl,
            };
  
            // Controleer of de afbeelding volledig is geladen
            Image.getSize(tempImage.uri, (width, height) => {
              // Voeg de URL toe aan de lijst met imageUrls
              setImageUrls([...imageUrls, uploadedUrl]);
              console.log("Image uploaded:", uploadedUrl);
              setUploadIndex(uploadIndex + 1); // Ga naar de volgende upload index
  
              // Stop het uploaden, verberg het loading screen
              setLoading(false);
            }, (error) => {
              console.error("Failed to get image size:", error);
              setLoading(false); // Verberg het loading screen bij een fout
            });
          } else {
            const error = new Error("Failed to upload image");
            Alert.alert(`Error uploading image: ${error.message}`);
            setLoading(false); // Verberg het loading screen bij een fout
          }
        } else {
          setLoading(false); // Verberg het loading screen als het resultaat is geannuleerd
        }
      } catch (error) {
        Alert.alert(`Error selecting image: ${error.message}`);
        setLoading(false); // Verberg het loading screen bij een fout
      }
    }
  };
  
  
  
  


  const deactivateChallenge = async () => {
    let url = `${render}/api/v1/challenges/active/${challenge._id}`;
    console.log("Deactivating challenge:", url);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'comop-api-key': COMOP_API_KEY,
        },
        body: JSON.stringify({ active: false }),
      });

      if (response.ok) {
        console.log("Challenge deactivated successfully");
      } else {
        const errorData = await response.json();
        console.log("Error deactivating challenge:", errorData.message);
      }
    } catch (error) {
      console.log("Error deactivating challenge:", error);
    }
  };

  const handleSkipButtonPress = async () => {
    // post the skipped challenge to the newsfeed in the database
    let url = `${render}/api/v1/gymfeed`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'comop-api-key': COMOP_API_KEY,
        },
        body: JSON.stringify({
          userId: userData._id,
          challengeId: challenge._id,
          requiredImages: requiredImages,
          uploadedImages: [], // No images uploaded
          skipped: true, // Mark as skipped
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Newsfeed posted:', result);
      await deactivateChallenge();
      navigation.navigate("fitpass"); // Navigate when the challenge is skipped
    } catch (error) {
      console.error('Error posting newsfeed:', error);
    }
  };




  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value !== null) {
          const user = JSON.parse(value);
          console.log("User data retrieved:", user);
          setUserData(user);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    retrieveUserData();
  }, []);

  const uploadImage = async (imageUri) => {
    let formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", preset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          headers: {
            'comop-api-key': COMOP_API_KEY,
          },
          body: formData,
        }
      );

      const imgData = await response.json();
      console.log("Image data:", imgData);

      if (response.ok) {
        return imgData.secure_url;
      } else {
        throw new Error(`Failed to upload image: ${imgData.error.message}`);
      }
    } catch (error) {
      Alert.alert(`Error uploading image: ${error.message}`);
      return null;
    }
  };

  const renderSteps = () => {
    switch (requiredImages) {
      case 1:
        return (
          <View style={styles.stepsBox}>
            <View style={styles.circleOne}>
              <Text style={styles.circleOneText}>1</Text>
            </View>
            <View style={styles.lineOne}></View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepsBox}>
            <View style={styles.circleOne}>
              <Text style={styles.circleOneText}>1</Text>
            </View>
            <View style={styles.lineOne}></View>
            <View style={styles.circleTwo}>
              <Text style={styles.circleTwoText}>2</Text>
            </View>
            <View style={styles.lineTwo}></View>
            <View
              style={[
                styles.lineThree,
                requiredImages === 2 && styles.lineThreeTopAdjusted,
              ]}
            ></View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepsBox}>
            <View style={styles.circleOne}>
              <Text style={styles.circleOneText}>1</Text>
            </View>
            <View style={styles.lineOne}></View>
            <View style={styles.circleTwo}>
              <Text style={styles.circleTwoText}>2</Text>
            </View>
            <View style={styles.lineTwo}></View>
            <View style={styles.circleThree}>
              <Text style={styles.circleThreeText}>3</Text>
            </View>
            <View style={styles.lineThree}></View>
            <View style={styles.lineFour}></View>
            <View style={styles.lineFive}></View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>

      {loading ? (
        <LoadingScreen style={styles.loading} />
      ) : (
        <>

          <Logo />
          <ArrowBack style={styles.arrowBack} />
          <View style={styles.titleBox}>
            <View style={styles.titleText}>
              <Text style={theme.textStyles.NameTitle}>{challenge.title}</Text>
              <Text style={theme.textStyles.customSubtitle}>
                Almost there {userData?.username || "User"}!
              </Text>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.imgBox}>
              <Image source={require("../assets/images/stepsMiddle.png")} style={styles.challengeImg}></Image>
            </View>

            {renderSteps()}

            <View style={[styles.boxTexts, { top: uploadIndex > 0 ? "53%" : "60%" }, requiredImages === 2 && { height: 120 }]}>
              <View style={styles.boxTextOne}>
                {uploadIndex > 0 ? (
                  <Image
                    source={{ uri: imageUrls[0] }}
                    style={styles.uploadedImage}
                  />
                ) : (
                  <>
                    <Text style={styles.firstPic}>
                      First, we need a picture of your:
                    </Text>
                    <Text style={styles.firstPicText}>
                      {challenge.imageDescriptions[0]}
                    </Text>
                  </>
                )}
              </View>
              {requiredImages >= 2 && (
                <View style={styles.boxTextTwo}>
                  {uploadIndex > 1 ? (
                    <Image
                      source={{ uri: imageUrls[1] }}
                      style={styles.uploadedImage}
                    />
                  ) : (
                    <>
                      <Text style={styles.secondPic}>
                        Second, we need a picture of your:
                      </Text>
                      <Text style={styles.secondPicText}>
                        {challenge.imageDescriptions[1]}
                      </Text>
                    </>
                  )}
                </View>
              )}
              {requiredImages === 3 && (
                <View style={styles.boxTextTree}>
                  {uploadIndex > 2 ? (
                    <Image
                      source={{ uri: imageUrls[2] }}
                      style={styles.uploadedImage}
                    />
                  ) : (
                    <>
                      <Text style={styles.thirdPic}>
                        And lastly, we need a picture of your:
                      </Text>
                      <Text style={styles.thirdPicText}>
                        {challenge.imageDescriptions[2]}
                      </Text>
                    </>
                  )}
                </View>
              )}
            </View>

            <View style={styles.boxDescription}></View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextButtonPress}
            >
              <Text style={styles.nextText}>
                {uploadIndex < requiredImages
                  ? `Upload image of ${challenge.imageDescriptions[uploadIndex]}`
                  : "Finish challenge"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkipButtonPress}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <Nav />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  innerContainer: {
    paddingTop: 130,
    width: 350,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.offwhite,
  },




  stepsBox: {
    // place this view in the middle of the screen
    position: "absolute",
    top: "59%",
    left: 0,
  },

  circleOne: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#80F075",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  circleOneText: {
    color: "#1C1B1B",
    ...theme.textStyles.customTitle,
    fontSize: 14,
  },

  // line in the middle and to the right of circle 1
  lineOne: {
    width: 22,
    height: 5,
    backgroundColor: "#80F075",
    position: "relative",
    top: -16,
    left: 14,
    borderRadius: 20,
  },

  // line in the middle and bottom of circle 1
  lineTwo: {
    width: 5,
    height: 56,
    backgroundColor: "#80F075",
    position: "relative",
    top: -36,
    left: 12,
    borderRadius: 20,
  },

  // circle 2 at the bottom of line 2
  circleTwo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#80F075",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 40,
    left: 0,
    zIndex: 1,
  },

  circleTwoText: {
    color: "#1C1B1B",
    ...theme.textStyles.customTitle,
    fontSize: 14,
  },

  // line in the middle and to the right of circle 2
  lineThree: {
    width: 22,
    height: 5,
    backgroundColor: "#80F075",
    position: "relative",
    top: -62,
    left: 14,
    borderRadius: 20,
  },

  lineThreeTopAdjusted: {
    top: -32,
  },

  // line in the middle and bottom of circle 2
  lineFour: {
    width: 5,
    height: 56,
    backgroundColor: "#80F075",
    position: "relative",
    top: -56,
    left: 12,
    borderRadius: 20,
  },

  // circle 3 at the bottom of line 3
  circleThree: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#80F075",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 28,
    left: 0,
    zIndex: 1,
  },

  circleThreeText: {
    color: "#1C1B1B",
    ...theme.textStyles.customTitle,
    fontSize: 14,
  },

  // line in the middle and to the right of circle 3
  lineFive: {
    width: 22,
    height: 5,
    backgroundColor: "#80F075",
    position: "relative",
    top: -50,
    left: 14,
    borderRadius: 20,
  },

  boxTexts: {
    // display: 'flex',
    // justifyContent: 'space-between',
    justifyContent: "space-between",
    position: "absolute",
    alignItems: "center",
    // height: requiredImages === 2 ? 100 : 184,
    height: 184,
    top: "60%",
  },

  boxTextOne: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  boxTextTwo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  boxTextTree: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  firstPic: {
    ...theme.textStyles.customTitle,
    fontSize: 17,
    color: "#1C1B1B",
    marginBottom: 4,
  },

  firstPicText: {
    ...theme.textStyles.customText,
    fontSize: 20,
    color: "#1C1B1B",
    marginBottom: 4,
  },

  secondPic: {
    ...theme.textStyles.customTitle,
    fontSize: 17,
    color: "#1C1B1B",
    marginBottom: 4,
  },

  secondPicText: {
    ...theme.textStyles.customText,
    fontSize: 20,
    color: "#1C1B1B",
    marginBottom: 4,
  },

  thirdPic: {
    ...theme.textStyles.customTitle,
    fontSize: 17,
    color: "#1C1B1B",
    marginBottom: 4,
  },

  thirdPicText: {
    ...theme.textStyles.customText,
    fontSize: 20,
    color: "#1C1B1B",
    marginBottom: 4,
  },

  cancelButton: {
    // position: 'absolute',
    // top: 0, // Adjust this value according to your layout
    // right: 0, // Adjust this value according to your layout
    // zIndex: 1,
    position: "relative",
    top: 100,
    left: 144,
    zIndex: 1,
  },
  cancelButtonText: {
    ...theme.textStyles.customTitle,
    fontSize: 16,
    color: "#1C1B1B",
  },
  challengeImg: {
    width: 200,
    height: 100,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    resizeMode: "contain",
  },

  arrowBack: {
    top: 80,
    left: 20,
  },

  imgBox: {
    marginTop: 20,
    width: 200,
    height: 100,
  },

  boxDescription: {
    display: "flex",
    justifyContent: "top",
    alignItems: "center",
    height: 200,
  },

  challengeDescription: {
    width: 350,
    ...theme.textStyles.customText,
    fontSize: 16,
    color: "#1C1B1B",
    textAlign: "center",
    marginBottom: 10,
  },

  titleBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    position: "relative",
    top: 130,
    left: 20,
    width: 380,
  },

  titleText: {},

  completed: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  nextButton: {
    width: "auto",
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: "#1C1B1B",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  nextText: {
    color: "#F2F2F2",
    ...theme.textStyles.customSubtitle,
    fontSize: 16,
  },

  skipText: {
    color: "#1C1B1B",
    ...theme.textStyles.customSubtitle,
    fontSize: 16,
    marginTop: 20,
  },

  uploadedImage: {
    width: 100,
    height: 70,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ChallengesProof;
