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
import Feather from "react-native-vector-icons/Feather";

const helpDetails = {
  1: `
    1. Go to the setup page
    2. Enter the initial password to gain access
    3. Provide the Evaluator’s ID
    4. Provide the Evaluator's Email
    5. You can check the "Show marks" or "Show competitors name" checkboxes
    6. Enter the URL address. Note: It must not end with a back-slash "/"
    7. Enter the subject id
    8. Enter the password
    9. After all these have been provided, click the "Load stations" button. This will load the status for the subject id provided.
    10. Then using the “Stations” dropdown, select the station to download for the device.
    11. Then click on "Download stations". Suppose you have already started evaluating a previous station that has not been uploaded to the server. In that case, you will see a dialogue box confirming if you want to override that stored data.
    12. Click on the "Download students" button.
    13. Done.
  `,
  2: `
    1. Go to the setup page
    2. Enter the initial password to gain access
    3. Go to the "App root" tab by clicking on the App root button.
    4. Select the Students file (CSV file).
    5. Select the Station file (JSON file).
    6. Enter the name of the folder where the evaluation results will be stored.
    7. Don’t include ".json" in the file name
    8. Click on "Load Data"
    9. Done.
  `,
  3: `
    1. Use the Home icon on the bottom nav to ensure you are on the App home page.
    2. Click on the "Filter" button on the screen.
    3. Edit the "Group ID" input box to filter competitors for a group or wheel.
  `,
  4: `
    1. Use the Configuration icon on the bottom nav to go to the configuration screen.
    2. There you can use the Language dropdown to change the language.
  `,
  5: `
    1. After evaluating one or more competitors, click on the upload icon.
    2. This will try to upload the current evaluations to the server.
    3. If it’s successful or not, a file is stored locally as a backup for the evaluations.
  `,
  6: `
    1. First, ensure you have filtered competitors for a wheel if you want. If you don’t know how to do this, head to the "Filtering competitors" help section.
    2. Then use the Home icon on the bottom nav to ensure you are on the App home screen.
    3. Click on the "Eco" button.
    4. This will load and filter the evaluations for the current competitors.
    5. You can verify the current station and subject on the top of the screen.
    6. Click on any row for a competitor to evaluate that competitor. This will take you to the screen where you mark this competitor.
    7. You can evaluate the competitor for each question.
    8. You can use the "previous" and "next" icons on the top of the screen to move to the previous or next competitor.
    9. When you move to different competitors using the top icons, the current evaluation will be saved to the internal database.
    10. Using the "back" icon you can go back to the "Evaluations" screen.
  `,
  7: `
    1. After evaluating one or more competitors after following the marking process, click on the upload icon.
    2. Ensure you are on the "Evaluations screen". The screen where the list of all the evaluations is displayed on a table.
    3. Click the upload icon at the top of the screen to upload the results to the server and save them in the internal storage.
  `,
};

const HelpDetails = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { topicId, title } = route.params;
  const details = helpDetails[topicId];

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader title={title} onBackPress={() => navigation.goBack()} />
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.mainBlue,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 75 : 65,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.AltBlue,
            borderRadius: 10,
            marginTop: 15,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Feather name={"info"} size={25} color={COLORS.primary} />

          <Text style={{ fontSize: 17, textAlign: "left", lineHeight: 27 }}>
            {details}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpDetails;

const styles = StyleSheet.create({});
