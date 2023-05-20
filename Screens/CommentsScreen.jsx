import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { View, Image } from "react-native";
const CommentsScreen = () => {
  const {
    params: { photoUri },
  } = useRoute();
  return (
    <View style={styles.postContainer}>
      <View style={[styles.imageBox, { borderWidth: 0 }]}>
        <Image
          source={{ uri: photoUri }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};
export default CommentsScreen;
