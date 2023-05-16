import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

import { useFonts } from "expo-font";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../components/Input";
import { styles } from "./styles";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

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

  // const onRegister = () => {
  //   console.log(`Пошта: ${mail},Пароль: ${password}`);
  // };

  const props = [
    {
      value: mail,
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

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.header, { fontFamily: "Roboto-Medium" }]}>
            Войти
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          >
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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Home", {
                recordedMail: mail,
              })
            }
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 111 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.redirect}>
              Нет аккаунта? Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;
