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
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Forgot Password Page")
    })
  })
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.Text}>
        <Text style={styles.Text}>
          {t("Please enter your email")}
        </Text>
      </View>

      <View style={styles.input_view}>
        <TextInput
          style={styles.TextInput}
          placeholder={t("Email")}
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <TouchableOpacity style={styles.login_button}>
        <Text style={styles.paragraph}>{t("Reset Password")}</Text>
      </TouchableOpacity>
    </View>
  );
}