import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";

const CompetitorsList = () => {

  const navigation = useNavigation();
  const [showMarkStatus, setShowMarkStatus] = useState(false);
  const [showCompetitorsStatus, setShowCompetitorsStatus] = useState(false);
  const [competitorsData, setCompetitorsData] = useState([]);
  const [studentScores, setStudentScores] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    loadDownloadedCompetitorData();
    loadStatus();
    fetchTotalScore();
    fetchSavedIds();
  }, []);

  const loadDownloadedCompetitorData = async () => {
    try {
      const downloadedData = await AsyncStorage.getItem(
        "downloadedCompetitorData"
      );
      if (downloadedData) {
        const parsedData = JSON.parse(downloadedData);
        console.log("Students:", parsedData);
        setCompetitorsData(parsedData.students);
      }
    } catch (error) {
      console.error("Error loading downloaded data:", error);
    }
  };

  const fetchTotalScore = async () => {
    try {
      const scores = await AsyncStorage.getItem("totalScores");
      if (scores) {
        console.log("Total Scores:", scores);
        const parsedScores = JSON.parse(scores);
        const scoresArray = Object.entries(parsedScores).map(
          ([studentId, score]) => ({
            studentId,
            score,
          })
        );
        setStudentScores(scoresArray);
      }
    } catch (error) {
      console.error("Error retrieving student scores:", error);
    }
  };
    
  const fetchSavedIds = async () => {
    try {
      const savedIdsJson = await AsyncStorage.getItem("uploadedResultIds");
      if (savedIdsJson) {
        console.log("uploaded ids:", savedIdsJson);
        const parsedSavedIds = JSON.parse(savedIdsJson);
        setSavedIds(parsedSavedIds);
      }
    } catch (error) {
      console.error("Error fetching saved IDs:", error);
    }
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

  const getStudentScore = (studentId) => {
    const score = studentScores.find(
      (score) => score.studentId.toString() === studentId.toString()
    );
    return score ? score.score : "-";
  };

  const renderTableHeader = () => (
    <View style={styles.row}>
      <Text style={styles.cell}>{t("common:status")}</Text>
      {showCompetitorsStatus && (
        <Text style={styles.cell}>{t("common:name")}</Text>
      )}
      {showMarkStatus && <Text style={styles.cell}>{t("common:score")}</Text>}
      <Text style={styles.cell}>{t("common:group")}</Text>
    </View>
  );

  const renderTableRow = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        {savedIds.includes(item.id.toString()) ? (
          <Feather name={"toggle-right"} size={25} color={"green"} />
        ) : (
          <Feather name={"toggle-left"} size={25} color={"grey"} />
        )}
      </View>

      {showCompetitorsStatus && (
        <Text style={styles.celli}>
          {item.first_name} {item.family_name}
        </Text>
      )}

      {showMarkStatus && (
        <Text style={styles.celli}>{getStudentScore(item.id)}</Text>
      )}

      <Text style={styles.celli}>{item.group}</Text>
    </View>
  );






  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {t("common:competlist")}
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          flex: 1,
          backgroundColor: "#9FD1FF",
          paddingTop: 20,
        }}
      >
        {renderTableHeader()}
        <FlatList
          data={competitorsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTableRow}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompetitorsList;

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
  celli: {
    flex: 1,
    fontSize: 16,
    color: "gray",
  },
});
