import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { COLORS } from "../constants/theme";

const QuestionList = ({ section, handleAnswerSelection, selectedAnswers }) => {
  
  const { t } = useTranslation();
  
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
          {/* map the answer array */}

          {Object.entries(question.answers).map(([answerNumber, answer]) => (
            <TouchableOpacity
              style={{
                width: "100%",
              }}
              key={answerNumber}
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
                      : "transparent",
                  opacity: 10,
                }}
              >
                {/* <View style={{ width: "6%", height: 80, borderRadius: 20 }}>
                  <View
                    style={{
                      height: 40,
                      backgroundColor: "#111F51",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "500",
                      }}
                    >
                      {answer.literal}
                    </Text>
                   
                  </View>
                  <View
                    style={{
                      height: 40,
                      backgroundColor: "#3E3E3E",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "500",
                      }}
                    >
                      {answer.points}
                    </Text>
                   
                  </View>
                </View> */}
                <View style={{ marginLeft: 20, width: "95%" }}>
                  {/* text2 */}
                  <Text
                    style={{
                      color: selectedAnswers[question.questionnumber] ===
                    parseInt(answerNumber)
                      ? "#FFFFFF"
                      : "#111F51",
                      fontSize: 20,
                      fontWeight: "500",
                      textAlign: "justify",
                    }}
                  >
                    {answer.text1}
                  </Text>
                  {/* text2 */}
                  <View style={styles.topicBox}>
                    {/* text1 */}
                    <Text style={styles.topicText}>{answer.text2}</Text>
                    {/* text1 */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* map the answer array */}
        </View>
      ))}
    </View>
  );
};

export default QuestionList;

const styles = StyleSheet.create({
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
});