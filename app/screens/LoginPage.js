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
import SearchHTTPRequest from "./SearchHTTPRequest";
import { useTranslation } from "react-i18next";
import { writingColor } from "../styles";

export default function LoginPage({ navigation }) {
    const { t, i18n } = useTranslation();
    const writingDirAlign = (initialStyle) => {return [initialStyle, {writingDirection : i18n.dir()}]};
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("Login Page")
        })
    })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.outterContainer}>
            <View style={styles.halfContainer}>
                <Image style = {styles.logo} source={require("../../assets/logo.png")} />
                <View style={styles.input_view}>
                    <TextInput
                        style={writingDirAlign(styles.TextInput)}
                        placeholder={t("Email.")}
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.input_view}>
                    <TextInput
                        style={writingDirAlign(styles.TextInput)}
                        placeholder={t("Password.")}
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <TouchableOpacity>
                    <Text style={writingDirAlign({color: writingColor})} onPress={() => navigation.navigate('Forgot Password Page')}>{t("Forgot Password?")}</Text>
                </TouchableOpacity></View>
            <SearchHTTPRequest data={{ 'navigation': navigation, 'httpRequestType': 'Login', 'email': email, 'password': password }} />
        </View>
    );
}