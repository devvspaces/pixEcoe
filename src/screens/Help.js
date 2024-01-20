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
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const topics = [
  "How to start working",
  "Filtering competitors by station",
  "Competitor Options",
  "Changing app theme",
  "Internal Database",
  "Marking questions",
  "Uploading results",
];

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

const Help = () => {

  const navigation = useNavigation();

  const handleTopicClick = (topic) => {
    navigation.navigate("helpdetails", { topic });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Help</Text>
      </View>
      <ScrollView
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          flex: 1,
          backgroundColor: "#9FD1FF",
          paddingTop:20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 75 : 65,
        }}
      >
        <Text style={styles.contentTitle}>Select a Topic</Text>
        <View style={styles.topicContainer}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicBox}
              onPress={() => handleTopicClick(topic)}
            >
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Additional Information Section */}
        <Text style={styles.additionalInfoTitle}>
          Read this page carefully and become familiar with available buttons in
          the application
        </Text>
        {infos.map((info, index) => (
          <View key={index} style={styles.infoItem}>
            <Icon name="circle" size={20} color="#555" />
            <Text style={styles.infoText}>{info}</Text>
          </View>
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
  header: {
    height: 60,
    backgroundColor: "#111F51",
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  content: {
    backgroundColor: "#9FD1FF",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  topicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  topicBox: {
    width: "47%",
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 20,
  },
  topicText: {
    fontSize: 14,
  },
  contentTitle: {
    color: "#9E9E9E",
    fontSize: 16,
    fontWeight: "500",
  },
  additionalInfoTitle: {
    color: "#9E9E9E",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 20,
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
