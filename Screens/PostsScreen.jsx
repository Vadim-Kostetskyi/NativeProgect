import { View, Text, Image } from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import Post from "../components/post";
import { styles } from "./styles";

const PostsScreen = () => {
  // const [title, setTitle] = useState(null);
  // const [locationText, setLocationText] = useState(null);
  // const [photoUri, setPhotoUri] = useState(null);
  // const [location, setLocation] = useState(null);

  const {
    params: {
      recordedMail,
      recordedLogin,
      recordTitle,
      recordLocationText,
      recordPhotoUri,
      recordLocation,
    } = {},
  } = useRoute();

  // useFocusEffect(() => {
  //   setTitle(recordTitle);
  //   setLocation(recordLocation);
  //   setPhotoUri(recordPhotoUri);
  //   setLocationText(recordLocationText);
  // });

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.postContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 32,
        }}
      >
        <Image
          source={require("../assets/images/photo.png")}
          style={{ marginRight: 8 }}
        />
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Roboto-Bold",
              fontSize: 13,
              lineHeight: 15,
              color: "#212121",
            }}
          >
            {recordedLogin || "Natali Romanova"}
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 11,
              lineHeight: 13,
              color: "#212121",
              opacity: 0.8,
            }}
          >
            {recordedMail || "email@example.com"}
          </Text>
        </View>
      </View>
      {recordPhotoUri && (
        <Post
          key={recordPhotoUri}
          photoUri={recordPhotoUri}
          title={recordTitle}
          locationText={recordLocationText}
          recordLocation={recordLocation}
        />
      )}
    </View>
  );
};
export default PostsScreen;
