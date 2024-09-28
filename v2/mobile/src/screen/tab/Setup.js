import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { COLORS } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import TabCustomHeader from "../../components/TabCustomHeader";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNFS from "react-native-fs";
import Papa from "papaparse";
import DocumentPicker from "react-native-document-picker";
import PasswordModal from "../../components/PasswordModal";
import DropdownSelector from "../../components/DropdownSelector";
import { showError, showSuccess } from "../../utils/helperFunction";

const Setup = () => {

  const navigation = useNavigation();
  const { t } = useTranslation();
  const [evaluationOption, setEvaluationOption] = useState("api");
  const [showMarkStatus, setShowMarkStatus] = useState(false);
  const [showCompetitorsStatus, setShowCompetitorsStatus] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
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
  const [localLoading, setLocalLoading] = useState(false);
  const localLoadingRef = useRef(null);
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
        showSuccess(t("alert:alert1"));
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

  const [passwordState, setPasswordState] = useState({
    password: "",
    isSecure: true,
  });

  const updatePassword = (password) => {
    setPasswordState((prevState) => ({ ...prevState, password }));
  };

  const handlePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordState((prevState) => ({
        ...prevState,
        isSecure: !prevState.isSecure,
      }));
    }
  };

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
      if (
        !refreeID ||
        !refreeEmail ||
        !password ||
        !serverUrl ||
        !subjectId
      ) {
        showError(t("alert:alert2"));
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
          showSuccess(t("alert:loadstation"));
          storeInputValues();
        } else {
          showError(t("alert:alert3"));
        }
      } else {
        showError(t("alert:loaderrorstation"));
      }
    } catch (error) {
      console.log(error);
      showError(t("alert:alert4"));
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
    if (!selectedEvaluation) {
      showError(t("alert:alert12"));
      return;
    }
    try {
      const evaluatedData = await AsyncStorage.getItem("evaluationResults");
      if (evaluatedData) {
        Alert.alert(t("alert:datatext1"), t("alert:datatext2"), [
          {
            text: t("alert:yes"),
            onPress: async () => {
              await downloadEvaluation();
            },
          },
          {
            text: t("alert:no"),
            style: "cancel",
          },
        ]);
      } else {
        await downloadEvaluation();
      }
    } catch (error) {
      console.error("Error during download evaluation:", error);
      showError(t("alert:alert4"));
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
        showSuccess(t("alert:loadonestation"));
        await AsyncStorage.removeItem("evaluationResults");
        await AsyncStorage.removeItem("totalScores");
        await AsyncStorage.removeItem("uploadedResultIds");
      } else {
        showError(t("alert:alert5"));
      }
    } catch (error) {
      console.log("Error during API request:", error);
      showError(t("alert:alert4"));
    } finally {
      setLoadingd(false);
    }
  };

  const handleDownloadCompetitors = async () => {
    try {
      if (!selectedEvaluation) {
        showError(t("alert:alert6"));
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
        showSuccess(t("alert:loadstudent"));
      } else {
        showError(t("alert:alert7"));
      }
    } catch (error) {
      console.error("Error during API request:", error);
      showError(t("alert:alert4"));
    } finally {
      setLoadingc(false);
    }
  };
    
  const initiateDataLoad = async () => {
    try {
      // Initiate the competitor data load
      setLocalLoading(true)
      await handleLoadCompetitorData();
      // After competitor data load is complete, initiate the evaluation data load
      await handleLocalDownloadEvaluation();
      showSuccess(t("alert:alert13"));
      setLocalLoading(false);
    } catch (error) {
      showError(t("alert:alert8"));
      setLocalLoading(false)
    }
  };

  const handleLoadCompetitorData = async () => {
    try {
      if (!competitorFile) {
        showError(t("alert:alert9"));
        return;
      }
      const uri = competitorFile[0].uri;
      const fileContent = await RNFS.readFile(uri, "utf8");
      console.log("CSV File Content:", fileContent);
      const parsedData = Papa.parse(fileContent, { header: true }).data;

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
      showSuccess(t("alert:loadstudent"));
    } catch (error) {
      console.error("Error loading student data:", error);
      showError(t("alert:alert10"));
    }
  };

  const handleLocalDownloadEvaluation = async () => {
    try {
      const evaluatedData = await AsyncStorage.getItem("evaluationResults");
      if (evaluatedData) {
        Alert.alert(t("alert:datatext1"), t("alert:datatext2"), [
          {
            text: t("alert:yes"),
            onPress: async () => {
              await handleLoadEvaluationData();
            },
          },
          {
            text: t("alert:no"),
            style: "cancel",
          },
        ]);
      } else {
        await handleLoadEvaluationData();
      }
    } catch (error) {
      console.error("Error during download evaluation:", error);
      showError(t("alert:alert4"));
    }
  };

  const handleLoadEvaluationData = async () => {
    if (!evaluationFile.length) {
      showError(t("alert:alert11"));
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
      const transformedDetails = {
        id: station_number,
        name: station_name.trim(),
      };
      await AsyncStorage.setItem(
        "EvaluationDetails",
        JSON.stringify(transformedDetails)
      );
      console.log("EvaluationDetails:", evaluationDetails);
      showSuccess(t("alert:loadonestation"));
      await AsyncStorage.removeItem("evaluationResults");
      await AsyncStorage.removeItem("totalScores");
      await AsyncStorage.removeItem("uploadedResultIds");
    } catch (error) {
      console.error("Error loading evaluation data:", error);
      showError("An error occurred while loading evaluation data.");
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
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <TabCustomHeader title={t("common:setupt")} />

      {/* screen content */}
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.mainBlue,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: COLORS.AltBlue,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{ width: "50%", alignItems: "center" }}
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
            style={{ width: "50%", alignItems: "center" }}
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
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS.mainBlue,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: Platform.OS === "ios" ? 75 : 65,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
              {t("common:evaluator")}
            </Text>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.grey,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <View
                style={{
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:refreeid")}
                  value={refreeID}
                  onChangeText={(text) => setRefreeID(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View
                style={{
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:refreemail")}
                  value={refreeEmail}
                  onChangeText={(text) => setRefreeEmail(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => toggleStatus("showmark")}
                >
                  <MaterialIcons
                    name={
                      showMarkStatus ? "check-box" : "check-box-outline-blank"
                    }
                    size={25}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.primary,
                      marginLeft: 10,
                    }}
                  >
                    {t("common:showm")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => toggleStatus("showcompetitors")}
                >
                  <MaterialIcons
                    name={
                      showCompetitorsStatus
                        ? "check-box"
                        : "check-box-outline-blank"
                    }
                    size={25}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.primary,
                      marginLeft: 10,
                    }}
                  >
                    {t("common:showc")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
              {t("common:webserver")}
            </Text>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.grey,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <View
                style={{
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:urladdress")}
                  value={serverUrl}
                  onChangeText={(text) => setServerUrl(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View
                style={{
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:subjectid")}
                  value={subjectId}
                  onChangeText={(text) => setSubjectId(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    height: 60,
                    width: "100%",
                    borderRadius: 10,
                    borderColor: COLORS.grey,
                    borderWidth: 2,
                    justifyContent: "space-between",
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    style={{ flex: 1, fontSize: 20 }}
                    secureTextEntry={passwordState.isSecure}
                    // onChangeText={updatePassword}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    onPress={() => handlePasswordVisibility("password")}
                  >
                    <MaterialCommunityIcons
                      name={
                        passwordState.isSecure
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={22}
                      color={COLORS.gray}
                    />
                  </Pressable>
                </View>

                <DropdownSelector
                  label={t("common:evalua")}
                  placeholderLabel={t("common:select")}
                  options={evaluationOptions}
                  onSelect={(selectedOption) => {
                    handleSelect(selectedOption, "Evaluation");
                    setSelectedEvaluation(selectedOption);
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={handleLoadEvaluation}
                style={{
                  width: "100%",
                  height: 45,
                  marginTop: 15,
                  backgroundColor: COLORS.AltBlue,
                  borderRadius: 8,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.primary,
                }}
              >
                {!!loading ? (
                  <ActivityIndicator
                    style={{ marginLeft: 10 }}
                    size="small"
                    color="#fff"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.primary,
                      fontWeight: "600",
                    }}
                  >
                    {t("common:loadev")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleDownloadEvaluation}
              style={{
                width: "100%",
                height: 55,
                backgroundColor: COLORS.primary,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {!!loadingd ? (
                <ActivityIndicator
                  style={{ marginLeft: 10 }}
                  size="small"
                  color="#fff"
                />
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Feather name={"download"} size={22} color={COLORS.white} />
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 19,
                      fontWeight: "600",
                      marginLeft: 5,
                    }}
                  >
                    {t("common:downloadev")}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDownloadCompetitors}
              style={{
                width: "100%",
                height: 55,
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}
            >
              {!!loadingc ? (
                <ActivityIndicator
                  ref={loadingcRef}
                  style={{ marginLeft: 10 }}
                  size="small"
                  color={COLORS.primary}
                />
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Feather name={"download"} size={22} color={COLORS.primary} />
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 19,
                      fontWeight: "600",
                      marginLeft: 5,
                    }}
                  >
                    {t("common:downloadcomp")}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        )}
        {evaluationOption === "approot" && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS.mainBlue,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: Platform.OS === "ios" ? 75 : 65,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
              {t("common:setuproot")}
            </Text>

            <Text style={{ fontSize: 16, fontWeight: "400", marginTop: 10 }}>
              {t("common:rootsubtitle")}
            </Text>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.grey,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleCompetitorFile}
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                {competitorFile.length > 0 ? (
                  competitorFile.map((file, index) => (
                    <Text
                      key={index.toString()}
                      style={styles.uri}
                      numberOfLines={1}
                      ellipsizeMode={"middle"}
                    >
                      {file?.uri}
                    </Text>
                  ))
                ) : (
                  <Text style={{ fontSize: 16, color: COLORS.gray }}>
                    {t("common:rootcomp")}
                  </Text>
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 10,
                  color: COLORS.gray,
                }}
              >
                {t("common:rootcompinf")}
              </Text>
              <TouchableOpacity
                onPress={handleEvaluationFile}
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                {evaluationFile.length > 0 ? (
                  evaluationFile.map((file, index) => (
                    <Text
                      key={index.toString()}
                      style={styles.uri}
                      numberOfLines={1}
                      ellipsizeMode={"middle"}
                    >
                      {file?.uri}
                    </Text>
                  ))
                ) : (
                  <Text style={{ fontSize: 16, color: COLORS.gray }}>
                    {t("common:rooteva")}
                  </Text>
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 10,
                  color: COLORS.gray,
                }}
              >
                {t("common:rootevainf")}
              </Text>
              <TouchableOpacity
                onPress={initiateDataLoad}
                style={{
                  width: "100%",
                  height: 45,
                  marginTop: 15,
                  backgroundColor: COLORS.AltBlue,
                  borderRadius: 8,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.primary,
                    fontWeight: "600",
                  }}
                >
                  {t("common:dataload")}
                </Text>
                {localLoading && (
                  <ActivityIndicator
                    ref={localLoadingRef}
                    style={{ marginLeft: 10 }}
                    size="small"
                    color="#fff"
                  />
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Setup;

const styles = StyleSheet.create({
  activeOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    justifyContent: "center",
  },
  inactiveOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#49454F",
    justifyContent: "center",
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
    width: "80%",
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
  modalTitle: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 10,
    marginTop: 10,
    marginBottom:20
  },
});
