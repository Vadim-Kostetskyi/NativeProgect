import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";

const PostsScreen = () => {
  const { params: { recordedMail, recordedLogin } = {} } = useRoute();

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 16,
        paddingTop: 32,
        paddingBottom: 32,
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
  );
};

export default PostsScreen;
