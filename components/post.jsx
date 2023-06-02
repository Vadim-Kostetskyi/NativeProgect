import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../Screens/styles";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  onSnapshot,
  collection,
  deleteField,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Post = ({
  id,
  photoUri,
  commentsNumber,
  title,
  locationText,
  recordLocation,
  likeNumber,
  userId,
  nickname,
  userPhoto,
}) => {
  const [likes, setLikes] = useState(null);
  const [userLike, setUserLike] = useState(null);
  const [likesList, setLikesList] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await onSnapshot(
        collection(db, "posts", id, "likes"),
        (snapshot) => {
          let comments = [];
          snapshot.docs.forEach((doc) => {
            comments.unshift({
              id: doc._key.path.segments[8],
              likeInfo: doc.data(),
              createTime: doc._document.createTime.timestamp,
            });
          });
          if (comments.length === 0) return;
          comments.sort((a, b) => a.createTime.seconds - b.createTime.seconds);
          const newArray = comments.slice(1).concat(comments[0]);
          const user = newArray.filter((item) => item.id == userId);
          if (user) {
            if (user.length > 0) {
              const userComment = user[0].likeInfo;

              if (userComment && Object.keys(userComment).length !== 0) {
                setUserLike(true);
              } else {
                setUserLike(false);
              }
            } else {
              setUserLike(false);
            }
          }

          setLikes(newArray);
        },
        (error) => {
          throw error;
        }
      );
    })();
  }, []);

  const dateNow = () => {
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
      day < 10
        ? "0" + day
        : day +
          " " +
          monthNames[monthIndex] +
          ", " +
          year +
          " | " +
          (hours < 10 ? "0" + hours : hours) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes);
    return outputDate;
  };

  const handleLike = async () => {
    const date = dateNow();
    try {
      const userCommentRef = doc(db, "posts", id, "likes", userId);

      if (!userLike) {
        await setDoc(userCommentRef, {
          date,
          nickname,
        });
        setUserLike(true);
      } else {
        await updateDoc(userCommentRef, {
          date: deleteField(),
          nickname: deleteField(),
        });
        setUserLike(false);
      }

      const ref = doc(db, "posts", id);

      await updateDoc(
        ref,
        !userLike
          ? {
              likeNumber: increment(1),
            }
          : {
              likeNumber: increment(-1),
            }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeLongPress = () => {
    setLikesList(true);
  };

  const listLikeClose = () => {
    setLikesList(false);
  };

  return (
    <TouchableWithoutFeedback onPress={listLikeClose}>
      <View style={{ marginBottom: 32 }}>
        <View style={[styles.imageBox, { borderWidth: 0 }]}>
          <Image source={{ uri: photoUri }} style={styles.wholeBox} />
        </View>
        <Text>{title}</Text>
        <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Comments", {
                  photoUri,
                  id,
                  userPhoto,
                  userId,
                })
              }
            >
              <FontAwesome
                name={commentsNumber > 0 ? "comment" : "comment-o"}
                size={19}
                color={commentsNumber > 0 ? "#FF6C00" : "#BDBDBD"}
                style={{ transform: [{ scaleX: -1 }], marginRight: 6 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                { marginRight: 25 },
                !commentsNumber > 0
                  ? { color: "rgb(189, 189, 189)" }
                  : { color: "rgb(0, 0, 0)" },
              ]}
            >
              {commentsNumber > 0 ? commentsNumber : 0}
            </Text>
            <TouchableOpacity
              onPress={handleLike}
              onLongPress={handleLikeLongPress}
            >
              <AntDesign
                name={userLike ? "like1" : "like2"}
                size={19}
                color="#FF6C00"
                style={{ marginRight: 6 }}
              />
            </TouchableOpacity>
            <Text>{likeNumber || 0}</Text>
            {likesList && (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignContent: "center",
                  bottom: 25,
                  left: 35,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 5,
                  paddingTop: 5,

                  borderWidth: 1,
                  borderColor: "rgb(0, 0, 0)",
                  borderRadius: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {likes?.slice(-3).map((el) => {
                  if (!el.likeInfo.nickname) {
                    return;
                  }
                  return (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "rgb(255, 255, 255)",
                        opacity: 1,
                      }}
                    >
                      {el.likeInfo.nickname}
                    </Text>
                  );
                })}
                <View
                  style={{
                    marginTop: 5,

                    borderTopWidth: 1,
                    borderStyle: "dashed",
                    borderTopColor: "#21130d",
                    opacity: 0.5,
                  }}
                >
                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "rgb(255, 255, 255)",
                      }}
                    >
                      Показать все
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Map", {
                  location: recordLocation,
                  title: title,
                })
              }
            >
              <Feather
                name="map-pin"
                size={18}
                color="rgba(189, 189, 189, 1)"
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textDecorationLine: "underline",
              }}
            >
              {locationText}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Post;
