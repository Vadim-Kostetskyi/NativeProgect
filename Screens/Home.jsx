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
import { Feather, AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  authSignOutUser,
  userProfileUpdate,
} from "../redux/auth/authOperations";
import { useState, useEffect } from "react";
import Post from "../components/post";
import { db, storage } from "../config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { nickname, userId, photoURL } = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "posts"), where("userId", "==", userId));

      onSnapshot(
        q,
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

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access storage is required!");
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!imagePickerResult.canceled) {
      const imageUri = imagePickerResult.assets[0].uri;
      const response = await fetch(imageUri);
      const file = await response.blob();

      const date = new Date();
      const storageRef = ref(storage, `images/${date}`);
      let imageUrl;
      await uploadBytes(storageRef, file);

      await getDownloadURL(ref(storage, `images/${date}`)).then((url) => {
        imageUrl = url;
      });

      dispatch(userProfileUpdate({ photoURL: imageUrl }, dispatch));
      setAvatar(imageUri);
    }
  };

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
              { justifyContent: "flex-start", paddingTop: 92, minHeight: 450 },
            ]}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 22, right: 16 }}
              onPress={logOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.photoBox}>
              {(photoURL || avatar) && (
                <Image
                  source={photoURL ? { uri: photoURL } : { uri: avatar }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              )}
              <TouchableOpacity
                style={styles.photoAdd}
                onPress={handleImagePicker}
              >
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                  style={photoURL && styles.rotate45}
                />
              </TouchableOpacity>
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default HomeScreen;
