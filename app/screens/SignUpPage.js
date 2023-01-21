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
export default function SignUpPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t, i18n } = useTranslation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("Sign up Page")
        })
    })
    return (
        <View style={styles.outterContainer}>
            <View style={styles.halfContainer}>
                <Image style = {styles.logo}  source={require("../../assets/logo.png")} />
                <View style={styles.input_view}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={t("Email.")}
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.input_view}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={t("Password.")}
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                {/* <View style={styles.input_view}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(passwordConf) => setPasswordConf(passwordConf)}
                    />
                </View> */}
            </View>
            <SearchHTTPRequest data={{ 'navigation': navigation, 'httpRequestType': 'Sign-up', 'email': email, 'password': password }} />

        </View>
    );
}