import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "spa", label: "Español" },
  { code: "ca", label: "Catalan" },
  { code: "gl", label: "Galician" },
  { code: "eu", label: "Euskera" },
];

const ConfigDropdown = ({ options, onSelect }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code) => {
    i18n.changeLanguage(code);
    setSelectedOption(LANGUAGES.find((language) => language.code === code));
    setModalVisible(false);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    onSelect(option);
  };

  const renderLanguageButton = (language) => {
    const selectedLanguage = language.code === selectedLanguageCode;
    return (
      <Pressable
        key={language.code}
        style={styles.buttonContainer}
        disabled={selectedLanguage}
        onPress={() => setLanguage(language.code)}
      >
        <Text style={[selectedLanguage ? styles.selectedText : styles.text]}>
          {language.label}
        </Text>
      </Pressable>
    );
  };

  let selectedLanguageLabel = "";
  if (selectedLanguageCode === "en") {
    selectedLanguageLabel = "English";
  } else if (selectedLanguageCode === "spa") {
    selectedLanguageLabel = "Español";
  } else if (selectedLanguageCode === "ca") {
    selectedLanguageLabel = "Catalan";
  } else if (selectedLanguageCode === "gl") {
    selectedLanguageLabel = "Galician";
  } else if (selectedLanguageCode === "eu") {
    selectedLanguageLabel = "Euskera";
  }

  return (
    <View style={{width: "100%" }}>
      <Text style={styles.label}>{t("common:language")}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.inputBox}>
          <Text style={styles.placeholder}>{selectedLanguageLabel}</Text>
          <Icon name="chevron-down" size={20} color="#555" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={{ fontSize: 12 }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.languageSelector}>
              <Text style={styles.languageSelectorTitle}>
                {t("common:languageSelector")}
              </Text>
              {LANGUAGES.map(renderLanguageButton)}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default ConfigDropdown;

const styles = StyleSheet.create({
  label: {
    color: "#000",
    fontSize: 20,
    fontWeight: "400",
  },
  inputBox: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    borderColor: "#EEE",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    color: "#555",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: 500,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  languageSelector: {
    marginTop: 20,
  },
  languageSelectorTitle: {
    color: "#444",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: "#000",
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "600",
    color: "tomato",
    paddingVertical: 4,
  },
});


