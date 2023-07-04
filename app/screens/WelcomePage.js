import { styles, writingColor } from "../styles";
import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";


export default function WelcomePage({ navigation }) {
  const { t, i18n } = useTranslation();
  const writingDirAlign = (initialStyle) => {return [initialStyle, {writingDirection : i18n.dir()}]}; //Direction signifies the direction the language is writing in, right to left (rtl) or left to right (ltr)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Welcome Page")
    })
  })
  return (

    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={writingDirAlign(styles.Title)}>
      {/* Welcome to TechnionAsk */}
      {t("Welcome to TechnionAsk")}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Admin View Page')}>
        <Text style={writingDirAlign({color: writingColor})}>
        {/* Login */}
        {t("Login")}
        </Text>
      </TouchableOpacity>
    </View>


  );
}