import {
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
import { useNavigation } from "@react-navigation/native";
import TabCustomHeader from "../../components/TabCustomHeader";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Setup = () => {

  const navigation = useNavigation();
  const [evaluationOption, setEvaluationOption] = useState("api");
  const [showMarkStatus, setShowMarkStatus] = useState(false);
  const [showCompetitorsStatus, setShowCompetitorsStatus] = useState(false);
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState("");
  const [passwordState, setPasswordState] = useState({
    password: "",
    isSecure: true,
  });
    const updatePassword = (password) => {
      setPasswordState((prevState) => ({ ...prevState, password }));
    };
  const data = [
    { key: "1", value: "8080", disabled: true },
    { key: "2", value: "2020" },
    { key: "3", value: "7043" },
    { key: "7", value: "6023" },
  ];

  const toggleStatus = async (item) => {
    try {
      const statusData = await AsyncStorage.getItem(item);
      if (statusData) {
        const status = JSON.parse(statusData).status;
        console.log(`Current status of ${item}:`, status);
        await AsyncStorage.setItem(item, JSON.stringify({ status: !status }));
        console.log(`New status of ${item}:`, !status);
        if (item === "showmark") {
          setShowMarkStatus(!status);
        } else if (item === "showcompetitors") {
          setShowCompetitorsStatus(!status);
        }
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <TabCustomHeader title={t("common:setupt")} />

      {/* screen content */}
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
            height: 60,
            backgroundColor: COLORS.AltBlue,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom:5
          }}
        >
          <TouchableOpacity
            style={{ width: "50%", alignItems: "center" }}
            onPress={() => setEvaluationOption("api")}
          >
            <Text
              style={
                evaluationOption === "api"
                  ? styles.activeOptionText
                  : styles.inactiveOptionText
              }
            >
              {t("common:setupapi")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "50%", alignItems: "center" }}
            onPress={() => setEvaluationOption("approot")}
          >
            <Text
              style={
                evaluationOption === "approot"
                  ? styles.activeOptionText
                  : styles.inactiveOptionText
              }
            >
              {t("common:setuproot")}
            </Text>
          </TouchableOpacity>
        </View>
        {evaluationOption === "api" && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS.mainBlue,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: Platform.OS === "ios" ? 75 : 65,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
              Evaluator
            </Text>

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
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:refreeid")}
                />
              </View>
              <View
                style={{
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:refreemail")}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => toggleStatus("showmark")}
                >
                  <MaterialIcons
                    name={
                      showMarkStatus ? "check-box" : "check-box-outline-blank"
                    }
                    size={25}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.primary,
                      marginLeft: 10,
                    }}
                  >
                    {t("common:showm")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => toggleStatus("showcompetitors")}
                >
                  <MaterialIcons
                    name={
                      showCompetitorsStatus
                        ? "check-box"
                        : "check-box-outline-blank"
                    }
                    size={25}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.primary,
                      marginLeft: 10,
                    }}
                  >
                    {t("common:showc")}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.primary,
                    marginTop: 15,
                    marginBottom: 5,
                  }}
                >
                  {t("common:webserver")}
                </Text>

                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={data}
                  save="value"
                />
              </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
              {t("common:webserver")}
            </Text>

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
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:urladdress")}
                />
              </View>
              <View
                style={{
                  height: 60,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 20 }}
                  placeholder={t("common:subjectid")}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    height: 60,
                    width: "100%",
                    borderRadius: 10,
                    borderColor: COLORS.grey,
                    borderWidth: 2,
                    justifyContent: "space-between",
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    style={{ flex: 1, fontSize: 20 }}
                    secureTextEntry={passwordState.isSecure}
                    onChangeText={updatePassword}
                    placeholder="Password"
                  />
                  <Pressable
                    onPress={() => handlePasswordVisibility("password")}
                  >
                    <MaterialCommunityIcons
                      name={
                        passwordState.isSecure
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={22}
                      color={COLORS.gray}
                    />
                  </Pressable>
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.primary,
                    marginTop: 15,
                    marginBottom: 5,
                  }}
                >
                  {t("common:evalua")}
                </Text>

                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={data}
                  save="value"
                />
              </View>

              <View
                style={{
                  width: "100%",
                  height: 45,
                  marginTop: 15,
                  backgroundColor: COLORS.AltBlue,
                  borderRadius: 8,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.primary,
                    fontWeight: "600",
                  }}
                >
                  {t("common:loadev")}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 55,
                backgroundColor: COLORS.primary,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Feather name={"download"} size={22} color={COLORS.white} />
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 19,
                  fontWeight: "600",
                  marginLeft: 5,
                }}
              >
                {t("common:downloadev")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 55,
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}
            >
              <Feather name={"download"} size={22} color={COLORS.primary} />
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 19,
                  fontWeight: "600",
                  marginLeft: 5,
                }}
              >
                {t("common:downloadcomp")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
        {evaluationOption === "approot" && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS.mainBlue,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: Platform.OS === "ios" ? 75 : 65,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
              {t("common:setuproot")}
            </Text>

            <Text style={{ fontSize: 16, fontWeight: "400", marginTop: 10 }}>
              {t("common:rootsubtitle")}
            </Text>

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
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 16 }}
                  placeholder={t("common:directory")}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 10,
                  color: COLORS.gray,
                }}
              >
                {t("common:dirsubtitle")}
              </Text>
              <View
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 16 }}
                  placeholder={t("common:rootcomp")}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 10,
                  color: COLORS.gray,
                }}
              >
                {t("common:rootcompinf")}
              </Text>
              <View
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 16 }}
                  placeholder={t("common:rooteva")}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 10,
                  color: COLORS.gray,
                }}
              >
                {t("common:rootevainf")}
              </Text>

              <View
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderColor: COLORS.grey,
                  borderWidth: 2,
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 16 }}
                  placeholder={t("common:rootansw")}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 10,
                  color: COLORS.gray,
                }}
              >
                {t("common:answsubtitle")}
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 45,
                  marginTop: 15,
                  backgroundColor: COLORS.AltBlue,
                  borderRadius: 8,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.primary,
                    fontWeight: "600",
                  }}
                >
                  {t("common:dataload")}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Setup;

const styles = StyleSheet.create({
  activeOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    justifyContent: "center",
  },
  inactiveOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#49454F",
    justifyContent: "center",
  },
});
