import React, { useState } from "react";
import { Modal, View, Text, Button } from "react-native";

const DownloadEvaluationModal = ({ visible, onConfirm, onCancel, t }) => (
  <Modal
    transparent={true}
    visible={visible}
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          width: "60%",
        }}
      >
        <Text>{t("alert:datatext1")}</Text>
        <Text>{t("alert:datatext2")}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button title={t("alert:yes")} onPress={onConfirm} />
          <Button title={t("alert:no")} onPress={onCancel} />
        </View>
      </View>
    </View>
  </Modal>
);

export default DownloadEvaluationModal;