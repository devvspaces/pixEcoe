import React, { useState, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [groupWheel, setGroupWheel] = useState("");
  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });
  const [parsedDownloadedCompetitorData, setParsedDownloadedCompetitorData] =
    useState([]);
  const [filteredCompetitorData, setFilteredCompetitorData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadStoredValues();
      loadStoredInput();
    }, [])
  );

  const loadStoredValues = async () => {
    try {
      const downloadedData = await AsyncStorage.getItem(
        "downloadedEvaluationData"
      );

      const downloadedCompetitorDataString = await AsyncStorage.getItem(
        "downloadedCompetitorRawData"
      );
      const parsedData = downloadedCompetitorDataString
        ? JSON.parse(downloadedCompetitorDataString)
        : [];
      setParsedDownloadedCompetitorData(parsedData);
      console.log("Downloaded Competitor Data:", parsedData);
      if (downloadedData) {
        const parsedData = JSON.parse(downloadedData);
        setEvaluations(parsedData);
        // console.log("Downloaded Evaluation Data:", parsedData);
      }
    } catch (error) {
      console.error("Error loading downloaded data:", error);
    }
  };

  const loadStoredInput = async () => {
    try {
      const storedInput = await AsyncStorage.getItem("groupWheelInput");
      if (storedInput !== null) {
        setGroupWheel(storedInput);
      }
    } catch (error) {
      console.error("Error loading stored input:", error);
    }
  };

  const saveInput = async (value) => {
    try {
      await AsyncStorage.setItem("groupWheelInput", value);
      console.log("Input saved successfully.");
    } catch (error) {
      console.error("Error saving input:", error);
    }
  };

  const filterCompetitorData = async () => {
    saveInput(groupWheel);
    if (
      !parsedDownloadedCompetitorData ||
      !parsedDownloadedCompetitorData.students ||
      !Array.isArray(parsedDownloadedCompetitorData.students)
    ) {
      console.error("Competitor data is not in the expected format.");
      return;
    }

    let filteredData = parsedDownloadedCompetitorData.students;

    if (groupWheel.trim() !== "") {
      const keyword = groupWheel.trim().toLowerCase();
      filteredData = parsedDownloadedCompetitorData.students.filter((item) =>
        item.group.toLowerCase().includes(keyword)
      );
    }

    setFilteredCompetitorData(filteredData);

    const newData = {
      ...parsedDownloadedCompetitorData,
      students: filteredData,
    };

    try {
      await AsyncStorage.setItem(
        "downloadedCompetitorData",
        JSON.stringify(newData)
      );
      alert("Filter applied successfully");
      console.log("Filtered competitor data saved successfully.");

    } catch (error) {
      console.error("Error saving filtered competitor data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("common:filt")}</Text>
      </View>
      <View style={styles.content}>
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
              {t("common:cevaluate")}
            </Text>
            <View
              style={{
                height: 50,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                marginTop: 10,
                paddingLeft: 10,
                borderRadius: 10,
                width: "70%",
                justifyContent: "center",
              }}
            >
              <Text>{evaluations.data.station_name}</Text>
            </View>
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
              {t("common:gwheel")}
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder=""
              value={groupWheel}
              onChangeText={(text) => setGroupWheel(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#111F51",
            height: 50,
            width: "70%",
            borderRadius: 5,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            filterCompetitorData();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            {t("common:save")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Filter;

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
  inputBox: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    width: "70%",
  },
  
});
