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

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [loginIsFocused, setLoginIsFocused] = useState(false);
  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

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

  // const onRegister = () => {
  //   console.log(`Логін: ${login},Пошта: ${mail},Пароль: ${password}`);
  // };

  const props = [
    {
      value: login,
      onChangeText: setLogin,
      placeholder: "Логин",
      onFocus: handleFocusLogin,
      onBlur: handleBlurLogin,
      isFocused: loginIsFocused,
      stylesFocusedInput: styles.focusedInput,
    },
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

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { paddingTop: 92 }]}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Home", {
                recordedLogin: login,
                recordedMail: mail,
              })
            }
          >
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 45 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;
