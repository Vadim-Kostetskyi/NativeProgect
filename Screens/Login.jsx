import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import React, { useState } from "react";

import Input from "../components/Input";

const LoginScreen = () => {
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

  const onRegister = () => {
    console.log(`Пошта: ${mail},Пароль: ${password}`);
  };

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
      margin: styles.lastInput,
      secureTextEntry: secureText,
      secureTextShow: setSecureText,
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Войти</Text>
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
                margin={prop.margin}
                secureTextEntry={prop.secureTextEntry}
                secureTextShow={prop.secureTextShow}
              />
            );
          })}
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirect}>
          <Text>Нет аккаунта? Зарегистрироваться</Text>
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
    paddingTop: 32,
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
  focusedInput: {
    borderColor: "#FF6C00",
  },
  redirect: {
    marginBottom: 111,
  },
});

export default LoginScreen;
