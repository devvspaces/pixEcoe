import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
const HelpDetails = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const articletitle = route.params?.topic;
  const { t } = useTranslation();

  const renderContent = () => {
    switch (articletitle) {
      case t("help:topic1"):
        return (
          <View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:filterhelp1")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:filterhelp2")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:filterhelp3")}</Text>
            </View>
          </View>
        );
      case t("help:topic2"):
        return (
          <View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working1")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working2")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working3")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working4")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working5")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working6")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working7")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working8")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working9")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working10")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working11")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:working12")}</Text>
            </View>
          </View>
        );
      case t("help:topic3"):
        return (
          <View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:lang1")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:lang2")}</Text>
            </View>
          </View>
        );
      case t("help:topic4"):
        return (
          <View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:storage1")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:storage2")}</Text>
            </View>
          </View>
        );
      case t("help:topic5"):
        return (
          <View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:evaluate1")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:evaluate2")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:evaluate3")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:evaluate4")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:evaluate5")}</Text>
            </View>
          </View>
        );
      case t("help:topic6"):
        return (
          <View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:result1")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:result2")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:result3")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:result4")}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dash" size={20} color="#555" />
              <Text style={styles.infoText}>{t("help:result5")}</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{articletitle}</Text>
      </View>
      <View style={styles.content}>
        
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default HelpDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
  header: {
    height: 60,
    backgroundColor: "#111F51",
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection:'row',
    alignItems: 'center'
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginLeft:20
  },
  content: {
    backgroundColor: "#9FD1FF",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  contentTitle: {
    color: "#9E9E9E",
    fontSize: 16,
    fontWeight: "500",
    marginBottom:10
  },
  infoItem: {
    marginTop: 10,
    flexDirection: "row",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});
