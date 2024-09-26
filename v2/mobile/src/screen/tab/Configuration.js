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
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabCustomHeader from "../../components/TabCustomHeader";
import { useTranslation } from "react-i18next";
import { SelectList } from "react-native-dropdown-select-list";
import ConfigDropdown from "../../components/ConfigDropdown";
import ColorConfigDropdown from "../../components/ColorConfigDropdown";
const Configuration = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState("");
 const data = [
   { key: "1", value: "8080", disabled: true },
   { key: "2", value: "2020" },
   { key: "3", value: "7043" },
   { key: "7", value: "6023" },
 ];
  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <TabCustomHeader title={t("common:config")} />
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
          <ConfigDropdown />
          <ColorConfigDropdown
            label={t("common:theme")}
            placeholderLabel="Dark Blue"
          />
        </View>
      </View>
    </View>
  );
};

export default Configuration;

const styles = StyleSheet.create({});
