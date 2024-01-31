import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Eco = () => {
  const navigation = useNavigation();

  const [evaluationDetails, setEvaluationDetails] = useState(null);
  const [downloadedCompetitorData, setDownloadedCompetitorData] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluationDetailsString = await AsyncStorage.getItem(
          "EvaluationDetails"
        );
        const parsedEvaluationDetails = evaluationDetailsString
          ? JSON.parse(evaluationDetailsString)
          : null;
        setEvaluationDetails(parsedEvaluationDetails);
        console.log("EvaluationDetails:", parsedEvaluationDetails);

        const downloadedCompetitorDataString = await AsyncStorage.getItem(
          "downloadedCompetitorData"
        );
        const parsedDownloadedCompetitorData = downloadedCompetitorDataString
          ? JSON.parse(downloadedCompetitorDataString)
          : null;
        setDownloadedCompetitorData(parsedDownloadedCompetitorData);
        console.log(
          "Downloaded Competitor Data:",
          parsedDownloadedCompetitorData
        );
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const [evaluations, setEvaluations] = useState({ data: { detail: {} } });

  useEffect(() => {
    loadDownloadedEvaluationData();
  }, []);

  const loadDownloadedEvaluationData = async () => {
    try {
      const downloadedData = await AsyncStorage.getItem(
        "downloadedEvaluationData"
      );
      if (downloadedData) {
        const parsedData = JSON.parse(downloadedData);
        setEvaluations(parsedData);
        console.log("Downloaded Evaluation Data:", parsedData);
      }
    } catch (error) {
      console.error("Error loading downloaded data:", error);
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

  const tableHead = sections.map((section) =>
    section.questions.map((question) => ({
      questionNumber: question.questionnumber,
      section: section.section,
    }))
  );

  const students = downloadedCompetitorData
    ? downloadedCompetitorData.students
    : [];

  const renderTableCell = (questionNumber, student) => {
    const cellData = student[questionNumber] || "";
    return (
      <View key={`${questionNumber}-${student.group}`} style={styles.tableCell}>
        <Text style={styles.cellText}>{cellData}</Text>
      </View>
    );
  };

  // Function to render each row in the table
  const renderTableRow = (student) => (
    <TouchableOpacity
      key={student.group}
      style={styles.tableRow}
      onPress={() =>
        navigation.navigate("evalutaionProcess", { studentId: student.id })
      }
    >
      <View style={styles.firstColumn}>
        <Text style={styles.cellText}>{student.group}</Text>
      </View>

      {tableHead.map((section) =>
        section.map(({ questionNumber }) =>
          renderTableCell(questionNumber, student)
        )
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Eco</Text>
      </View>
      <ScrollView
        style={{
          paddingLeft: 40,
          paddingRight: 40,
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
              Station: {evaluations.data.station_name}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Subject: Medicina Interna
            </Text>
          </View>
        </View>

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

        {students.map((student) => renderTableRow(student))}
      </ScrollView>
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
    width: "60%",
  },
  cellText: {
    fontWeight: "bold",
  },
});
