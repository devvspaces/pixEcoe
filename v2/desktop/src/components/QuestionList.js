import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS } from "../constants/theme";
import Entypo from "react-native-vector-icons/Entypo";

const QuestionList = ({ section, handleAnswerSelection, selectedAnswers }) => {
  const [inputValues, setInputValues] = useState({});
  const [editingStates, setEditingStates] = useState({});

  useEffect(() => {
    // Populate inputValues with selectedAnswers
    const initialInputValues = {};
    const initialEditingStates = {};
    Object.keys(selectedAnswers).forEach((questionNumber) => {
      initialInputValues[questionNumber] = selectedAnswers[questionNumber];
      initialEditingStates[questionNumber] = !selectedAnswers[questionNumber];
    });
    setInputValues(initialInputValues);
    setEditingStates(initialEditingStates);
  }, [selectedAnswers]);

  const handleInputChange = (questionNumber, value, literal) => {
    // Update inputValues without saving yet
    if (literal === "$" && /^[a-zA-Z\s]*$/.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [questionNumber]: value,
      }));
    } else if (literal === "%" && /^[0-9]*$/.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [questionNumber]: value,
      }));
    }
  };

  const handleSave = (questionNumber) => {
    // Trigger the answer selection with the input value
    handleAnswerSelection(questionNumber, inputValues[questionNumber]);
    // Disable the input by setting the editing state to false
    setEditingStates((prev) => ({
      ...prev,
      [questionNumber]: false,
    }));
  };

  const enableEditing = (questionNumber) => {
    // Enable editing by setting the editing state to true
    setEditingStates((prev) => ({
      ...prev,
      [questionNumber]: true,
    }));
  };

  return (
    <View>
      <Text
        style={{
          color: "#111F51",
          fontSize: 20,
          fontWeight: "500",
          marginTop: 20,
        }}
      >
        {section.section}
      </Text>
      {section.questions.map((question) => (
        <View key={question.questionnumber}>
          <View
            style={{
              width: 45,
              height: 45,
              justifyContent: "center",
              marginTop: 30,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {question.questionnumber}
            </Text>
          </View>

          {Object.entries(question.answers).map(([answerNumber, answer]) => (
            <View key={answerNumber}>
              {answer.literal === "$" || answer.literal === "%" ? (
                <View>
                  <Text
                    style={{
                      color: "#111F51",
                      fontSize: 20,
                      fontWeight: "500",
                      marginBottom: 10,
                    }}
                  >
                    {answer.text1} | {answer.text2 ? `| ${answer.text2}` : ""}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <TextInput
                      style={{
                        borderColor: "#111F51",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        marginBottom: 20,
                        backgroundColor: "#ffffff",
                        flex: 1,
                        fontSize: 20,
                        height: 40,
                      }}
                      placeholder={
                        answer.literal === "$" ? "Enter text" : "Enter number"
                      }
                      keyboardType={
                        answer.literal === "%" ? "numeric" : "default"
                      }
                      value={inputValues[question.questionnumber] || ""}
                      onChangeText={(value) =>
                        handleInputChange(
                          question.questionnumber,
                          value,
                          answer.literal
                        )
                      }
                      editable={editingStates[question.questionnumber]} // Only editable if in editing mode
                    />

                    {/* Conditionally render Save or Edit button */}
                    {editingStates[question.questionnumber] ? (
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => handleSave(question.questionnumber)}
                      >
                        <Entypo name="check" size={24} color="green" />
                      </TouchableOpacity>
                    ) : inputValues[question.questionnumber] ? (
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => enableEditing(question.questionnumber)}
                      >
                        <Entypo name="edit" size={24} color="#111F51" />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: "100%",
                  }}
                  onPress={() =>
                    handleAnswerSelection(
                      question.questionnumber,
                      parseInt(answerNumber)
                    )
                  }
                >
                  <View
                    style={{
                      borderColor:
                        selectedAnswers[question.questionnumber] ===
                        parseInt(answerNumber)
                          ? "#14AE5C"
                          : "transparent",
                      borderWidth: 2,
                      borderRadius: 10,
                      padding: 10,
                      flexDirection: "row",
                      backgroundColor:
                        selectedAnswers[question.questionnumber] ===
                        parseInt(answerNumber)
                          ? "#14AE5C"
                          : "#ffffff",
                      opacity: 10,
                    }}
                  >
                    <View style={{ marginLeft: 20, width: "95%" }}>
                      <Text
                        style={{
                          color:
                            selectedAnswers[question.questionnumber] ===
                            parseInt(answerNumber)
                              ? "#FFFFFF"
                              : "#111F51",
                          fontSize: 20,
                          fontWeight: "500",
                          textAlign: "justify",
                        }}
                      >
                        {answer.text1} |
                        {answer.text2 ? `| ${answer.text2}` : ""}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default QuestionList;

const styles = StyleSheet.create({
  iconButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
