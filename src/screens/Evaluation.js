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
import { useNavigation } from "@react-navigation/native";

const Evaluation = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={{ backgroundColor: "#fff" }} />
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
          Evaluation
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#9FD1FF",
          flex: 1,
          paddingTop: 40,
          paddingLeft: 40,
        }}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("filter")}>
            <View
              style={{
                height: 220,
                width: 220,
                backgroundColor: "#045FB2",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/filter.png")}
                resizeMode="contain"
                style={{
                  height: 140,
                  width: 140,
                  alignSelf: "center",
                }}
              />
            </View>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 15,
                color: "#000",
                fontSize: 25,
                fontWeight: "500",
              }}
            >
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 60 }}
            onPress={() => navigation.navigate("evalutaionProcess")}
          >
            <View
              style={{
                height: 220,
                width: 220,
                backgroundColor: "#045FB2",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/evaluated.png")}
                resizeMode="contain"
                style={{
                  height: 140,
                  width: 140,
                  alignSelf: "center",
                }}
              />
            </View>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 15,
                color: "#000",
                fontSize: 25,
                fontWeight: "500",
              }}
            >
              Evaluated
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", width: "100%", paddingTop: 40 }}>
          <TouchableOpacity onPress={() => navigation.navigate("test")}>
            <View
              style={{
                height: 220,
                width: 220,
                backgroundColor: "#045FB2",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/test.png")}
                resizeMode="contain"
                style={{
                  height: 140,
                  width: 140,
                  alignSelf: "center",
                }}
              />
            </View>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 15,
                color: "#000",
                fontSize: 25,
                fontWeight: "500",
              }}
            >
              Test
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 60 }}
            onPress={() => navigation.navigate("eco")}
          >
            <View
              style={{
                height: 220,
                width: 220,
                backgroundColor: "#045FB2",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/eco.png")}
                resizeMode="contain"
                style={{
                  height: 140,
                  width: 140,
                  alignSelf: "center",
                }}
              />
            </View>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 15,
                color: "#000",
                fontSize: 25,
                fontWeight: "500",
              }}
            >
              Eco
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Evaluation;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
});
