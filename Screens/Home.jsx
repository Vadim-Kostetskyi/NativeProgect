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
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

const RegistrationScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            { justifyContent: "flex-start", paddingTop: 92, height: 450 },
          ]}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 22, right: 16 }}
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
            <Text style={styles.header}>Natali Romanova</Text>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;
