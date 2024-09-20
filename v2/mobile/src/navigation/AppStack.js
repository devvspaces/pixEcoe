import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
//Bottom tab navigator screens
import Setup from "../screen/tab/Setup";
import Evaluation from "../screen/tab/Evaluation";
import Configuration from "../screen/tab/Configuration";
import Help from "../screen/tab/Help";
import DeviceInfo from "../screen/general/DeviceInfo";
import DevicePassword from "../screen/general/DevicePassword";
import Eco from "../screen/general/Eco";
import Evaluate from "../screen/general/Evaluate";
import Filter from "../screen/general/Filter";
import HelpDetails from "../screen/general/HelpDetails";
import Students from "../screen/general/Students";
import Test from "../screen/general/Test";

const Tab = createBottomTabNavigator();

const Loading = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor="#000" />
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#FFFFFF"/>
    </View>
  </SafeAreaView>
);

const TabNavigator = () => {

  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={"Evaluation"}
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tab,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;

          if (route.name === "Setup") {
            iconSource = focused
              ? require("../../assets/icons/configactive.png")
              : require("../../assets/icons/configinactive.png");
            label = t("navigate:setup");
          } else if (route.name === "Evaluation") {
            iconSource = focused
              ? require("../../assets/icons/evaluationactive.png")
              : require("../../assets/icons/evaluationinactive.png");
            label = t("navigate:evaluation");
          } else if (route.name === "Configuration") {
            iconSource = focused
              ? require("../../assets/icons/settingsactive.png")
              : require("../../assets/icons/settingsinactive.png");
            label = t("navigate:configuration");
          } else if (route.name === "Help") {
            iconSource = focused
              ? require("../../assets/icons/helpactive.png")
              : require("../../assets/icons/helpinactive.png");
            label = t("navigate:help");
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
  const [loading, setLoading] = useState(true);
  const [appPassword, setAppPassword] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@appPassword");

      if (value !== null) {
        setAppPassword(true);
        console.log("Saved password:", value);
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={appPassword ? "Home" : "Auth"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={DevicePassword} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="evalutaion" component={Evaluate} />
        <Stack.Screen name="helpdetails" component={HelpDetails} />
        <Stack.Screen name="filter" component={Filter} />
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen name="students" component={Students} />
        <Stack.Screen name="eco" component={Eco} />
        <Stack.Screen name="deviceinfo" component={DeviceInfo} />
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#111F51",
  },
});
