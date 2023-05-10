import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import React, { useState } from "react";

import Input from "../components/Input";

const RegistrationScreen = () => {
  const [loginIsFocused, setLoginIsFocused] = useState(false);
  const [mailIsFocused, setMailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

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
      placeholder: "Логин",
      onFocus: handleFocusLogin,
      onBlur: handleBlurLogin,
      isFocused: loginIsFocused,
      stylesFocusedInput: styles.focusedInput,
    },
    {
      placeholder: "Адрес электронной почты",
      onFocus: handleFocusMail,
      onBlur: handleBlurMail,
      isFocused: mailIsFocused,
      stylesFocusedInput: styles.focusedInput,
    },
    {
      placeholder: "Пароль",
      onFocus: handleFocusPassword,
      onBlur: handleBlurPassword,
      isFocused: passwordIsFocused,
      stylesFocusedInput: styles.focusedInput,
      margin: styles.lastInput,
      secureTextEntry: true,
      password: "yes",
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.photoBox}>
          <Image
            source={require("../images/add.png")}
            style={styles.photoAdd}
          />
        </View>
        <Text style={styles.header}>Регистрация</Text>
        {props.map((prop, index) => {
          return (
            <Input
              key={index}
              placeholder={prop.placeholder}
              onFocus={prop.onFocus}
              onBlur={prop.onBlur}
              isFocused={prop.isFocused}
              stylesFocusedInput={prop.stylesFocusedInput}
              margin={prop.margin}
              password={prop.password}
              secureTextEntry={prop.secureTextEntry}
            />
          );
        })}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirect}>
          <Text>Уже есть аккаунт? Войти</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
  },
  photoBox: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  photoAdd: {
    position: "absolute",
    bottom: 14,
    right: -13,
  },
  header: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginBottom: 32,
  },
  lastInput: {
    marginBottom: 43,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  redirect: {
    marginBottom: 45,
  },
});

export default RegistrationScreen;
