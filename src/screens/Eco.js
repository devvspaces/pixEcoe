import React, { useState, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import { useTranslation } from "react-i18next";

const Eco = () => {

  const navigation = useNavigation();
  const loadingcRef = useRef(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [serverUrl, setServerUrl] = useState("");
  const [refreeID, setRefreeID] = useState("");
  const [refreeEmail, setRefreeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [evaluationDetails, setEvaluationDetails] = useState(null);
  const [downloadedCompetitorData, setDownloadedCompetitorData] = useState(null);
  const [loadingc, setLoadingc] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [parsedEvaluationResults, setParsedEvaluationResults] = useState([]);
  
  useFocusEffect(
    React.useCallback(() => {
      loadDownloadedEvaluationData();
      loadStoredValues();
    }, [])
  );

  const loadStoredValues = async () => {
    setLoading(true);
    try {
      const storedRefreeID = await AsyncStorage.getItem("refreeID");
      const storedRefreeEmail = await AsyncStorage.getItem("refreeEmail");
      const storedServerUrl = await AsyncStorage.getItem("serverUrl");
      const storedPassword = await AsyncStorage.getItem("password");
      const evaluationResults = await AsyncStorage.getItem("evaluationResults");
      const EvalvaluationResults = JSON.parse(evaluationResults);
      const downloadedCompetitorDataString = await AsyncStorage.getItem("downloadedCompetitorData");

      setParsedEvaluationResults(EvalvaluationResults);
      console.log("evaluation result", parsedEvaluationResults);
      const parsedDownloadedCompetitorData = downloadedCompetitorDataString
        ? JSON.parse(downloadedCompetitorDataString)
        : null;
      setDownloadedCompetitorData(parsedDownloadedCompetitorData);
      setServerUrl(storedServerUrl);
      setRefreeID(storedRefreeID);
      setRefreeEmail(storedRefreeEmail);
      setPassword(storedPassword);
      setLoading(false);
    } catch (error) {
      console.error("Error loading downloaded data:", error);
      setLoading(false);
    }
  };

  const loadDownloadedEvaluationData = async () => {
    try {
      const evaluationDetailsString = await AsyncStorage.getItem(
        "EvaluationDetails"
      );
      const parsedEvaluationDetails = evaluationDetailsString
        ? JSON.parse(evaluationDetailsString)
        : null;
      setEvaluationDetails(parsedEvaluationDetails);
      // console.log("EvaluationDetails:", parsedEvaluationDetails);
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

  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });

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

  const tableHead = sections.map((section) =>
    section.questions.map((question) => ({
      questionNumber: question.questionnumber,
      section: section.section,
    }))
  );

  const students = downloadedCompetitorData
    ? downloadedCompetitorData.students
    : [];

  const renderTableCell = (
    questionNumber,
    student,
    parsedEvaluationResults
  ) => {
    const cellData = parsedEvaluationResults
      ? parsedEvaluationResults[student.id]
      : null;
    const answerIndex = questionNumber - 1;
    const answer = cellData ? cellData[answerIndex] : "";

    return (
      <View key={`${questionNumber}-${student.group}`} style={styles.tableCell}>
        <Text style={styles.cellText}>{answer}</Text>
      </View>
    );
  };


  // Function to render each row in the table
  const renderTableRow = (student, parsedEvaluationResults) => (
    <TouchableOpacity
      key={student.group}
      style={styles.tableRow}
      onPress={() =>
        // navigation.navigate("evalutaionProcess", { studentId: student.id })
        navigation.navigate("evalutaionProcess", {
          students: downloadedCompetitorData.students,
        })
      }
    >
      <View style={styles.firstColumn}>
        <Text style={styles.cellText}>{student.group}</Text>
      </View>

      {tableHead.map((section) =>
        section.map(({ questionNumber }) =>
          renderTableCell(questionNumber, student, parsedEvaluationResults)
        )
      )}
    </TouchableOpacity>
  );

  const uploadEvaluation = async () => {
    if (!evaluationDetails) {
      console.error("Error: Evaluation details not available.");
      return;
    }
   
    try {
      const evaluationResults = await AsyncStorage.getItem(
        "evaluationResults"
      );
      if (!evaluationResults) {
        console.error("No evaluation results found.");
        return;
      }
      const parsedEvaluationResults = JSON.parse(evaluationResults);
      console.log("Evaluation results.",parsedEvaluationResults);
      setLoadingc(true);
      const response = await fetch(`${serverUrl}/results/upload/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni: refreeID,
          email: refreeEmail,
          password: password,
          evaluation_id: evaluationDetails.id,
          results: parsedEvaluationResults,      
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Evaluation saved successfully!");
        saveResultsAsJSON();
      } else {
        const errorMessage = await response.text();
        Alert.alert("Error", `Failed to save evaluation: ${errorMessage}`);
        saveResultsAsJSON();
      }
    } catch (error) {
      console.error("Error saving evaluation:", error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoadingc(false);
    }
  };

  const saveResultsAsJSON = async () => {

    try {
      const evaluationResults = await AsyncStorage.getItem("evaluationResults");
      if (!evaluationResults) {
        console.error("No evaluation results found.");
        return;
      }
      const parsedEvaluationResults = JSON.parse(evaluationResults);
      const filePath = `${RNFS.DocumentDirectoryPath}/${folderName}/${fileName}.json`;
      await RNFS.writeFile(
        filePath,
        JSON.stringify(parsedEvaluationResults),
        "utf8"
      );
      Alert.alert("Success", "Evaluation results saved as JSON file!");
    } catch (error) {
      console.error("Error saving evaluation results:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while saving evaluation results."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Eco</Text>
      </View>
      {loading ? ( // Render loader if loading state is true
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loaderText}>{t("common:loading")}</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              flex: 1,
              backgroundColor: "#9FD1FF",
              paddingTop: 20,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: Platform.OS === "ios" ? 75 : 65,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 40,
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
                  {t("common:station")}: {evaluations.data.station_name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {t("common:subject")}: Medicina Interna
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  width: "25%",
                  borderRadius: 20,

                  height: 40,
                  alignItems: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={uploadEvaluation}
                style={{
                  width: "18%",
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
                >
                  {t("common:upload")}
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Folder Name"
                    value={folderName}
                    onChangeText={(text) => setFolderName(text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="File Name"
                    value={fileName}
                    onChangeText={(text) => setFileName(text)}
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      saveResultsAsJSON();
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <ScrollView>
              <View style={styles.tableRow}>
                <View style={styles.firstColumn}>
                  <Text style={styles.cellText}>ID</Text>
                </View>

                {tableHead.map((section) =>
                  section.map(({ questionNumber }) => (
                    <View style={styles.tableCell}>
                      <Text key={questionNumber} style={styles.cellText}>
                        {questionNumber}
                      </Text>
                    </View>
                  ))
                )}
              </View>

              {students.map((student) =>
                renderTableRow(student, parsedEvaluationResults)
              )}
            </ScrollView>
          </ScrollView>
        </>
      )}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  rowe: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  celle: {
    flex: 1,
    fontSize: 16,
  },

  tableRow: {
    flexDirection: "row",
    backgroundColor: "#BDD6FC",
  },
  firstColumn: {
    flex: 2,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  cellText: {
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "50%",
  },
  selectFolderButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  selectFolderButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  folderUriText: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#111F51",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
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
});
