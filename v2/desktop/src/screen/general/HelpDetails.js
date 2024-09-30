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

const HelpDetails = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { topicId, title } = route.params;

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
            {t(`helpDetails:${topicId}`)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpDetails;

const styles = StyleSheet.create({});
