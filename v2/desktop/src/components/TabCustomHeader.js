import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLORS } from "../constants/theme";

const TabCustomHeader = ({
  title,
  backgroundColor = COLORS.primary,
}) => {
  return (
    <View>
      <StatusBar backgroundColor={backgroundColor} />
      <View style={[styles.header, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={{
            width: 35,
            height: 35,
            backgroundColor: COLORS.AltBlue,
            borderRadius: 10,
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Feather name={"info"} size={25} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );
};

export default TabCustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent:'space-between'
  },
  title: {
    color: COLORS.white,
    fontSize: 25,
  },
});
