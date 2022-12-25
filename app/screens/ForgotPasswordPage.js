import { styles } from "../styles";
import React, { useState } from "react";
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

export default function ForgotPasswordPage({navigation}) {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
  
      <View style={styles.Text}>
        <Text style={styles.Text}>
          {"Please enter your email"}
        </Text>
      </View>

      <View style={styles.input_view}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      
      <TouchableOpacity style={styles.login_button}>
          <Text style={styles.paragraph}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}