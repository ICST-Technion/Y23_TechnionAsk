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
  Linking
} from "react-native";
import { useTranslation } from "react-i18next";
import { hebrewFirst, hebrewLast, arabicFirst, arabicLast  } from "./SearchQueryHTTPRequest";

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();
  const writingDirAlign = (initialStyle) => {return [initialStyle, {writingDirection : i18n.dir()}]};
  const [alignDirectionUsername, setAlignDirectionUsername] = useState(i18n.dir());
  const changingWritingDirAlign = (initialStyle, alignment) => {return [initialStyle, {writingDirection : alignment}]};
  const checkAlignment = (word) => {
      if(word == "")
          return i18n.dir();
      var firstLetter = word[0].charCodeAt(0);
      if((firstLetter >= hebrewFirst && firstLetter <= hebrewLast) || (firstLetter >= arabicFirst && firstLetter <= arabicLast))
          return 'rtl';
      return 'ltr';
  
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Forgot Password Page")
    })
  })
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.Text}>
        <Text style={writingDirAlign(styles.Text)}>
          {t("Please enter your email")}
        </Text>
      </View>

      <View style={styles.input_view}>
        <TextInput
          style={changingWritingDirAlign(styles.TextInput, alignDirectionUsername)}
          placeholder={t("Email")}
          placeholderTextColor="#fff"
          onChangeText={(email) => {setAlignDirectionUsername(checkAlignment(email)); setEmail(email);}}
        />
      </View>

      <TouchableOpacity style={styles.login_button}>
        <Text style={writingDirAlign({color: '#fff'})}>{t("Reset Password")}</Text>
      </TouchableOpacity>
    </View>
  );
}