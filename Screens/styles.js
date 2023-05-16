import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
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
  focusedInput: {
    backgroundColor: "transparent",
    borderColor: "#FF6C00",
  },
  redirect: {
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
  standardFont: {
    fontSize: 16,
    lineHeight: 19,
  },

  //input styles
  containerInput: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,

    padding: 16,

    fontSize: 16,
    lineHeight: 19,

    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,

    backgroundColor: "rgb(246, 246, 246)",
  },
  lastInputMargin: {
    marginBottom: 16,
  },
  hide: {
    position: "absolute",
    right: 16,
    top: 16,
  },

  //post screen
  postContainer: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    marginBottom: 8,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
  },
  postInput: {
    height: 50,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  photoButton: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 30,
    backgroundColor: "#FFFFFF",
  },
});
