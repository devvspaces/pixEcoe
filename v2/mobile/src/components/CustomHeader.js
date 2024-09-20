import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/theme";

const CustomHeader = ({
  title,
  onBackPress,
  backgroundColor = COLORS.primary,
}) => {
  return (
    <View>
      <StatusBar backgroundColor={backgroundColor} />
      <View style={[styles.header, { backgroundColor }]}>
        {/* Back Icon */}
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name={"arrow-back"} size={30} color={COLORS.white} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    marginLeft: 10,
  },
});
