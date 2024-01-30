// Import necessary libraries and components
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const EcoTable = () => {
  
  const tableData = [
    {
      subject: "R1A01",
      answers: [
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
      ],
    },
    {
      subject: "R1A01",
      answers: [
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
        "b",
        "c",
        "d",
        "a",
      ],
    },
  ];

  return (
    <View style={styles.tableContainer}>
      {/* Table header */}
      <View style={styles.headerRow}>
        <View style={styles.firstColumn}>
          <Text style={styles.cellText}>Questions</Text>
        </View>
      </View>
      <View style={styles.headerRow}>
        <View style={styles.firstColumn}>
          <Text style={styles.cellText}>ID</Text>
        </View>
        
        <View style={styles.headerCell} />
        {Array.from({ length: 24 }, (_, index) => (
          <View key={index} style={styles.headerCell}>
            <Text style={styles.headerText}>{index + 1}</Text>
          </View>
        ))}
      </View>

      {/* Table content */}
      {tableData.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={styles.firstColumn}>
            <Text style={styles.cellText}>{item.subject}</Text>
          </View>
          {item.answers.map((answer, ansIndex) => (
            <View key={ansIndex} style={styles.tableCell}>
              <Text style={styles.cellText}>{answer}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: 0,
    padding: 3,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#92AAFF",
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  headerText: {
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
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
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderRightWidth: 1,
    borderRightColor: "#000",
    width: "60%",
  },
  cellText: {
    fontWeight: "bold",
  },
});

export default EcoTable;
