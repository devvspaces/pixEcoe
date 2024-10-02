import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../constants/theme";

const ColorConfigDropdown = ({ label, options, onSelect, placeholderLabel }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    onSelect(option);
  };

  const placeholder = selectedOption ? selectedOption.label : placeholderLabel;

  return (
    <View style={{ marginTop: 10, width: "100%" }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.inputBox}>
          <Text style={styles.placeholder}>{placeholder}</Text>
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
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
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default ColorConfigDropdown;

const styles = StyleSheet.create({
  label: {
    color: "#000",
    fontSize: 20,
    fontWeight: "400",
    marginTop: 10,
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
  closeButton: {
    alignSelf: "flex-end", // Align close button to the right
    marginBottom: 10, // Add margin for better spacing
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
});


