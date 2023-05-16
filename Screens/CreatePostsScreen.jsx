import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.imageBox}>
        <TouchableOpacity style={styles.photoButton}>
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <Text style={[{ color: "#BDBDBD" }, styles.standardFont]}>
        Редактировать фото
      </Text>
      <TextInput
        style={[styles.standardFont, styles.postInput]}
        placeholder="Название..."
        placeholderTextColor="#BDBDBD"
      >
        Лес
      </TextInput>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
          marginBottom: 32,
          paddingLeft: 5,
        }}
      >
        <Feather
          name="map-pin"
          size={18}
          color="rgba(189, 189, 189, 1)"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={[styles.standardFont, styles.postInput, { marginBottom: 0 }]}
          placeholder="Местность..."
          placeholderTextColor="#BDBDBD"
        >
          Ivano-Frankivs'k Region, Ukraine
        </TextInput>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;
