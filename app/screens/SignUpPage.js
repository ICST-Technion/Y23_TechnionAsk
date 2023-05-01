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
import { arabicFirst, arabicLast, hebrewFirst, hebrewLast } from "./SearchHTTPRequest";

export default function SignUpPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t, i18n } = useTranslation();
    const [alignDirectionUsername, setAlignDirectionUsername] = useState(i18n.dir());
    const [alignDirectionPassword, setAlignDirectionPassword] = useState(i18n.dir());
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
            title: t("Sign up Page")
        })
    })
    return (
        <View style={styles.outterContainer}>
            <View style={styles.halfContainer}>
                <Image style = {styles.logo}  source={require("../../assets/logo.png")} />
                <View style={styles.input_view}>
                    <TextInput
                        style={changingWritingDirAlign(styles.TextInput, alignDirectionUsername)}
                        placeholder={t("Email.")}
                        placeholderTextColor="#fff"
                        onChangeText={(email) => {setAlignDirectionUsername(checkAlignment(email)); setEmail(email);}}
                    />
                </View>

                <View style={styles.input_view}>
                    <TextInput
                        style={changingWritingDirAlign(styles.TextInput, alignDirectionPassword)}
                        placeholder={t("Password.")}
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => {setAlignDirectionPassword(checkAlignment(password)); setPassword(password)}}
                    />
                </View>

                {/* <View style={styles.input_view}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password."
                    placeholderTextColor="#fff"
                    secureTextEntry={true}
                    onChangeText={(passwordConf) => setPasswordConf(passwordConf)}
                    />
                </View> */}
            </View>
            <SearchHTTPRequest data={{ 'navigation': navigation, 'httpRequestType': 'Sign-up', 'email': email, 'password': password }} />

        </View>
    );
}