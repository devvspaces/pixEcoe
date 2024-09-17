import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import DeviceInfo from "react-native-device-info";

const DeviceScreen = () => {
  
  const { t } = useTranslation();

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
    <SafeAreaView style={styles.container}>
      <StatusBar style={{ backgroundColor: "#111F51" }} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#9FD1FF",
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 75 : 65,
        }}
      >
        <Text style={{ color: "#000", fontSize: 20, fontWeight: "600" }}>
          {t("common:devicei")}
        </Text>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:namei")}: {deviceInfo.name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:modeli")}: {deviceInfo.model}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:versioni")}: {deviceInfo.version}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:uuidi")}: {deviceInfo.uuid}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:seriai")}: {deviceInfo.serial}
            </Text>
          </View>
        </View>

        <Text style={{ color: "#000", fontSize: 20, fontWeight: "600" }}>
          {t("common:othersi")}
        </Text>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:devicelan")}:
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:deviceq")}:
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:activec")}:
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:connectty")}:
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:lastup")}:
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              {t("common:validl")}:
            </Text>
          </View>
        </View>

        <Text style={{ color: "#000", fontSize: 20, fontWeight: "600" }}>
          {t("common:version")}
        </Text>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#eee",
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>
              1.1.0
            </Text>
          </View>
        </View>

        <Text style={{ color: "#000", fontSize: 20, fontWeight: "600" }}>
          {t("common:config")}
        </Text>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#eee",
              paddingLeft: 10,
              justifyContent: "center",
            }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
});
