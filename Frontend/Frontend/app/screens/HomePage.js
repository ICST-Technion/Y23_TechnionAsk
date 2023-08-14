import React, { useLayoutEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./SettingsPage";
import WelcomePage from "./WelcomePage";


const Tab = createBottomTabNavigator();

export default function Home({navigation}) {
    const { t, i18n } = useTranslation();
    document.dir = i18n.dir();
    
    useLayoutEffect(() => {
      navigation.setOptions({
        title: t("Home")
      })
    })
    return (
      <Tab.Navigator screenOptions={ ({ route }) => ({
        tabBarItemStyle: {direction: i18n.dir(), justifyContent: 'space-evenly'},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Welcome Page') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
  
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#b88d20',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
        tabBarActiveBackgroundColor: '#0f1d41',
        tabBarInactiveBackgroundColor: '#0f1d41',
      })} >
        <Tab.Screen name="Welcome Page" component={WelcomePage}/>
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }