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
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import QuestionList from "../../components/QuestionList";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../constants/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showError, showSuccess } from "../../utils/helperFunction";

const EvaluationProcess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { students, studentDi } = route.params;

  const studentId = students.map((student) => student.id);
  const studentIds = students.map((student) => student.group);
  const studentfamilyname = students.map((student) => student.family_name);
  const studentfirstname = students.map((student) => student.first_name);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(
    students.findIndex((student) => student.id === studentDi)
  );
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });
  const [loadingc, setLoadingc] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showMarkStatus, setShowMarkStatus] = useState(false);
  const [showCompetitorsStatus, setShowCompetitorsStatus] = useState(false);

  useEffect(() => {
    loadDownloadedEvaluationData();
    loadStatus();
    loadSelectedAnswers();
  }, [currentStudentIndex]);

  useEffect(() => {
    saveEvaluation();
    saveTotalScore();
  }, [selectedAnswers]);

  const loadSelectedAnswers = async () => {
    try {
      const currentStudent = studentId[currentStudentIndex];
      let evaluationResults = await AsyncStorage.getItem("evaluationResults");
      evaluationResults = evaluationResults
        ? JSON.parse(evaluationResults)
        : {};
      const currentStudentAnswers = evaluationResults[currentStudent] || [];
      setSelectedAnswers(
        currentStudentAnswers.reduce((acc, answer, index) => {
          acc[index + 1] = answer;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error loading selected answers:", error);
    }
  };

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
      showError(t("alert:alert20"));
    }
  };

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

  console.log(JSON.stringify(sections, null, 2));

  const handleAnswerSelection = (questionNumber, answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = { ...prevSelectedAnswers };
      if (typeof answerId === "string") {
        // Handle text input
        updatedSelectedAnswers[questionNumber] = answerId;
      } else {
        if (updatedSelectedAnswers[questionNumber] === answerId) {
          delete updatedSelectedAnswers[questionNumber]; // Deselect if already selected
        } else {
          updatedSelectedAnswers[questionNumber] = answerId; // Select answer
        }
      }
      return updatedSelectedAnswers;
    });
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
      const totalQuestions = sections.reduce(
        (count, section) => count + section.questions.length,
        0
      );

      const formattedAnswers = Array.from(
        { length: totalQuestions },
        (_, index) => {
          const questionNumber = index + 1;
          return selectedAnswers[questionNumber] || ""; // Return selected or empty
        }
      );

      let evaluationResults = await AsyncStorage.getItem("evaluationResults");
      evaluationResults = evaluationResults
        ? JSON.parse(evaluationResults)
        : {};
      evaluationResults[currentStudent] = formattedAnswers;

      await AsyncStorage.setItem(
        "evaluationResults",
        JSON.stringify(evaluationResults)
      );
    } catch (error) {
      console.error("Error saving evaluation:", error);
      showError(t("alert:alert4"));
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
      setSelectedAnswers({});
      setCurrentStudentIndex((prevIndex) => (prevIndex + 1) % studentId.length);
      Alert.alert("Success", "Evaluation saved");
    } catch (error) {
      console.error("Error saving evaluation:", error);
      showError(t("alert:alert4"));
    } finally {
      setLoadingc(false);
    }
  };

  const handlePrevious = async () => {
    setLoadingd(true);
    try {
      const prevIndex =
        (currentStudentIndex - 1 + studentId.length) % studentId.length;
      setCurrentStudentIndex(prevIndex);
      const prevStudent = studentId[prevIndex];
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
      showSuccess(t("alert:alert23"));
    } catch (error) {
      // console.error("Error loading previous evaluation:", error);
      showError(t("alert:alert4"));
    } finally {
      setLoadingd(false);
    }
  };

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
            <Text style={styles.titlet}>{t("common:evaproce")}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePrevious}
              // disabled={currentStudentIndex === 0 || loadingd}
            >
              {loadingd ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <FontAwesome name="arrow-left" size={25} color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleNext}
              // disabled={currentStudentIndex === studentId.length - 1 || loadingc}
            >
              {loadingc ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <FontAwesome name="arrow-right" size={25} color="#fff" />
              )}
            </TouchableOpacity>
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
            marginBottom:5,
            width: "100%",
            height: 90,
            paddingTop: 15,
            paddingBottom: 15,
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
      </ScrollView>
    </View>
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
