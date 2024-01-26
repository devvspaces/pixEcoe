import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DevicePassword = () => {

  const navigation = useNavigation();

  const [passwordState, setPasswordState] = useState({
    password: "",
    isSecure: true,
  });

  const [confirmPasswordState, setConfirmPasswordState] = useState({
    confirmPassword: "",
    isSecure: true,
  });

  const [initialSetup, setInitialSetup] = useState(false);

  useEffect(() => {
    checkInitialSetup();
  }, []);

  const checkInitialSetup = async () => {
    try {
      const value = await AsyncStorage.getItem("@appPassword");
      if (value === null) {
        setInitialSetup(true);
      }
    } catch (err) {
      console.log("Error @checkInitialSetup: ", err);
    }
  };

  const handlePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordState((prevState) => ({
        ...prevState,
        isSecure: !prevState.isSecure,
      }));
    } else if (field === "confirmPassword") {
      setConfirmPasswordState((prevState) => ({
        ...prevState,
        isSecure: !prevState.isSecure,
      }));
    }
  };

  const updatePassword = (password) => {
    setPasswordState((prevState) => ({ ...prevState, password }));
  };

  const updateConfirmPassword = (confirmPassword) => {
    setConfirmPasswordState((prevState) => ({
      ...prevState,
      confirmPassword,
    }));
  };

  const savePassword = async () => {
    try {
      if (
        passwordState.password.trim() === "" ||
        confirmPasswordState.confirmPassword.trim() === ""
      ) {
        alert("Password cannot be empty. Please enter a password.");
        return;
      }
      
      if (passwordState.password === confirmPasswordState.confirmPassword) {
        await AsyncStorage.setItem("@appPassword", passwordState.password);
        navigation.navigate("Home");
      } else {
        alert("Passwords do not match. Please try again.");
      }
    } catch (err) {
      console.log("Error @savePassword: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={{ backgroundColor: "#111F51" }} />
      <View
        style={{
          height: 60,
          backgroundColor: "#111F51",
          justifyContent: "center",
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
          Device Passsword
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          flex: 1,
          backgroundColor: "#9FD1FF",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text style={{ color: "#111F51", fontSize: 19, fontWeight: "500" }}>
          {initialSetup
            ? "Password to access settings"
            : "Set a password to access settings"}
        </Text>
        <View style={{ marginTop: 10 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "200" }}>Choose Password</Text>
            <View
              style={{
                height: 60,
                borderWidth: 0.5,
                flexDirection: "row",
                borderColor: "#FFFFFF",
                borderRadius: 14,
                marginTop: 10,
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: "center",
                width: "70%",
              }}
            >
              <TextInput
                style={{ width: 170 }}
                secureTextEntry={passwordState.isSecure}
                onChangeText={updatePassword}
              />
              <Pressable onPress={() => handlePasswordVisibility("password")}>
                <MaterialCommunityIcons
                  name={
                    passwordState.isSecure ? "eye-off-outline" : "eye-outline"
                  }
                  size={22}
                  color="#9597A6"
                />
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontWeight: "200" }}>Repeat Password</Text>
            <View
              style={{
                height: 60,
                borderWidth: 0.5,
                flexDirection: "row",
                borderColor: "#FFFFFF",
                borderRadius: 14,
                marginTop: 10,
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: "center",
                width: "70%",
              }}
            >
              <TextInput
                style={{ width: 170 }}
                secureTextEntry={confirmPasswordState.isSecure}
                onChangeText={updateConfirmPassword}
              />
              <Pressable
                onPress={() => handlePasswordVisibility("confirmPassword")}
              >
                <MaterialCommunityIcons
                  name={
                    confirmPasswordState.isSecure
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#9597A6"
                />
              </Pressable>
            </View>
          </View>
          <TouchableOpacity
            onPress={savePassword}
            style={{
              backgroundColor: "#111F51",
              height: 50,
              width: "70%",
              borderRadius: 5,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DevicePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
  inputBox: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    width: "70%",
  },
});
