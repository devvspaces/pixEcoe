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

const Students = () => {

  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.mainBlue }}>
      {/* top bar and page title */}
      <CustomHeader
        title={t("common:studentsl")}
        onBackPress={() => navigation.goBack()}
      />

      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: COLORS.primary,
          marginTop: 25,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: COLORS.white,
            fontWeight: "400",
          }}
        >
          {t("common:studentstotal")}:
        </Text>
      </View>

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
        
      </ScrollView>
    </View>
  );
};

export default Students;

const styles = StyleSheet.create({});
