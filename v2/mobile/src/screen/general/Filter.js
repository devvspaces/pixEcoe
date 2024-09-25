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

const Filter = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader
        title={t("common:filt")}
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          backgroundColor: COLORS.mainBlue,
        }}
      >
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            backgroundColor: COLORS.white,
            marginTop: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: COLORS.grey,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: COLORS.gray,
              }}
            ></Text>
          </View>

          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: COLORS.gray,
              }}
            ></Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 45,
              marginTop: 15,
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                fontWeight: "400",
              }}
            >
              {t("common:save")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
