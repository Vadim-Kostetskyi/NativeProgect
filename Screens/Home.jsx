import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "../components/post";
import { db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState(null);
  const { email, nickname, userId } = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "posts"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);
      const updatedPosts = await querySnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });

      setPosts(updatedPosts);
    })();
  }, []);

  const logOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={[{ paddingTop: 300 }]}>
          <View
            style={[
              styles.container,
              { justifyContent: "flex-start", paddingTop: 92 },
            ]}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 22, right: 16 }}
              onPress={logOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.photoBox}>
              <Image
                source={require("../assets/images/add.png")}
                style={styles.photoAdd}
              />
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={{ width: "100%" }}
            >
              <Text style={styles.header}>{nickname}</Text>
            </KeyboardAvoidingView>
            {posts &&
              posts.map((el) => (
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default HomeScreen;
