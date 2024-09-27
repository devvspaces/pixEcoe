import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Help = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <View>
        <StatusBar backgroundColor={COLORS.primary} />
        <View style={[styles.header]}>
          <Text style={styles.title}>{t("common:help")}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("deviceinfo")}
            style={{
              width: 35,
              height: 35,
              backgroundColor: COLORS.AltBlue,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name={"info"} size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.primary,
            marginTop: 15,
          }}
        >
          {t("help:helptitle")}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 1,
              title: t("help:help1"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help1")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 2,
              title: t("help:help2"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help2")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 3,
              title: t("help:help3"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help3")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 4,
              title: t("help:help4"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help4")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 5,
              title: t("help:help5"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help5")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 6,
              title: t("help:help6"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help6")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 7,
              title: t("help:help7"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help7")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 8,
              title: t("help:help8"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help8")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("helpdetails", {
              topicId: 9,
              title: t("help:help9"),
            })
          }
          style={{
            width: "100%",
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: COLORS.primary,
            }}
          >
            {t("help:help9")}
          </Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: COLORS.primary,
              marginTop: 20,
              lineHeight: 30,
            }}
          >
            {t("help:helpicontitle")}
          </Text>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"home"} size={25} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon1")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"arrow-left"} size={25} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon2")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"arrow-right"} size={25} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon3")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <AntDesign name={"delete"} size={25} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon4")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"save"} size={25} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon5")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <AntDesign name={"doubleleft"} size={20} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon6")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <AntDesign name={"doubleright"} size={20} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon7")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("deviceinfo")}
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"info"} size={20} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon8")}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <AntDesign
              name={"questioncircleo"}
              size={20}
              color={COLORS.primary}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon9")}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"download"} size={20} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon10")}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"upload"} size={20} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon11")}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              backgroundColor: COLORS.AltBlue,
              marginTop: 15,
              flexDirection: "row",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "center",
            }}
          >
            <Feather name={"edit"} size={20} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: COLORS.primary,
                marginLeft: 5,
              }}
            >
              {t("help:helpicon12")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    backgroundColor: COLORS.primary
  },
  title: {
    color: COLORS.white,
    fontSize: 25,
  },
});
