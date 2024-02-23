import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import ConfigDropdown from "../components/ConfigDropdown";
import ColorConfigDropdown from "../components/ColorConfigDropdown";
import Selector from "../../LanguageSelector";
const Configuration = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={{ backgroundColor: "#000" }} />
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
          Configuration
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#9FD1FF",
          flex: 1,
          paddingTop: 40,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <ConfigDropdown />
        <ColorConfigDropdown
          label="Default Theme"
          placeholderLabel="Dark Blue"
        />

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
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Configuration;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
});
