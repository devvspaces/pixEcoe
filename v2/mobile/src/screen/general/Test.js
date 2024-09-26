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
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../../constants/theme";
import CustomHeader from "../../components/CustomHeader";
import { useTranslation } from "react-i18next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import { PermissionsAndroid } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Test = () => {

    const navigation = useNavigation();
    const loadingcRef = useRef(null);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [serverUrl, setServerUrl] = useState("");
    const [refreeID, setRefreeID] = useState("");
    const [refreeEmail, setRefreeEmail] = useState("");
    const [password, setPassword] = useState("");
    const [evaluationDetails, setEvaluationDetails] = useState(null);
    const [downloadedCompetitorData, setDownloadedCompetitorData] =
      useState(null);
    const [loadingc, setLoadingc] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [fileName, setFileName] = useState("");
    const [parsedEvaluationResults, setParsedEvaluationResults] = useState([]);
    const [storagePermissionGranted, setStoragePermissionGranted] =
      useState(false);

    useFocusEffect(
      React.useCallback(() => {
        loadDownloadedEvaluationData();
        loadStoredValues();
      }, [])
    );

    useEffect(() => {
      requestStoragePermission();
    }, []);

    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "This app requires storage permission to save files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Storage permission granted");
          setStoragePermissionGranted(true);
        } else {
          console.log("Storage permission denied");
          setStoragePermissionGranted(false);
        }
      } catch (err) {
        console.warn("Error requesting storage permission:", err);
      }
    };

    const loadStoredValues = async () => {
      setLoading(true);
      try {
        const storedRefreeID = await AsyncStorage.getItem("refreeID");
        const storedRefreeEmail = await AsyncStorage.getItem("refreeEmail");
        const storedServerUrl = await AsyncStorage.getItem("serverUrl");
        const storedPassword = await AsyncStorage.getItem("password");
        const evaluationResults = await AsyncStorage.getItem(
          "evaluationResults"
        );
        const EvalvaluationResults = JSON.parse(evaluationResults);
        const downloadedCompetitorDataString = await AsyncStorage.getItem(
          "downloadedCompetitorData"
        );

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
        const downloadedData = await AsyncStorage.getItem(
          "downloadedEvaluationData"
        );
        if (downloadedData) {
          const parsedData = JSON.parse(downloadedData);
          setEvaluations(parsedData);
        }
      } catch (error) {
        console.error("Error loading downloaded data:", error);
      }
    };

    const [evaluations, setEvaluations] = useState({ data: { detail: {} } });
    console.log(evaluations.data);
    const detail =
      evaluations.data && evaluations.data.detail
        ? evaluations.data.detail
        : {};

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
        <View
          key={`${questionNumber}-${student.group}`}
          style={styles.tableCell}
        >
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
            studentDi: student.id,
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
        console.log("Evaluation results.", parsedEvaluationResults);
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

        const responseData = await response.json();
        console.log("API Response:", responseData);

        if (response.ok) {
          const evaluationResultIds = Object.keys(parsedEvaluationResults);
          console.log("Evaluation result IDs:", evaluationResultIds);
          await AsyncStorage.setItem(
            "uploadedResultIds",
            JSON.stringify(evaluationResultIds)
          );
        }
        setModalVisible(true);
      } catch (error) {
        console.error("Error saving evaluation:", error);
        setTimeout(() => {
          Alert.alert("Error", "An unexpected error occurred", [
            {
              text: "Save as JSON",
              onPress: () => setModalVisible(true),
            },
          ]);
        }, 1000);
      } finally {
        setLoadingc(false);
      }
    };

    const checkAndSetModalVisibility = async () => {
      const permissionGranted = await requestStoragePermission();
      if (permissionGranted) {
        setModalVisible(true);
      } else {
        // Handle case where permission is not granted
        Alert.alert(
          "Permission Required",
          "Please grant permission to access storage to continue.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    };

    const saveResultsAsJSON = async () => {
      try {
        const evaluationResults = await AsyncStorage.getItem(
          "evaluationResults"
        );
        if (!evaluationResults) {
          console.error("No evaluation results found.");
          return;
        }
        const parsedEvaluationResults = JSON.parse(evaluationResults);
        const folderPath = `${RNFS.DownloadDirectoryPath}/${folderName}`;
        await RNFS.mkdir(folderPath);
        const filePath = `${folderPath}/${fileName}.json`;
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

    if (loading) {
      return (
        <View
          style={{
            height: "100%",
            backgroundColor: COLORS.mainBlue,
            alignSelf: "center",
            width:'100%',
            justifyContent:'center',
            alignItems:'center'
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
          <TouchableOpacity onPress={uploadEvaluation}>
            {!!loadingc ? (
              <ActivityIndicator
                ref={loadingcRef}
                style={{ marginLeft: 10 }}
                size="small"
                color="#fff"
              />
            ) : (
              <Ionicons
                name={"cloud-upload-outline"}
                size={30}
                color={COLORS.white}
                style={{ position: "left" }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.mainBlue,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 75 : 65,
        }}
      >
        
          <>
            <View
              style={{
                justifyContent: "space-between",
                borderRadius: 10,
                backgroundColor: COLORS.AltBlue,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 20,
                width: "100%",
                height: 90,
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                {t("common:station")}: {evaluations.data.station_name}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                {t("common:subject")}: Medicina Interna
              </Text>
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

            <ScrollView
                style={{
                  flex: 1,
                  backgroundColor: COLORS.white,
                  borderRadius:10,
                  marginTop:10,
                  padding:5
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.tableRow}>
                    <View style={[styles.firstColumn, { width: 80 }]}>
                      <Text style={styles.cellText}>ID</Text>
                    </View>

                    {tableHead.map((section) =>
                      section.map(({ questionNumber }) => (
                        <View style={[styles.tableCell, { width: 50 }]}>
                          <Text key={questionNumber} style={styles.cellText}>
                            {questionNumber}
                          </Text>
                        </View>
                      ))
                    )}
                  </View>

                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {students.map((student) =>
                      renderTableRow(student, parsedEvaluationResults)
                    )}
                  </ScrollView>
                </View>
            </ScrollView>
          </>
       
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
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    width: 50,
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
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
  },
  loaderText: {
    marginTop: 30,
    fontSize: 16,
    color: "#fff",
  },
  headert: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor:COLORS.primary,
    justifyContent:'space-between'
  },
  titlet: {
    color: COLORS.white,
    fontSize: 20,
    marginLeft: 10,
  },
});
