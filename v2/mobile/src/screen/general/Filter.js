import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants/theme";
import CustomHeader from "../../components/CustomHeader";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Filter = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
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
      alert(t("alert:filteralert"));
      console.log("Filtered competitor data saved successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving filtered competitor data:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader
        title={t("common:filt")}
        onBackPress={() => navigation.goBack()}
      />
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
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: COLORS.gray,
              }}
            >
              {evaluations.data.station_name}
            </Text>
          </View>

          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: COLORS.gray,
              }}
              placeholder=""
              value={groupWheel}
              onChangeText={(text) => setGroupWheel(text)}
            />
          </View>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 45,
              marginTop: 15,
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              filterCompetitorData();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                fontWeight: "400",
              }}
            >
              {t("common:save")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
