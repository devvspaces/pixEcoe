import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import EcoTable from "../components/EcoTable";
const Eco = () => {
  const navigation = useNavigation();
   
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Eco</Text>
      </View>
      <ScrollView
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          flex: 1,
          backgroundColor: "#9FD1FF",
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 75 : 65,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom:40 }}>
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
        <EcoTable/>
        {/* display a table here  */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Eco;

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
});
