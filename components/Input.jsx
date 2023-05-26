import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "../Screens/styles";

const Input = ({
  value,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  isFocused,
  stylesFocusedInput,
  textContentType,
  lastInputMargin,
  secureTextEntry,
  secureTextShow,
  submit,
}) => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={[
        styles.containerInput,
        submit && { position: "absolute", bottom: 16, left: 16 },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          lastInputMargin || styles.lastInputMargin,
          isFocused && stylesFocusedInput,
          { fontFamily: "Roboto-Regular" },
          submit && { borderRadius: 100 },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#BDBDBD"
        onFocus={onFocus}
        onBlur={onBlur}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.hide}
          onPress={() => secureTextShow(!secureTextEntry)}
        >
          <Text style={[styles.redirect, { fontFamily: "Roboto-Regular" }]}>
            Показать
          </Text>
        </TouchableOpacity>
      )}
      {!secureTextEntry && secureTextShow && (
        <TouchableOpacity
          style={[styles.hide, { fontFamily: "Roboto-Regular" }]}
          onPress={() => secureTextShow(!secureTextEntry)}
        >
          <Text style={[styles.redirect, { fontFamily: "Roboto-Regular" }]}>
            Скрыть
          </Text>
        </TouchableOpacity>
      )}
      {submit && (
        <TouchableOpacity style={styles.postCommentButton} onPress={submit}>
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
