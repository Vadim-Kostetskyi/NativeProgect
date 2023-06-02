import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { storage, db } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [title, setTitle] = useState("");
  const [locationText, setLocationText] = useState("");

  let allowPost = !!(photoUri && title && locationText);
  const { nickname, userId } = useSelector((state) => state);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const handleTakePicture = async () => {
    if (photoUri) {
      setPhotoUri("");
      return;
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoUri(uri);
    }
  };

  const uploadPost = async (coords) => {
    const response = await fetch(photoUri);
    const file = await response.blob();

    const date = new Date();
    const storageRef = ref(storage, `images/${date}`);
    let imageUrl;
    await uploadBytes(storageRef, file);

    await getDownloadURL(ref(storage, `images/${date}`)).then((url) => {
      imageUrl = url;
    });

    try {
      await addDoc(collection(db, "posts"), {
        photo: imageUrl,
        title,
        locationText,
        location: coords,
        nickname,
        userId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const publicPost = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    navigation.navigate("Posts");

    uploadPost(coords);

    setTitle("");
    setLocationText("");
    setPhotoUri("");
    setHasPermission("");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.postContainer}>
      <View style={styles.imageBox}>
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <View style={styles.imageButton}>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={handleTakePicture}
            >
              <View style={styles.overlay}></View>
              <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {photoUri && (
            <View style={styles.wholeBox}>
              <Image source={{ uri: photoUri }} style={styles.wholeBox} />
            </View>
          )}
        </Camera>
      </View>
      <Text style={[{ color: "#BDBDBD" }, styles.standardFont]}>
        Редактировать фото
      </Text>
      <TextInput
        style={[styles.standardFont, styles.postInput]}
        placeholder="Название..."
        placeholderTextColor="#BDBDBD"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.inputBox}>
        <Feather
          name="map-pin"
          size={18}
          color="rgba(189, 189, 189, 1)"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={[
            styles.standardFont,
            styles.postInput,
            { width: "100%", borderBottomWidth: 0, marginBottom: 0 },
          ]}
          placeholder="Местность..."
          placeholderTextColor="#BDBDBD"
          value={locationText}
          onChangeText={setLocationText}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, allowPost ? "" : { backgroundColor: "#F6F6F6" }]}
        onPress={publicPost}
        disabled={allowPost ? false : true}
      >
        <Text
          style={[styles.buttonText, allowPost ? "" : { color: "#BDBDBD" }]}
        >
          Опубликовать
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;
