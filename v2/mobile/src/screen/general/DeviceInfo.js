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
import DeviceInfo from "react-native-device-info";

const DeviceInformation = () => {

  const { t } = useTranslation();
  const navigation = useNavigation();

  const [deviceInfo, setDeviceInfo] = useState({
    name: "",
    model: "",
    version: "",
    uuid: "",
    serial: "",
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const name = await DeviceInfo.getDeviceName();
      const model = await DeviceInfo.getModel();
      const version = await DeviceInfo.getSystemVersion();
      const uuid = await DeviceInfo.getUniqueId();
      const serial = await DeviceInfo.getSerialNumber();

      setDeviceInfo({ name, model, version, uuid, serial });
    };

    fetchDeviceInfo();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader
        title={t("common:devicei")}
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
            }}
          >
            {t("common:namei")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {deviceInfo.name}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 15,
            }}
          >
            {t("common:modeli")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {deviceInfo.model}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 15,
            }}
          >
            {t("common:versioni")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {deviceInfo.version}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 15,
            }}
          >
            {t("common:uuidi")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {deviceInfo.uuid}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 10,
            }}
          >
            {t("common:seriai")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {deviceInfo.serial}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.primary,
            marginTop: 15,
          }}
        >
          {t("common:others")}
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
            }}
          >
            {t("common:deviceilang")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {/* {deviceInfo.name} */}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 15,
            }}
          >
            {t("common:devicetype")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {/* {deviceInfo.model} */}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 15,
            }}
          >
            {t("common:activec")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {/* {deviceInfo.version} */}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 15,
            }}
          >
            {t("common:connectty")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {/* {deviceInfo.uuid} */}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 10,
            }}
          >
            {t("common:lastup")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {/* {deviceInfo.serial} */}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
              marginTop: 10,
            }}
          >
            {t("common:validl")}
          </Text>
          <View
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 10,
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
            >
              {/* {deviceInfo.serial} */}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.primary,
            marginTop: 20,
          }}
        >
          {t("common:versioni")}
        </Text>
        <View
          style={{
            height: 50,
            width: "100%",
            borderWidth: 1,
            borderColor: COLORS.gray,
            borderRadius: 10,
            marginTop: 10,
            paddingLeft: 10,
            justifyContent: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
            }}
          >
            {/* {deviceInfo.serial} */}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.primary,
            marginTop: 15,
          }}
        >
          {t("common:config")}
        </Text>
        <View
          style={{
            height: 50,
            width: "100%",
            borderWidth: 1,
            borderColor: COLORS.gray,
            borderRadius: 10,
            marginTop: 10,
            paddingLeft: 10,
            justifyContent: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.gray,
            }}
          >
            {/* {deviceInfo.serial} */}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeviceInformation;

const styles = StyleSheet.create({});
