import {
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/theme";
import TabCustomHeader from "../../components/TabCustomHeader";
import { useTranslation } from "react-i18next";
import ConfigDropdown from "../../components/ConfigDropdown";
import ColorConfigDropdown from "../../components/ColorConfigDropdown";

const Configuration = () => {
  const { t } = useTranslation();

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