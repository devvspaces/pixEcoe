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
import { useTranslation } from "react-i18next";

const Help = () => {

  const navigation = useNavigation();
  const { t } = useTranslation();

  const topics = [
    t("help:topic1"),
    t("help:topic2"),
    t("help:topic3"),
    t("help:topic4"),
    t("help:topic5"),
    t("help:topic6"),
  ];

  const handleTopicClick = (topic) => {
    navigation.navigate("helpdetails", { topic });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("common:help")}</Text>
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
        <Text style={styles.contentTitle}>{t("help:helptitle")}</Text>
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
        <Text style={styles.additionalInfoTitle}>{t("help:helpsubtext")}</Text>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:setupTabIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:evaluationTabIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:configurationTabIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:helpTabIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:downloadIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>
            {t("help:filterIconEvaluationTab")}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:competitorsIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:testIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:ecoIcon")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="circle" size={20} color="#555" />
          <Text style={styles.infoText}>{t("help:backIcon")}</Text>
        </View>
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
