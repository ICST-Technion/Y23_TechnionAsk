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
import SearchHTTPRequest from "./SearchHTTPRequest";

export default function LoginPage({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.outterContainer}>
        <View style={styles.halfContainer}>
            <Image source={require("../../assets/logo.png")} />
            <View style={styles.input_view}>
                <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.input_view}>
                <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text onPress={() => navigation.navigate('Forgot Password Page')}>Forgot Password?</Text>
            </TouchableOpacity></View>
            <SearchHTTPRequest data={{'navigation' : navigation, 'httpRequestType' : 'Login', 'email' : email, 'password' : password}}/>
        </View>
    );
}