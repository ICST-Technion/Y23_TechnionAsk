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

export default function LoginPage({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    
        <TouchableOpacity>
            <Text style={styles.paragraph}  onPress={() => navigation.navigate('Forgot Password Page')}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.login_button} onPress={() => navigation.navigate({name: 'Search Page', params: {email: email}})}>
            <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Sign up Page')}>
            <Text >Don't have an account? Sign up</Text>
        </TouchableOpacity>
        </View>
    );
}