import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomHeader from '../../components/CustomHeader';
import { COLORS } from '../../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { showError, showSuccess } from "../../utils/helperFunction";
import { useTranslation } from "react-i18next";

const DevicePassword = () => {

  const navigation = useNavigation();
  const { t } = useTranslation();

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
        showError(t("alert:alert14"));
        return;
      }
      
      if (passwordState.password === confirmPasswordState.confirmPassword) {
        await AsyncStorage.setItem("@appPassword", passwordState.password);
        navigation.navigate("Home");
      } else {
        showError(t("alert:alert15"));
      }
    } catch (err) {
      console.log("Error @savePassword: ", err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader
        title="Device Password"
        onBackPress={() => navigation.goBack()}
      />

      {/* screen content */}
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.AltBlue,
        }}
      >
        <Text
          style={{
            color: "#111F51",
            fontSize: 19,
            fontWeight: "600",
            marginTop: 20,
          }}
        >
          {initialSetup
            ? "Password to access settings"
            : "Set a password to access settings"}
        </Text>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            backgroundColor: COLORS.white,
            marginTop: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: COLORS.grey,
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              height: 60,
              width: "90%",
              borderRadius: 10,
              borderColor: COLORS.grey,
              borderWidth: 2,
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{ flex: 1, fontSize: 20, height: 40 }}
              secureTextEntry={passwordState.isSecure}
              onChangeText={updatePassword}
              placeholder={t("common:password")}
            />
            <Pressable onPress={() => handlePasswordVisibility("password")}>
              <MaterialCommunityIcons
                name={
                  passwordState.isSecure ? "eye-off-outline" : "eye-outline"
                }
                size={22}
                color={COLORS.gray}
              />
            </Pressable>
          </View>
          <View
            style={{
              height: 60,
              width: "90%",
              borderRadius: 10,
              borderColor: COLORS.grey,
              borderWidth: 2,
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TextInput
              style={{ fontSize: 20, flex: 1, height: 40 }}
              secureTextEntry={confirmPasswordState.isSecure}
              onChangeText={updateConfirmPassword}
              placeholder={t("common:rpassword")}
            />
            <Pressable
              onPress={() => handlePasswordVisibility("confirmPassword")}
            >
              <MaterialCommunityIcons
                name={
                  passwordState.isSecure ? "eye-off-outline" : "eye-outline"
                }
                size={22}
                color={COLORS.gray}
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: "100%",
            height: 60,
            backgroundColor: COLORS.primary,
            marginTop: 30,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={savePassword}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 19,
              fontWeight: "600",
            }}
          >
            {t("common:setpass")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DevicePassword

const styles = StyleSheet.create({})