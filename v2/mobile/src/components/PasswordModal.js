import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { COLORS } from "../constants/theme";

const PasswordModal = ({ isVisible, onPasswordSubmit, onCancel }) => {
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const handleSubmit = () => {
    onPasswordSubmit(password);
    setPassword("");
  };

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t("common:passtext")}</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={t("common:password")}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t("common:submittext")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop:20
  },
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginBottom:20
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: '100%',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PasswordModal;
