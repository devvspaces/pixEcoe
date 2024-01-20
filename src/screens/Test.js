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

const Test = () => {
   const navigation = useNavigation();
   
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Evaluation Information</Text>
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              borderRadius: 20,
              backgroundColor: "#ffffff",
              height: 40,
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Station: Estacion 1
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Subject: Medicina Interna
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: "#111F51",
            fontSize: 20,
            fontWeight: "500",
            marginTop: 20,
          }}
        >
          Anamesis
        </Text>
        <View style={{ flexDirection: "row", paddingTop: 20, width: "100%" }}>
          <View style={{ width: "6%", height: 80, borderRadius: 20 }}>
            <View
              style={{
                height: 40,
                backgroundColor: "#111F51",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                1a
              </Text>
            </View>
            <View
              style={{
                height: 40,
                backgroundColor: "#3E3E3E",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                0
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: 40, width: "89%" }}>
            <Text
              style={{
                color: "#111F51",
                fontSize: 20,
                fontWeight: "500",
                textAlign: "justify",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <View style={styles.topicBox}>
              <Text style={styles.topicText}>No</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 20, width: "100%" }}>
          <View style={{ width: "6%", height: 80, borderRadius: 20 }}>
            <View
              style={{
                height: 40,
                backgroundColor: "#111F51",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                1a
              </Text>
            </View>
            <View
              style={{
                height: 40,
                backgroundColor: "#3E3E3E",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                0
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: 40, width: "89%" }}>
            <Text
              style={{
                color: "#111F51",
                fontSize: 20,
                fontWeight: "500",
                textAlign: "justify",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <View style={styles.topicBox}>
              <Text style={styles.topicText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Test;

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
  topicBox: {
    width: "100%",
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 20,
  },
  topicText: {
    fontSize: 18,
  },
});