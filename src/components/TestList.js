import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const TestList = ({ section }) => {
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
          <Text
            style={{
              color: "#111F51",
              fontSize: 18,
              fontWeight: "500",
              marginTop: 50,
              marginBottom: 10,
            }}
          >
            Question Number: {question.questionnumber}
          </Text>
          {/* map the answer array */}

          {Object.entries(question.answers).map(([answerNumber, answer]) => (
            <View
              style={{
                width: "100%",
              }}
              key={answerNumber}
            >
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "6%", height: 80, borderRadius: 20 }}>
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
                    {/* questionnumber + literal */}
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "500",
                      }}
                    >
                      {answer.literal}
                    </Text>
                    {/* questionnumber + literal */}
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
                    {/* points */}
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "500",
                      }}
                    >
                      {answer.points}
                    </Text>
                    {/* points */}
                  </View>
                </View>
                <View style={{ marginLeft: 40, width: "89%" }}>
                  {/* text2 */}
                  <Text
                    style={{
                      color: "#111F51",
                      fontSize: 20,
                      fontWeight: "500",
                      textAlign: "justify",
                    }}
                  >
                    {answer.text2}
                  </Text>
                  {/* text2 */}
                  <View style={styles.topicBox}>
                    {/* text1 */}
                    <Text style={styles.topicText}>{answer.text1}</Text>
                    {/* text1 */}
                  </View>
                </View>
              </View>
            </View>
          ))}
          {/* map the answer array */}
        </View>
      ))}
    </View>
  );
};

export default TestList;

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
