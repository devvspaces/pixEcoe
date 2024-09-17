import React from "react";
import { View, StyleSheet, Text } from "react-native";

const QuestionRow = ({ section }) => {

  return (
    <View style={styles.rowContainer}>
      {section.questions.map((question) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{question.questionnumber}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuestionRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    width: 40,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
});
