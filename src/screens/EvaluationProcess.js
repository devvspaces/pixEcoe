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
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import QuestionList from "../components/QuestionList";


const EvaluationProcess = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const { studentId } = route.params;
  const loadingcRef = useRef(null);
  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });
  const [loadingc, setLoadingc] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
        console.log("Downloaded Evaluation Data:", parsedData);
      }
    } catch (error) {
      console.error("Error loading downloaded data:", error);
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

  console.log(JSON.stringify(sections, null, 2));

  const handleAnswerSelection = (questionNumber, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionNumber]: answerId,
    });
    console.log("Selected Answers:", selectedAnswers);
  };

  const formatSelectedAnswers = (selectedAnswers) => {
    const questionNumbers = Object.keys(selectedAnswers).map(Number).sort();
    const formattedAnswers = questionNumbers.flatMap((questionNumber) => [
      selectedAnswers[questionNumber],
    ]);

    return formattedAnswers;
  };

  const formattedAnswersArray = formatSelectedAnswers(selectedAnswers);

  console.log(formattedAnswersArray);

  const saveEvaluation = async () => {

    try {
      setLoadingc(true);
      if (!studentId) {
        console.error("Error: Student ID not available.");
        return;
      }

      const formattedAnswers = formatSelectedAnswers(selectedAnswers);
      console.log("Formatted Answers:", formattedAnswers);

      let evaluationResults = await AsyncStorage.getItem("evaluationResults");
      evaluationResults = evaluationResults
        ? JSON.parse(evaluationResults)
        : {};

      evaluationResults[studentId] = evaluationResults[studentId]
        ? evaluationResults[studentId].concat(formattedAnswers)
        : formattedAnswers;

      await AsyncStorage.setItem(
        "evaluationResults",
        JSON.stringify(evaluationResults)
      );

      Alert.alert("Success", "Evaluation saved successfully!");
    } catch (error) {
      console.error("Error saving evaluation:", error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoadingc(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Evaluation Process </Text>
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 50,
          }}
        >
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
              Station: {evaluations.data.station_name}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Subject: Medicina Interna
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: "15%",
              borderRadius: 20,
              backgroundColor: "#111F51",
              height: 40,
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}
              onPress={saveEvaluation}
            >
              Save
            </Text>
            {loadingc && (
              <ActivityIndicator
                ref={loadingcRef}
                style={{ marginLeft: 10 }}
                size="small"
                color="#fff"
              />
            )}
          </TouchableOpacity>
        </View>
        {/* <Text>{formattedAnswersArray}</Text> */}
        <FlatList
          data={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <QuestionList
              section={item}
              handleAnswerSelection={handleAnswerSelection}
              selectedAnswers={selectedAnswers}
            />
          )}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "ios" ? 30 : 65,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default EvaluationProcess;

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
