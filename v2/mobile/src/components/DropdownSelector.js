import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { COLORS } from "../constants/theme";

const DropdownSelector = ({ label, options, onSelect, placeholderLabel }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    onSelect(option);
  };

  const placeholder = selectedOption ? selectedOption.label : placeholderLabel ;

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.inputBox}>
          <Text style={styles.placeholder}>{placeholder}</Text>
          <Icon name="chevron-with-circle-down" size={20} color={COLORS.primary} style={{right:10}}/>
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "400",
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    height: 50,
    backgroundColor:COLORS.white,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth:1,
    borderColor:COLORS.gray,
    paddingLeft:10
  },
  placeholder: {
    color: COLORS.gray,
    height: 16,
    width: Platform.OS === "ios" ? 260 : 300,
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
});

export default DropdownSelector;
