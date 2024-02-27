import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import DropdownSelector from "../components/DropdownSelector";
import PasswordModal from "../components/PasswordModal";
import DocumentPicker from "react-native-document-picker";
import { useTranslation } from "react-i18next";
import RNFS from "react-native-fs";
import Papa from "papaparse";
const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

const Setup = () => {
  const [evaluationOption, setEvaluationOption] = useState("api");
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);
  const [loadingd, setLoadingd] = useState(false);
  const loadingdRef = useRef(null);
  const [loadingc, setLoadingc] = useState(false);
  const loadingcRef = useRef(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [refreeID, setRefreeID] = useState("");
  const [refreeEmail, setRefreeEmail] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [password, setPassword] = useState("");
  const [evaluationOptions, setEvaluationOptions] = useState([]);
  const [evaluationDetails, setEvaluationDetails] = useState(null);
  const [competitorFile, setcompetitorFile] = useState([]);
  const [evaluationFile, setEvaluationFile] = useState([]);
  const [showMarkStatus, setShowMarkStatus] = useState(false);
  const [showCompetitorsStatus, setShowCompetitorsStatus] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {

    AsyncStorage.setItem("showmark", JSON.stringify({ status: false }));
    AsyncStorage.setItem("showcompetitors", JSON.stringify({ status: false }));

    const loadStoredValues = async () => {
      try {
        const storedRefreeID = await AsyncStorage.getItem("refreeID");
        const storedRefreeEmail = await AsyncStorage.getItem("refreeEmail");
        const storedServerUrl = await AsyncStorage.getItem("serverUrl");
        const storedSubjectId = await AsyncStorage.getItem("subjectId");
        const storedPassword = await AsyncStorage.getItem("password");
        const storedEvaluationDetails = await AsyncStorage.getItem(
          "EvaluationDetails"
        );
        setRefreeID(storedRefreeID || "");
        setRefreeEmail(storedRefreeEmail || "");
        setServerUrl(storedServerUrl || "");
        setSubjectId(storedSubjectId || "");
        setPassword(storedPassword || "");
        setEvaluationDetails(
          storedEvaluationDetails ? JSON.parse(storedEvaluationDetails) : null
        );
      } catch (error) {
        console.error("Error loading stored values:", error);
      }
    };

    loadStoredValues();

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

    loadStatus();
  }, []);

  const handlePasswordSubmit = async (enteredPassword) => {
    try {
      const storedPassword = await AsyncStorage.getItem("@appPassword");
      if (enteredPassword === storedPassword) {
        setPasswordModalVisible(false);
      } else {
        alert("Incorrect password. Try again.");
      }
    } catch (error) {
      console.error("Error retrieving stored password:", error);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordModalVisible(false);
  };

  useEffect(() => {
    if (evaluationDetails) {
      setPasswordModalVisible(true);
    }
  }, [evaluationDetails]);

  const storeInputValues = async () => {
    try {
      await AsyncStorage.setItem("refreeID", refreeID);
      await AsyncStorage.setItem("refreeEmail", refreeEmail);
      await AsyncStorage.setItem("serverUrl", serverUrl);
      await AsyncStorage.setItem("subjectId", subjectId);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.error("Error storing input values:", error);
    }
  };

  const handleCompetitorFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      setcompetitorFile(res);
     } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleEvaluationFile = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      setEvaluationFile(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleLoadEvaluation = async () => {
    try {
      if (!refreeID || !refreeEmail || !password || !serverUrl || !subjectId) {
        alert("Please fill in all required fields.");
        return;
      }
      setLoading(true);
      const response = await fetch(
        `${serverUrl}/evaluations/?subject=${subjectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dni: refreeID,
            email: refreeEmail,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvaluationOptions(
            data.map((option) => ({
              id: option.id,
              label: option.station_name,
            }))
          );
          alert("Evaluation loaded successfully");
          storeInputValues();
        } else {
          alert("Invalid response format. Please check your API.");
        }
      } else {
        alert(
          "Failed to load evaluation. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selectedOption, label) => {
    {
      console.log(`Selected ${label}:`, selectedOption);
      setSelectedEvaluation(selectedOption);
    }
  };

  const handleDownloadEvaluation = async () => {
    try {
      const evaluatedData = await AsyncStorage.getItem("evaluationResults");
      if (evaluatedData) {
        Alert.alert(
          "Evaluated data is found on the device",
          "Do you want to proceed with downloading the evaluation which will result in deletion of the existing data?",
          [
            {
              text: "Yes",
              onPress: async () => {
                await downloadEvaluation();
              },
            },
            {
              text: "No",
              style: "cancel",
            },
          ]
        );
      } else {
        await downloadEvaluation();
      }
    } catch (error) {
      console.error("Error during download evaluation:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const downloadEvaluation = async () => {
    try {
      setLoadingd(true);
      const response = await fetch(
        `${serverUrl}/evaluation/${selectedEvaluation.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dni: refreeID,
            email: refreeEmail,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem(
          "downloadedEvaluationData",
          JSON.stringify(data)
        );
        const evaluationDetails = {
          id: selectedEvaluation.id,
          name: selectedEvaluation.label,
        };
        await AsyncStorage.setItem(
          "EvaluationDetails",
          JSON.stringify(evaluationDetails)
        );
        console.log("Download Evaluation Response:", data);
        console.log("EvaluationDetails:", evaluationDetails);
        alert("Download successful");
        await AsyncStorage.removeItem("evaluationResults");
        await AsyncStorage.removeItem("totalScores");
        await AsyncStorage.removeItem("uploadedResultIds");
      } else {
        alert("Failed to download evaluation. Please try again.");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoadingd(false);
    }
  };

  const handleDownloadCompetitors = async () => {
    try {
      if (!selectedEvaluation) {
        alert("Please select an evaluation before downloading.");
        return;
      }
      setLoadingc(true);
      const response = await fetch(
        `${serverUrl}/students/?subject_id=${subjectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dni: refreeID,
            email: refreeEmail,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem(
          "downloadedCompetitorData",
          JSON.stringify(data)
        );
        await AsyncStorage.setItem(
          "downloadedCompetitorRawData",
          JSON.stringify(data)
        );
        console.log("Downloaded Competitor Response:", data);
        alert("Download successful");
      } else {
        alert("Failed to download competitor. Please try again.");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoadingc(false);
    }
  };

  const handleLoadCompetitorData = async () => {
    try {
      if (!competitorFile) {
        Alert.alert("Error", "Please select a CSV file.");
        return;
      }
      const uri = competitorFile[0].uri;
      const fileContent = await RNFS.readFile(uri, "utf8");
      console.log("CSV File Content:", fileContent);
      const parsedData = Papa.parse(fileContent, { header: true }).data;

      // await AsyncStorage.setItem(
      //   "downloadedCompetitorData",
      //   JSON.stringify(parsedData)
      // );
      // await AsyncStorage.setItem(
      //   "downloadedCompetitorRawData",
      //   JSON.stringify(parsedData)
      // );

      const jsonData = {
        students: parsedData.map((student, index) => ({
          id: index + 1,
          family_name: student.FAMILY_NAME,
          first_name: student.FIRST_NAME,
          group: student.GROUP,
        })),
      };
      await AsyncStorage.setItem(
        "downloadedCompetitorData",
        JSON.stringify(jsonData)
      );
      await AsyncStorage.setItem(
        "downloadedCompetitorRawData",
        JSON.stringify(jsonData)
      );
       console.log("JSON Data:", jsonData);
      Alert.alert("Success", "CSV student data loaded successfully");
    } catch (error) {
      console.error("Error loading student data:", error);
      Alert.alert("Error", "An error occurred while loading student data.");
    }
  };

  const handleLocalDownloadEvaluation = async () => {
    try {
      const evaluatedData = await AsyncStorage.getItem("evaluationResults");
      if (evaluatedData) {
        Alert.alert(
          "Evaluated data is found on the device",
          "Do you want to proceed with downloading the evaluation which will result in deletion of the existing data?",
          [
            {
              text: "Yes",
              onPress: async () => {
                await handleLoadEvaluationData();
              },
            },
            {
              text: "No",
              style: "cancel",
            },
          ]
        );
      } else {
        await handleLoadEvaluationData();
      }
    } catch (error) {
      console.error("Error during download evaluation:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleLoadEvaluationData = async () => {
    if (!evaluationFile.length) {
      alert("Please select an evaluation file.");
      return;
    }
    try {
      const uri = evaluationFile[0].uri;
      const res = await RNFS.readFile(uri, "utf8");
      console.log(res);
      const data = JSON.parse(res);
      await AsyncStorage.setItem(
        "downloadedEvaluationData",
        JSON.stringify(data)
      );
      const { station_name, station_number } = data.data;
      const evaluationDetails = { station_name, station_number };
      await AsyncStorage.setItem(
        "EvaluationDetails",
        JSON.stringify(evaluationDetails)
      );
      console.log("EvaluationDetails:", evaluationDetails);
      alert("Data loaded successfully");
      await AsyncStorage.removeItem("evaluationResults");
      await AsyncStorage.removeItem("totalScores");
      await AsyncStorage.removeItem("uploadedResultIds");
    }catch (error) {
      console.error("Error loading evaluation data:", error);
      alert("An error occurred while loading evaluation data.");
    }
  };

  const toggleStatus = async (item) => {
    try {
      const statusData = await AsyncStorage.getItem(item);
      if (statusData) {
        const status = JSON.parse(statusData).status;
        console.log(`Current status of ${item}:`, status);
        await AsyncStorage.setItem(item, JSON.stringify({ status: !status }));
        console.log(`New status of ${item}:`, !status);
        if (item === "showmark") {
          setShowMarkStatus(!status);
        } else if (item === "showcompetitors") {
          setShowCompetitorsStatus(!status);
        }
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={{ backgroundColor: "#111F51" }} />
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
          {t("common:setupt")}
        </Text>
      </View>
      <ScrollView
        style={{
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
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={
              evaluationOption === "api"
                ? styles.activeOption
                : styles.inactiveOption
            }
            onPress={() => setEvaluationOption("api")}
          >
            <Text
              style={
                evaluationOption === "api"
                  ? styles.activeOptionText
                  : styles.inactiveOptionText
              }
            >
              {t("common:setupapi")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              evaluationOption === "approot"
                ? styles.activeOption
                : styles.inactiveOption
            }
            onPress={() => setEvaluationOption("approot")}
          >
            <Text
              style={
                evaluationOption === "approot"
                  ? styles.activeOptionText
                  : styles.inactiveOptionText
              }
            >
              {t("common:setuproot")}
            </Text>
          </TouchableOpacity>
        </View>
        <PasswordModal
          isVisible={isPasswordModalVisible}
          onPasswordSubmit={handlePasswordSubmit}
          onCancel={handlePasswordCancel}
        />
        {evaluationOption === "api" && (
          <View
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              flex: 1,
              backgroundColor: "#9FD1FF",
            }}
          >
            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "300",
                    marginTop: 10,
                  }}
                >
                  {t("common:refreeid")}
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder=""
                  value={refreeID}
                  onChangeText={(text) => setRefreeID(text)}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "300",
                    marginTop: 20,
                  }}
                >
                  {t("common:refreemail")} (License)
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder=""
                  value={refreeEmail}
                  onChangeText={(text) => setRefreeEmail(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 35,
                    width: "25%",
                    borderWidth: 1,
                    borderColor: "#111F51",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() => toggleStatus("showmark")}
                >
                  <Text>{t("common:showm")}</Text>
                  <Fontisto
                    name={
                      showMarkStatus ? "checkbox-active" : "checkbox-passive"
                    }
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 35,
                    width: "35%",
                    marginLeft: 20,
                    borderWidth: 1,
                    borderColor: "#111F51",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                  onPress={() => toggleStatus("showcompetitors")}
                >
                  <Text>{t("common:showc")}</Text>
                  <Fontisto
                    name={
                      showCompetitorsStatus
                        ? "checkbox-active"
                        : "checkbox-passive"
                    }
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                color: "#111F51",
                fontSize: 19,
                fontWeight: "500",
                marginTop: 20,
              }}
            >
              {t("common:webserver")}
            </Text>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "300",
                    marginTop: 10,
                  }}
                >
                  {t("common:urladdress")}
                </Text>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: "#FFFFFF",
                    borderWidth: 1,
                    marginTop: 10,
                    paddingLeft: 10,
                    borderRadius: 10,
                    width: "100%",
                  }}
                  placeholder=""
                  value={serverUrl}
                  onChangeText={(text) => setServerUrl(text)}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    fontWeight: "300",
                    marginTop: 20,
                  }}
                >
                  {t("common:subjectid")}
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder=""
                  value={subjectId}
                  onChangeText={(text) => setSubjectId(text)}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    fontWeight: "300",
                    marginTop: 20,
                  }}
                >
                  {t("common:pass")}
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder=""
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <DropdownSelector
                  label={t("common:evalua")}
                  placeholderLabel={t("common:select")}
                  options={evaluationOptions}
                  onSelect={(selectedOption) => {
                    handleSelect(selectedOption, "Evaluation");
                    setSelectedEvaluation(selectedOption);
                  }}
                />
                <TouchableOpacity
                  onPress={handleLoadEvaluation}
                  style={{
                    backgroundColor: "#111F51",
                    height: 50,
                    width: "25%",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}
                  >
                    {t("common:loadev")}
                  </Text>
                  {loading && (
                    <ActivityIndicator
                      ref={loadingRef}
                      style={{ marginLeft: 10 }}
                      size="small"
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={handleDownloadEvaluation}
                style={{
                  height: 60,
                  backgroundColor: "#111F51",
                  marginTop: 20,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45%",
                }}
              >
                <SimpleLineIcons
                  name={"cloud-download"}
                  size={35}
                  color="#FFFFFF"
                />
                <Text
                  style={{ fontSize: 13, color: "#ffffff", marginLeft: 15 }}
                >
                  {t("common:downloadev")}
                </Text>
                {loadingd && (
                  <ActivityIndicator
                    ref={loadingdRef}
                    style={{ marginLeft: 10 }}
                    size="small"
                    color="#fff"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDownloadCompetitors}
                style={{
                  height: 60,
                  backgroundColor: "#111F51",
                  marginTop: 20,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45%",
                }}
              >
                <SimpleLineIcons
                  name={"cloud-download"}
                  size={35}
                  color="#FFFFFF"
                />
                <Text
                  style={{ fontSize: 13, color: "#ffffff", marginLeft: 15 }}
                >
                  {t("common:downloadcomp")}
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
          </View>
        )}
        {evaluationOption === "approot" && (
          <View
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              flex: 1,
              backgroundColor: "#9FD1FF",
            }}
          >
            <Text
              style={{
                color: "#111F51",
                fontSize: 19,
                fontWeight: "500",
                marginTop: 20,
              }}
            >
              {t("common:setuproot")}
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              {t("common:rootsubtitle")}
            </Text>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "300",
                  marginTop: 10,
                }}
              >
                {t("common:rootcomp")}
              </Text>

              <TouchableOpacity
                style={{
                  height: 50,
                  borderColor: "#FFFFFF",
                  borderWidth: 1,
                  marginTop: 10,
                  paddingLeft: 10,
                  borderRadius: 10,
                  width: "100%",
                  justifyContent: "center",
                }}
                onPress={handleCompetitorFile}
              >
                {competitorFile.map((file, index) => (
                  <Text
                    key={index.toString()}
                    style={styles.uri}
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                  >
                    {file?.uri}
                  </Text>
                ))}
              </TouchableOpacity>
              <Text
                style={{
                  color: "#000",
                  fontSize: 13,
                  fontWeight: "300",
                  marginTop: 4,
                }}
              >
                {t("common:rootcompinf")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLoadCompetitorData}
              style={{
                backgroundColor: "#111F51",
                height: 50,
                width: 170,
                borderRadius: 5,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
                {t("common:dataload")}
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "300",
                  marginTop: 10,
                }}
              >
                {t("common:rooteva")}
              </Text>
              <TouchableOpacity
                onPress={handleEvaluationFile}
                style={{
                  height: 50,
                  borderColor: "#FFFFFF",
                  borderWidth: 1,
                  marginTop: 10,
                  paddingLeft: 10,
                  borderRadius: 10,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {evaluationFile.map((file, index) => (
                  <Text
                    key={index.toString()}
                    style={styles.uri}
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                  >
                    {file?.uri}
                  </Text>
                ))}
              </TouchableOpacity>
              <Text
                style={{
                  color: "#000",
                  fontSize: 13,
                  fontWeight: "300",
                  marginTop: 4,
                }}
              >
                {t("common:rootevainf")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLocalDownloadEvaluation}
              style={{
                backgroundColor: "#111F51",
                height: 50,
                width: 170,
                borderRadius: 5,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
                {t("common:dataload")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
  inputBox: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    width: "70%",
  },
  activeOption: {
    alignItems: "center",
    backgroundColor: "#111F51",
    height: 60,
    justifyContent: "center",
    borderRadius: 10,
    width: cardWidth,
  },
  inactiveOption: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    height: 60,
    borderRadius: 10,
    width: cardWidth,
  },
  activeOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
  },
  inactiveOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  },
  optionBar: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
    backgroundColor: "#9FD1FF",
  },
});
