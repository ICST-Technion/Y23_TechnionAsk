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

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();
  const writingDirAlign = (initialStyle) => {return [initialStyle, {writingDirection : i18n.dir()}]};

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
          style={writingDirAlign(styles.TextInput)}
          placeholder={t("Email")}
          placeholderTextColor="#fff"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <TouchableOpacity style={styles.login_button}>
        <Text style={writingDirAlign({color: '#fff'})}>{t("Reset Password")}</Text>
      </TouchableOpacity>
    </View>
  );
}