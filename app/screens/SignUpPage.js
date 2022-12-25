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

export default function SignUpPage({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    return (
        <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
    
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
        
        <View style={styles.input_view}>
            <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(passwordConf) => setPasswordConf(passwordConf)}
            />
        </View>

        <TouchableOpacity style={styles.login_button}>
            <Text>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => navigation.navigate('Login Page')}>
            <Text >Already have an account? Login</Text>
        </TouchableOpacity>
        </View>
    );
}