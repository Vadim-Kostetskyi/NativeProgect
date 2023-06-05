import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { styles } from "../Screens/styles";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";

const postShow = ({ props }) => {
  const {
    id,
    navigation,
    userLike,
    likesShowAll,
    likesListShow,
    likesList,
    userId,
    hideLikeList,
    showLikeList,
    listLikeClose,
    handleLikeLongPress,
    handleLike,
    photoUri,
    commentsNumber,
    title,
    locationText,
    recordLocation,
    likeNumber,
    userPhoto,
  } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        listLikeClose();
        hideLikeList();
      }}
    >
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
            {likesListShow && (
              // <ScrollView>
              <View style={styles.likeListBox}>
                {likesList?.map((el) => {
                  if (!el.likeInfo.nickname) {
                    return;
                  }
                  return (
                    <Text key={el.likeInfo.nickname} style={styles.likeList}>
                      {el.likeInfo.nickname}
                    </Text>
                  );
                })}
                {likesShowAll && (
                  <View style={styles.likeShowAllBox}>
                    <TouchableOpacity onPress={showLikeList}>
                      <Text style={styles.likeShowAllText}>Показать все</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              // </ScrollView>
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
                color="#BDBDBD"
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
export default postShow;
