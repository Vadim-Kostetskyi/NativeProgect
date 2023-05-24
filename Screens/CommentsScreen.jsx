import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { View, Image, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../config";
import { collection, setDoc } from "firebase/firestore";
import { doc, updateDoc, getDocs, increment } from "firebase/firestore";
import Input from "../components/Input";
import uuid from "react-native-uuid";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [post, setPost] = useState(null);
  const { userId } = useSelector((state) => state);

  const {
    params: { photoUri, id },
  } = useRoute();

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(
        collection(db, "posts", id, "commenst")
      );

      const updatedPosts = await querySnapshot.docs.map((doc) => {
        return doc.data();
      });

      setPost(updatedPosts);
    })();
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = async () => {
    const date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var monthNames = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    var outputDate =
      day +
      " " +
      monthNames[monthIndex] +
      ", " +
      year +
      " | " +
      hours +
      ":" +
      minutes;

    try {
      const uniqeId = uuid.v4();

      await setDoc(doc(db, "posts", id, "commenst", uniqeId), {
        comment,
        userId,
        date: outputDate,
      });

      const ref = doc(db, "posts", id);

      await updateDoc(ref, {
        commentsNumber: increment(1),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const props = {
    value: comment,
    onChangeText: setComment,
    placeholder: "Комментировать...",
    onFocus: handleFocus,
    onBlur: handleBlur,
    isFocused: isFocused,
    stylesFocusedInput: styles.focusedInput,
    commments: true,
    submit: handleSubmit,
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.postContainer, { paddingBottom: 100, paddingTop: 0 }]}>
      <ScrollView style={{ paddingTop: 32 }}>
        <View style={[styles.imageBox, { borderWidth: 0 }]}>
          <Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        {post &&
          post.map((el) => {
            return (
              <View
                style={{
                  padding: 16,
                  backgroundColor: " rgba(0, 0, 0, 0.03)",
                  marginBottom: 24,
                  borderRadius: 6,
                }}
              >
                <Text style={{ marginBottom: 8 }}>{el.comment}</Text>
                <Text
                  style={[
                    {
                      fontSize: 10,
                      lineHeight: 12,
                      color: "#BDBDBD",
                    },
                    { textAlign: "right" },
                  ]}
                >
                  {el.date}
                </Text>
              </View>
            );
          })}
      </ScrollView>
      <Input {...props} />
    </View>
    // </TouchableWithoutFeedback>
  );
};
export default CommentsScreen;
