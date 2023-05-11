import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

const Input = ({
  value,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  isFocused,
  stylesFocusedInput,
  textContentType,
  margin,
  secureTextEntry,
  secureTextShow,
}) => {
  return (
    <View style={defaultStyles.container}>
      <TextInput
        style={[
          defaultStyles.input,
          margin || defaultStyles.margin,
          isFocused && stylesFocusedInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={defaultStyles.hide}
          onPress={() => secureTextShow(!secureTextEntry)}
        >
          <Text>Показать</Text>
        </TouchableOpacity>
      )}
      {!secureTextEntry && secureTextShow && (
        <TouchableOpacity
          style={defaultStyles.hide}
          onPress={() => secureTextShow(!secureTextEntry)}
        >
          <Text>Скрыть</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,

    padding: 16,

    backgroundColor: "rgb(246, 246, 246)",

    fontSize: 16,
    lineHeight: 19,

    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,

    borderRadius: 8,
  },
  margin: {
    marginBottom: 16,
  },
  hide: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});

export default Input;
