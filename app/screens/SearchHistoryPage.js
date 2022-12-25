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

const SearchHistoryPage = ({navigation, route}) => {
    var answers = "";
    for(let i = 0; i < route.params?.answerArray.length; i++)
    {
        answers+=route.params?.answerArray[i];
        answers+="\n";
    }
    return (
        <View>
            <Text style={styles.Title}>Search History</Text>
            <View>
                <Text style={styles.Header}>
                {route.params?.question}
                </Text>
            </View>
            <View>
                <Text style={styles.Text}>
                {answers}
                </Text>
            </View>
        </View>
    );
}

export default SearchHistoryPage;