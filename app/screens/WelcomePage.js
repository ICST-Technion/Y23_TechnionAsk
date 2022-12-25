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

export default function WelcomePage({navigation}) {
    return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../../assets/logo.png")} />
          <Text style={styles.Title}>Welcome to TechnionAsk</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login Page')}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      );
}