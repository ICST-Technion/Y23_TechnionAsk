import { styles } from "../styles";
import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import { useTranslation } from "react-i18next";
export default function WelcomePage({ navigation }) {
  const { t, i18n } = useTranslation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Welcome Page")
    })
  })
  return (

    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.Title}>
      {/* Welcome to TechnionAsk */}
      {t("Welcome to TechnionAsk")}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login Page')}>
        <Text>
        {/* Login */}
        {t("Login")}
        </Text>
      </TouchableOpacity>
      <View Style={styles.sectionWrapper}>
        <TouchableOpacity onPress={() => {
          i18n.changeLanguage(i18n.language === 'he' ? 'en' : 'he');
        }}>
          <Text>{t("change language")}</Text>
        </TouchableOpacity>
      </View>
    </View>


  );
}