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
import { useTranslation } from "react-i18next";

const EvaluationProcess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { students } = route.params;
  const studentId = students.map((student) => student.id);
  const studentIds = students.map((student) => student.group);
  const studentfamilyname = students.map((student) => student.family_name);
  const studentfirstname = students.map((student) => student.first_name);
  const loadingcRef = useRef(null);
  const loadingdRef = useRef(null);
  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });
  const [loadingc, setLoadingc] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [showMarkStatus, setShowMarkStatus] = useState(false);
  const [showCompetitorsStatus, setShowCompetitorsStatus] = useState(false);

  useEffect(() => {
    loadDownloadedEvaluationData();
    loadStatus();
  }, [currentStudentIndex]);

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
    } catch (error) {
      console.error("Error loading downloaded data:", error);
    }
  };

  // Inside the EvaluationProcess component
  const getTotalPoints = () => {
    let totalPoints = 0;
    for (const questionSection of sections) {
      for (const question of questionSection.questions) {
        const selectedAnswerId = selectedAnswers[question.questionnumber];
        if (selectedAnswerId) {
          const selectedAnswer = question.answers[selectedAnswerId];
          if (selectedAnswer) {
            totalPoints += selectedAnswer.points;
          }
        }
      }
    }
    return totalPoints;
  };



  const loadStatus = async () => {
    const showMarkData = await AsyncStorage.getItem("showmark");
    const showCompetitorsData = await AsyncStorage.getItem("showcompetitors");

    if (showMarkData) {
      setShowMarkStatus(JSON.parse(showMarkData).status);
    }
    if (showCompetitorsData) {
      setShowCompetitorsStatus(JSON.parse(showCompetitorsData).status);
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

  // console.log(JSON.stringify(sections, null, 2));

  const handleAnswerSelection = (questionNumber, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionNumber]: answerId,
    });
    // console.log("Selected Answers:", selectedAnswers);
  };

  const formatSelectedAnswers = (selectedAnswers) => {
    const questionNumbers = Object.keys(selectedAnswers).map(Number).sort();
    const formattedAnswers = questionNumbers.flatMap((questionNumber) => [
      selectedAnswers[questionNumber],
    ]);

    return formattedAnswers;
  };

  const formattedAnswersArray = formatSelectedAnswers(selectedAnswers);

  console.log("Formatted selected Answers:", formattedAnswersArray);

  const saveEvaluation = async () => {
    try {
      const currentStudent = studentId[currentStudentIndex];
      const formattedAnswers = formatSelectedAnswers(selectedAnswers);
      let evaluationResults = await AsyncStorage.getItem("evaluationResults");
      evaluationResults = evaluationResults
        ? JSON.parse(evaluationResults)
        : {};
      evaluationResults[currentStudent] = evaluationResults[currentStudent]
        ? evaluationResults[currentStudent].concat(formattedAnswers)
        : formattedAnswers;

      await AsyncStorage.setItem(
        "evaluationResults",
        JSON.stringify(evaluationResults)
      );

      console.log("Updated Evaluation Results:", evaluationResults);
      Alert.alert("Success", "Evaluation saved successfully!");
    } catch (error) {
      console.error("Error saving evaluation:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const saveTotalScore = async () => {
    try {
      const currentStudent = studentId[currentStudentIndex];
      const totalScore = getTotalPoints();
      let totalScores = await AsyncStorage.getItem("totalScores");
      totalScores = totalScores ? JSON.parse(totalScores) : {};
      totalScores[currentStudent] = totalScore;
      await AsyncStorage.setItem("totalScores", JSON.stringify(totalScores));
      console.log("Total Scores:", totalScores);
    } catch (error) {
      console.error("Error saving total score:", error);
    }
  };

  const handleNext = () => {
    setLoadingc(true);
    try {
      saveEvaluation();
      saveTotalScore();
      setSelectedAnswers({});
      setCurrentStudentIndex((prevIndex) =>
        Math.min(prevIndex + 1, studentId.length - 1)
      );
    } catch (error) {
      console.error("Error saving evaluation:", error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoadingc(false);
    }
  };

  const handlePrevious = async () => {
    setLoadingd(true);
    try {
      setCurrentStudentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      const prevStudent = studentId[currentStudentIndex - 1];
      let evaluationResults = await AsyncStorage.getItem("evaluationResults");
      evaluationResults = evaluationResults
        ? JSON.parse(evaluationResults)
        : {};
      const prevStudentAnswers = evaluationResults[prevStudent] || [];
      setSelectedAnswers(
        prevStudentAnswers.reduce((acc, answer, index) => {
          acc[index + 1] = answer;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error loading previous evaluation:", error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoadingd(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircleo" size={25} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{t("common:evaproce")}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePrevious}
            disabled={currentStudentIndex === 0 || loadingd}
          >
            {loadingd ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t("common:prev")}</Text>
            )}
            <AntDesign name="banckward" size={25} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
            disabled={currentStudentIndex === studentId.length - 1 || loadingc}
          >
            {loadingc ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t("common:next")}</Text>
            )}
            <AntDesign name="forward" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
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
              {evaluations.data.station_name}
            </Text>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {studentIds[currentStudentIndex]} -
              </Text>
              {showCompetitorsStatus && (
                <Text
                  style={{ fontSize: 16, fontWeight: "500", marginLeft: 5 }}
                >
                  {studentfamilyname[currentStudentIndex]}{" "}
                  {studentfirstname[currentStudentIndex]}
                </Text>
              )}
              {showMarkStatus && (
                <Text
                  style={{ fontSize: 16, fontWeight: "500", marginLeft: 5 }}
                >
                  ({getTotalPoints()})
                </Text>
              )}
            </View>
          </View>
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
    justifyContent: "space-between",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    backgroundColor: "#9FD1FF",
    alignItems:'center'
  },
  button: {
    width: "45%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center',
    flexDirection:'row'
  },
  buttonText: {
    fontSize: 19,
    fontWeight: "600",
    color: "#fff",
    marginRight:10
  },
});
