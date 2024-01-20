import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropdownSelector from '../components/DropdownSelector';

const Setup = () => {

  const [refreeID, setRefreeID] = useState("");
  const [refreeEmail, setRefreeEmail] = useState("");

  const [passwordState, setPasswordState] = useState({
    password: "",
    isSecure: true,
  });

  const [confirmPasswordState, setConfirmPasswordState] = useState({
    confirmPassword: "",
    isSecure: true,
  });

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
    setConfirmPasswordState((prevState) => ({ ...prevState, confirmPassword }));
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
          Setup
        </Text>
      </View>
      <ScrollView
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          flex: 1,
          backgroundColor: "#9FD1FF",
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 65,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#111F51",
            height: 35,
            width: 80,
            marginTop: 20,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            Setup
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "#111F51", fontSize: 19, fontWeight: "500" }}>
          Password to access settings
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
        </View>
        <Text
          style={{
            color: "#111F51",
            fontSize: 19,
            fontWeight: "500",
            marginTop: 20,
          }}
        >
          Evaluation
        </Text>
        <View style={{ marginTop: 10 }}>
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Referee ID
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              value={refreeID}
              onChangeText={(text) => setRefreeID(text)}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 20,
              }}
            >
              Referee Email (License)
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              value={refreeEmail}
              onChangeText={(text) => setRefreeEmail(text)}
            />
          </View>
        </View>
        <Text
          style={{
            color: "#111F51",
            fontSize: 19,
            fontWeight: "500",
            marginTop: 20,
          }}
        >
          Web Server Access
        </Text>
        <View style={{ marginTop: 10 }}>
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              URL Address
            </Text>
            <TextInput
              style={{
                height: 50,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                marginTop: 10,
                paddingLeft: 10,
                borderRadius: 10,
                width: "100%",
              }}
              placeholder=""
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 18,
                fontWeight: "300",
                marginTop: 20,
              }}
            >
              Subject ID
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              // value={refreeEmail}
              // onChangeText={(text) => setRefreeEmail(text)}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#000",
                fontSize: 18,
                fontWeight: "300",
                marginTop: 20,
              }}
            >
              Password
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              // value={refreeEmail}
              // onChangeText={(text) => setRefreeEmail(text)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              width: "100%",
            }}
          >
            <DropdownSelector label="Evaluations" placeholderLabel="Select" />
            <TouchableOpacity
              style={{
                backgroundColor: "#111F51",
                height: 50,
                width: "25%",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
                Load Evaluation
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: "#111F51",
              fontSize: 19,
              fontWeight: "500",
              marginTop: 20,
            }}
          >
            App Root
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              fontWeight: "300",
              marginTop: 10,
            }}
          >
            Base Folder: file:///data/user/0/com.apisoftware.EcoeApp/ This is
            the starting point to access the data folder
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Directory
            </Text>
            <TextInput
              style={{
                height: 50,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                marginTop: 10,
                paddingLeft: 10,
                borderRadius: 10,
                width: "100%",
              }}
              placeholder=""
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              The director path relative to the base folder where the required
              files are stored and synchronized using any measures.
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Competitors (CSV)
            </Text>
            <TextInput
              style={{
                height: 50,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                marginTop: 10,
                paddingLeft: 10,
                borderRadius: 10,
                width: "100%",
              }}
              placeholder=""
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              This is the name of the csv file that contains the competitors
              data
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Evaluation (JSON)
            </Text>
            <TextInput
              style={{
                height: 50,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                marginTop: 10,
                paddingLeft: 10,
                borderRadius: 10,
                width: "100%",
              }}
              placeholder=""
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              This is the name of the file that contains the data for the
              evaluation.
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Answers (CSV)
            </Text>
            <TextInput
              style={{
                height: 50,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                marginTop: 10,
                paddingLeft: 10,
                borderRadius: 10,
                width: "100%",
              }}
              placeholder=""
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              This is file name where the results of the evaluation will be
              stored to be processed externally.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#111F51",
              height: 50,
              width: 170,
              borderRadius: 5,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
              Load Data
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Setup

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