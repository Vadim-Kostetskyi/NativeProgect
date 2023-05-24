import { View, Text, Image, ScrollView } from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Post from "../components/post";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";

const PostsScreen = () => {
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);

  const { email, nickname, userId } = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      const updatedPosts = await querySnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });

      setPosts(updatedPosts);
    })();
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.postContainer,
        { paddingBottom: 40, flex: 0 },
      ]}
    >
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
            {nickname}
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
            {email}
          </Text>
        </View>
      </View>
      {posts &&
        posts.map((el, index) => (
          <Post
            key={el.id}
            id={el.id}
            photoUri={el.data.photo}
            title={el.data.title}
            locationText={el.data.locationText}
            recordLocation={el.data.location}
            commentsNumber={el.data.commentsNumber}
          />
        ))}
    </ScrollView>
  );
};
export default PostsScreen;
