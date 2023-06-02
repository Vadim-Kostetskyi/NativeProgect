import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { View, Image, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../config";
import {
  doc,
  updateDoc,
  increment,
  onSnapshot,
  collection,
  setDoc,
} from "firebase/firestore";
import Input from "../components/Input";
import uuid from "react-native-uuid";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [post, setPost] = useState(null);

  const {
    params: { photoUri, id, userPhoto, userId },
  } = useRoute();

  useEffect(() => {
    (async () => {
      onSnapshot(
        collection(db, "posts", id, "commenst"),
        (snapshot) => {
          let comments = [];
          snapshot.docs.forEach((doc) => {
            comments.unshift({
              id: doc._key.path.segments[8],
              commentInfo: doc.data(),
              createTime: doc._document.createTime.timestamp,
            });
          });
          if (comments.length === 0) return;
          comments.sort((a, b) => a.createTime.seconds - b.createTime.seconds);
          const newArray = comments.slice(1).concat(comments[0]);
          setPost(newArray);
        },
        (error) => {
          throw error;
        }
      );
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
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const monthNames = [
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

    const outputDate =
      (day < 10 ? "0" + day : day) +
      " " +
      monthNames[monthIndex] +
      ", " +
      year +
      " | " +
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes);

    setComment("");

    try {
      const uniqeId = uuid.v4();

      await setDoc(doc(db, "posts", id, "commenst", uniqeId), {
        comment,
        userId,
        date: outputDate,
        userPhoto: userPhoto || "",
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
    <View style={[styles.postContainer, { paddingBottom: 100, paddingTop: 0 }]}>
      <ScrollView style={{ paddingTop: 32 }}>
        <View style={[styles.imageBox, { borderWidth: 0 }]}>
          <Image source={{ uri: photoUri }} style={styles.wholeBox} />
        </View>
        {post &&
          post.map((el) => {
            const userComment = userId === el.commentInfo.userId;
            const userPhoto = el.commentInfo.userPhoto;

            return (
              <View
                key={el.id || "154868613"}
                style={[
                  {
                    width: "100%",
                    marginBottom: 24,
                  },
                  userComment
                    ? { flexDirection: "row" }
                    : { flexDirection: "row-reverse" },
                ]}
              >
                <View
                  style={[
                    {
                      flex: 1,
                      padding: 16,
                      backgroundColor: " rgba(0, 0, 0, 0.03)",
                      borderRadius: 6,
                    },
                    userComment && { marginRight: 16 },
                  ]}
                >
                  <Text style={{ marginBottom: 8 }}>
                    {el.commentInfo.comment}
                  </Text>
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
                    {el.commentInfo.date}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      overflow: "hidden",
                      backgroundColor: "#F6F6F6",
                    },
                    !userComment && { marginRight: 16 },
                  ]}
                >
                  {userPhoto && (
                    <Image
                      source={{ uri: userPhoto }}
                      style={styles.wholeBox}
                    />
                  )}
                </View>
              </View>
            );
          })}
      </ScrollView>
      <Input {...props} />
    </View>
  );
};
export default CommentsScreen;
