import { View, Text, Image, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Post from "../components/post";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config";

const PostsScreen = () => {
  const [posts, setPosts] = useState(null);

  const { email, nickname, userId, photoURL } = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      onSnapshot(
        collection(db, "posts"),
        (snapshot) => {
          let posts = [];
          snapshot.docs.forEach((doc) => {
            posts.unshift({
              id: doc.id,
              data: doc.data(),
              createTime: doc._document.createTime.timestamp.seconds,
            });
          });
          if (posts.length !== 0) {
            posts.sort((a, b) => a.createTime.seconds - b.createTime.seconds);
            const newArray = posts.slice(1).concat(posts[0]);
            setPosts(newArray);
          }
        },
        (error) => {
          throw error;
        }
      );
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
          source={
            photoURL ? { uri: photoURL } : require("../assets/images/photo.png")
          }
          style={{ width: 60, height: 60, marginRight: 8, borderRadius: 16 }}
        />
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text style={styles.postNickname}>{nickname}</Text>
          <Text style={styles.postEmail}>{email}</Text>
        </View>
      </View>
      {posts &&
        posts.length > 0 &&
        posts.map((el, index) => (
          <Post
            key={el.id}
            id={el.id}
            userPhoto={photoURL}
            photoUri={el.data.photo}
            title={el.data.title}
            locationText={el.data.locationText}
            recordLocation={el.data.location}
            commentsNumber={el.data.commentsNumber}
            likeNumber={el.data.likeNumber}
            userId={userId}
            nickname={nickname}
          />
        ))}
    </ScrollView>
  );
};
export default PostsScreen;
