import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUpload() {

  const [image, setImage] = useState(null);

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {

    const data = new FormData();

    data.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: "upload.jpg"
    });

    data.append("upload_preset", "Dynamic folders");

    try {

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkteitjxk/image/upload",
        {
          method: "POST",
          body: data
        }
      );

      const file = await res.json();

      console.log("Uploaded URL:", file.secure_url);

      Alert.alert("Upload success");

      // send this URL to your backend
      // example:
      // await fetch("https://your-api.com/profile-photo", { ... })

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

    </View>
  );
}