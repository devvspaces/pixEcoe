import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";

const Filter = () => {
  const navigation = useNavigation();
  const [currentEv, setCurrentEv] = useState("");
  const [groupWheel, setGroupWheel] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Filter</Text>
      </View>
      <View style={styles.content}>
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
              Current Evaluation
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              value={currentEv}
              onChangeText={(text) => setCurrentEv(text)}
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
              Group (Wheel)
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              value={groupWheel}
              onChangeText={(text) => setGroupWheel(text)}
            />
          </View>
        </View>
        <TouchableOpacity
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
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
  header: {
    height: 60,
    backgroundColor: "#111F51",
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 20,
  },
  content: {
    backgroundColor: "#9FD1FF",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
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
