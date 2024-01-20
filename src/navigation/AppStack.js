import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

//Bottom tab navigator screens
import Setup from "../screens/Setup";
import Evaluation from "../screens/Evaluation";
import Configuration from "../screens/Configuration";
import Help from "../screens/Help";

import EvaluationProcess from "../screens/EvaluationProcess";
import HelpDetails from "../screens/HelpDetails";
import Filter from "../screens/Filter";
import Test from "../screens/Test";
import CompetitorsList from "../screens/CompetitorsList";
import Eco from "../screens/Eco";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tab,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;

          if (route.name === "Setup") {
            iconSource = focused
              ? require("../../assets/icons/setupa.png")
              : require("../../assets/icons/setup.png");
            label = "Setup";
          } else if (route.name === "Evaluation") {
            iconSource = focused
              ? require("../../assets/icons/evaluationa.png")
              : require("../../assets/icons/evaluation.png");
            label = "Evaluation";
          } else if (route.name === "Configuration") {
            iconSource = focused
              ? require("../../assets/icons/settingsa.png")
              : require("../../assets/icons/settings.png");
            label = "Configuration";
          } else if (route.name === "Help") {
            iconSource = focused
              ? require("../../assets/icons/helpa.png")
              : require("../../assets/icons/help.png");
            label = "Help";
          }

          return (
            <View style={styles.tabContainer}>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={styles.tabIcon}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#3E3E3E" : "#CCCCCC" },
                ]}
              >
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Setup"
        component={Setup}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Evaluation"
        component={Evaluation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Configuration"
        component={Configuration}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="evalutaionProcess" component={EvaluationProcess} />
        <Stack.Screen name="helpdetails" component={HelpDetails} />
        <Stack.Screen name="filter" component={Filter} />
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen name="competitorslist" component={CompetitorsList} />
        <Stack.Screen name="eco" component={Eco} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  tab: {
    borderTopWidth: 0,
    height: Platform.OS === "ios" ? 90 : 70,
    backgroundColor: "#ffffff",
    marginBottom: 0,
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    // Adjust this value as needed
  },
  tabIcon: {
    marginTop: 3,
    width: 25,
    height: 24,
  },
  tabLabel: {
    fontSize: 16,
    marginTop: 8,
    width: 100,
    textAlign: "center",
  },
});
