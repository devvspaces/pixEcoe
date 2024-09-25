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

const Evaluate = () => {

  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader
        title={t("common:eco")}
        onBackPress={() => navigation.goBack()}
      />
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
      ></ScrollView>
    </View>
  );
};

export default Evaluate;

const styles = StyleSheet.create({});
