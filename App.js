import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
} from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/Login";

export default function App() {
  return (
    <ImageBackground
      source={require("./images/background.png")}
      style={styles.background}
    >
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    // position: "absolute",
    flex: 1,
    justifyContent: "flex-end",
  },
});
