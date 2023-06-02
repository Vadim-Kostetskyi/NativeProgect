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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { registerDB } from "../redux/auth/authOperations";
import { storage } from "../config";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loginIsFocused, setLoginIsFocused] = useState(false);
  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const [nickname, setNickname] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const state = {
    nickname,
    userEmail: email,
    password,
    avatar,
  };

  const handleFocusLogin = () => {
    setLoginIsFocused(true);
  };
  const handleBlurLogin = () => {
    setLoginIsFocused(false);
  };

  const handleFocusMail = () => {
    setMailIsFocused(true);
  };
  const handleBlurMail = () => {
    setMailIsFocused(false);
  };

  const handleFocusPassword = () => {
    setPasswordIsFocused(true);
  };
  const handleBlurPassword = () => {
    setPasswordIsFocused(false);
  };

  const props = [
    {
      value: nickname,
      onChangeText: setNickname,
      placeholder: "Логин",
      onFocus: handleFocusLogin,
      onBlur: handleBlurLogin,
      isFocused: loginIsFocused,
      stylesFocusedInput: styles.focusedInput,
    },
    {
      value: email,
      onChangeText: setMail,
      placeholder: "Адрес электронной почты",
      onFocus: handleFocusMail,
      onBlur: handleBlurMail,
      isFocused: mailIsFocused,
      stylesFocusedInput: styles.focusedInput,
    },
    {
      value: password,
      onChangeText: setPassword,
      placeholder: "Пароль",
      onFocus: handleFocusPassword,
      onBlur: handleBlurPassword,
      isFocused: passwordIsFocused,
      stylesFocusedInput: styles.focusedInput,
      lastInputMargin: styles.lastInput,
      secureTextEntry: secureText,
      secureTextShow: setSecureText,
    },
  ];

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access storage is required!");
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!imagePickerResult.canceled) {
      const imageUri = imagePickerResult.assets[0].uri;
      const response = await fetch(imageUri);
      const file = await response.blob();

      const date = new Date();
      const storageRef = ref(storage, `images/${date}`);
      let imageUrl;
      await uploadBytes(storageRef, file);

      await getDownloadURL(ref(storage, `images/${date}`)).then((url) => {
        imageUrl = url;
      });

      setAvatar(imageUrl);
    }
  };

  const hendleSubmit = () => {
    setPassword("");
    setMail("");
    setNickname("");
    dispatch(registerDB(state, dispatch));
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { paddingTop: 92 }]}>
          <View style={styles.photoBox}>
            {avatar && (
              <Image source={{ uri: avatar }} style={styles.wholeBox} />
            )}
            <TouchableOpacity
              style={styles.photoAdd}
              onPress={handleImagePicker}
            >
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          >
            <Text style={styles.header}>Регистрация</Text>
            {props.map((prop, index) => {
              return (
                <Input
                  key={index}
                  value={prop.value}
                  onChangeText={prop.onChangeText}
                  placeholder={prop.placeholder}
                  onFocus={prop.onFocus}
                  onBlur={prop.onBlur}
                  isFocused={prop.isFocused}
                  stylesFocusedInput={prop.stylesFocusedInput}
                  lastInputMargin={prop.lastInputMargin}
                  secureTextEntry={prop.secureTextEntry}
                  secureTextShow={prop.secureTextShow}
                />
              );
            })}
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button} onPress={hendleSubmit}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 45 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.redirect}>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;
