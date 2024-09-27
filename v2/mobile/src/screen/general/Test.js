import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import TestQuestionList from "../../components/TestQuestionList";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../constants/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

const Test = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });

  useEffect(() => {
    loadDownloadedEvaluationData();
  }, []);

  const loadDownloadedEvaluationData = async () => {
    try {
      const downloadedData = await AsyncStorage.getItem(
        "downloadedEvaluationData"
      );
      if (downloadedData) {
        const parsedData = JSON.parse(downloadedData);
        setEvaluations(parsedData);
        // console.log("Downloaded Evaluation Data:", parsedData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading evaluation data:", error);
      setLoading(false);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const detail =
    evaluations.data && evaluations.data.detail ? evaluations.data.detail : {};

  const sections = [];

  let section = null;

  for (const key in detail) {
    const obj = detail[key];
    const comment = obj.comment;

    if (comment) {
      if (section) {
        sections.push(section);
      }
      section = {
        section: comment,
        questions: [],
      };
    } else if (obj.questionnumber) {
      const question = {
        questionnumber: obj.questionnumber,
        answers: obj.answers || [],
      };
      section.questions.push(question);
    }
  }
  if (section) {
    sections.push(section);
  }


  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: COLORS.mainBlue,
          alignSelf: "center",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loaderText}>{t("common:loading")}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <View>
        <StatusBar backgroundColor={COLORS.primary} />
        <View style={[styles.headert]}>
          {/* Back Icon */}

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={"arrow-back"} size={30} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.titlet}>{t("common:test")}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.mainBlue,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            borderRadius: 10,
            backgroundColor: COLORS.AltBlue,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 10,
            marginBottom: 5,
            width: "100%",
            height: 90,
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {evaluations.data.station_name}
          </Text>
        </View>
        {/* <Text>{formattedAnswersArray}</Text> */}
        <FlatList
          data={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TestQuestionList
              section={item}
            />
          )}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "ios" ? 30 : 65,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
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
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 20,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
    alignItems: "center",
  },
  button: {
    width: "45%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 19,
    fontWeight: "600",
    color: "#fff",
    marginRight: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  headert: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
  },
  titlet: {
    color: COLORS.white,
    fontSize: 20,
    marginLeft: 10,
  },
});
