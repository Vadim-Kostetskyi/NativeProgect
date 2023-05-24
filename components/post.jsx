import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../Screens/styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Post = ({
  id,
  photoUri,
  commentsNumber,
  title,
  locationText,
  recordLocation,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={[styles.imageBox, { borderWidth: 0 }]}>
        <Image
          source={{ uri: photoUri }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text>{title}</Text>
      <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
        <View style={styles.flexRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Comments", { photoUri: photoUri, id: id })
            }
          >
            <Image
              source={require("../assets/images/message-circle.png")}
              style={{
                width: 22,
                height: 22,
                marginRight: 6,
                marginBottom: 10,
                paddingBottom: 5,
              }}
            />
          </TouchableOpacity>
          <Text
            style={
              !commentsNumber > 0
                ? { color: "rgb(189, 189, 189)" }
                : { color: "rgb(0, 0, 0)" }
            }
          >
            {commentsNumber > 0 ? commentsNumber : 0}
          </Text>
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
    </>
  );
};

export default Post;
