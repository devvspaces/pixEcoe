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
import Setup from "../screens/Setup";
import Evaluation from "../screens/Evaluation";
import Configuration from "../screens/Configuration";
import Help from "../screens/Help";
import DeviceScreen from "../screens/DeviceScreen";
import EvaluationProcess from "../screens/EvaluationProcess";
import HelpDetails from "../screens/HelpDetails";
import Filter from "../screens/Filter";
import Test from "../screens/Test";
import CompetitorsList from "../screens/CompetitorsList";
import Eco from "../screens/Eco";
import DevicePassword from "../screens/DevicePassword";

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
              ? require("../../assets/icons/setupa.png")
              : require("../../assets/icons/setup.png");
            label = t("navigate:setup");
          } else if (route.name === "Evaluation") {
            iconSource = focused
              ? require("../../assets/icons/evaluationa.png")
              : require("../../assets/icons/evaluation.png");
            label = t("navigate:evaluation");
          } else if (route.name === "Configuration") {
            iconSource = focused
              ? require("../../assets/icons/settingsa.png")
              : require("../../assets/icons/settings.png");
            label = t("navigate:configuration");
          } else if (route.name === "Help") {
            iconSource = focused
              ? require("../../assets/icons/helpa.png")
              : require("../../assets/icons/help.png");
            label = t("navigate:help");
          } else if (route.name === "DeviceScreen") {
            iconSource = focused
              ? require("../../assets/icons/infoa.png")
              : require("../../assets/icons/info.png");
            label = t("navigate:deviceinfo");
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
      <Tab.Screen
        name="DeviceScreen"
        component={DeviceScreen}
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
