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
import { useNavigation } from "@react-navigation/native";
import TabCustomHeader from "../../components/TabCustomHeader";
import { useTranslation } from "react-i18next";

const Evaluation = () => {

  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <TabCustomHeader title={t("common:evaluation")} />

      {/* screen content */}

      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.mainBlue,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("filter")}
          style={{
            height: "20%",
            width: "100%",
            backgroundColor: COLORS.secBlue,
            marginTop: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: COLORS.white,
            }}
          >
            {t("common:filt")}
          </Text>
          <Image
            source={require("../../../assets/icons/filter.png")}
            resizeMode="contain"
            style={{
              height: 90,
              width: 90,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("students")}
          style={{
            height: "20%",
            width: "100%",
            backgroundColor: COLORS.secBlue,
            marginTop: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: COLORS.white,
            }}
          >
            {t("common:competlist")}
          </Text>
          <Image
            source={require("../../../assets/icons/students.png")}
            resizeMode="contain"
            style={{
              height: 90,
              width: 90,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("test")}
          style={{
            height: "20%",
            width: "100%",
            backgroundColor: COLORS.secBlue,
            marginTop: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: COLORS.white,
            }}
          >
            {t("common:test")}
          </Text>
          <Image
            source={require("../../../assets/icons/test.png")}
            resizeMode="contain"
            style={{
              height: 90,
              width: 90,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("evaluate")}
          style={{
            height: "20%",
            width: "100%",
            backgroundColor: COLORS.secBlue,
            marginTop: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: COLORS.white,
            }}
          >
            {t("common:eco")}
          </Text>
          <Image
            source={require("../../../assets/icons/evaluate.png")}
            resizeMode="contain"
            style={{
              height: 90,
              width: 90,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Evaluation;

const styles = StyleSheet.create({});
