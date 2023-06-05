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
import PostShow from "./postShow";

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
  const [likesListShow, setLikesListShow] = useState(false);
  const [likesShowAll, setLikesShowAll] = useState(false);

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

          if (newArray.length > 3) {
            setLikesShowAll(true);
          }

          setLikes(newArray);
          setLikesList(newArray.slice(-3));
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
    likesList && setLikesListShow(true);
  };

  const listLikeClose = () => {
    setLikesListShow(false);
  };

  const showLikeList = () => {
    setLikesList(likes);
    setLikesShowAll(false);
  };

  const hideLikeList = () => {
    setLikesList(likes?.slice(-3));
    if (likes?.length > 3) {
      setLikesShowAll(true);
    }
  };

  const props = {
    navigation,
    id,
    userLike,
    likesShowAll,
    likesListShow,
    likesList,
    userId,
    photoUri,
    commentsNumber,
    title,
    locationText,
    recordLocation,
    likeNumber,
    userPhoto,
    hideLikeList,
    showLikeList,
    listLikeClose,
    handleLikeLongPress,
    handleLike,
  };

  return <PostShow props={props} />;
};

export default Post;
