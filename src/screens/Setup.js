import React, { useState, useRef, useEffect } from "react";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import DropdownSelector from "../components/DropdownSelector";
import PasswordModal from "../components/PasswordModal";
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

  useEffect(() => {
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
      if (!selectedEvaluation) {
        alert("Please select an evaluation before downloading.");
        return;
      }
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
      const response = await fetch(`${serverUrl}/students/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni: refreeID,
          email: refreeEmail,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem(
          "downloadedCompetitorData",
          JSON.stringify(data)
        );
        console.log("Download Competitor Response:", data);
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
          Setup
        </Text>
      </View>
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
            APi Authentication
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
            App Root
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
                Referee ID
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
                Referee Email (License)
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder=""
                value={refreeEmail}
                onChangeText={(text) => setRefreeEmail(text)}
              />
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
            Web Server Access
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
                URL Address
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
                Subject ID
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
                Password
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
                label="Evaluations"
                placeholderLabel="Select"
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
                  Load Evaluation
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
              <Text style={{ fontSize: 13, color: "#ffffff", marginLeft: 15 }}>
                Download Evaluation
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
              <Text style={{ fontSize: 13, color: "#ffffff", marginLeft: 15 }}>
                Download Competitors
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
            App Root
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              fontWeight: "300",
              marginTop: 10,
            }}
          >
            Base Folder: file:///data/user/0/com.apisoftware.EcoeApp/ This is
            the starting point to access the data folder
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
              Directory
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
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              The director path relative to the base folder where the required
              files are stored and synchronized using any measures.
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Competitors (CSV)
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
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              This is the name of the csv file that contains the competitors
              data
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Evaluation (JSON)
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
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              This is the name of the file that contains the data for the
              evaluation.
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              Answers (CSV)
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
              // value={refreeID}
              // onChangeText={(text) => setRefreeID(text)}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                fontWeight: "300",
                marginTop: 4,
              }}
            >
              This is file name where the results of the evaluation will be
              stored to be processed externally.
            </Text>
          </View>
          <TouchableOpacity
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
              Load Data
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
