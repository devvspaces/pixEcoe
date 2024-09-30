import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { COLORS } from "../constants/theme";

const TestQuestionList = ({
  section,
}) => {

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
        <View key={question.questionnumber} style={{backgroundColor:COLORS.white,  marginTop:20,paddingVertical:10, paddingHorizontal:10, borderRadius:10, borderWidth:1, borderColor:COLORS.primary }}>

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
            <View
              style={{
                width: "100%",
              }}
              key={answerNumber}
              
            >
              <View
                style={{
                  borderColor:
                    "transparent",
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: "row",
                  backgroundColor:
                     "transparent",
                  opacity: 10,
                }}
              >
               
                <View style={{ marginLeft: 20, width: "95%" }}>
                  {/* text2 */}
                  <Text
                    style={{
                      color:
                        "#111F51",
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
            </View>
          ))}
          {/* map the answer array */}
        </View>
      ))}
    </View>
  );
};

export default TestQuestionList;

const styles = StyleSheet.create({
  topicBox: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS.mainBlue,
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 20,

  },
  topicText: {
    backgroundColor: COLORS.white,
    fontSize: 18,
    paddingVertical:10,
    paddingHorizontal:10,
    width:'95%',
    borderRadius:5
  },
});