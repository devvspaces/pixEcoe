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
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";

const infos = [
  "Go to App Home",
  "Back to previous page",
  "Forward to next page",
  "Delete one competitor",
  "Save",
  "Back to previous Eco page",
  "Forward to next Eco page",
  "Info and About",
  "Download data from database",
  "Help",
  "Upload results to database",
  "Change results file name",
];

const HelpDetails = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const articletitle = route.params?.topic;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{articletitle}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          Read this page carefully and to understand what’s being explained
        </Text>
        {infos.map((info, index) => (
          <View key={index} style={styles.infoItem}>
            <Icon name="circle" size={20} color="#555" />
            <Text style={styles.infoText}>{info}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HelpDetails;

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
    flexDirection:'row',
    alignItems: 'center'
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginLeft:20
  },
  content: {
    backgroundColor: "#9FD1FF",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  contentTitle: {
    color: "#9E9E9E",
    fontSize: 16,
    fontWeight: "500",
    marginBottom:10
  },
  infoItem: {
    marginTop: 10,
    flexDirection: "row",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});
