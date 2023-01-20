import { styles } from "../styles";
import React, { useState, useEffect, useCallback } from "react";
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
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import SearchHTTPRequest from "./SearchHTTPRequest";

const ChatScreen = ({ navigation, route }) => {
    return (
        <SearchHTTPRequest  data={{ 'navigation': navigation,  'httpRequestType': 'Search', 'email': route.params?.email }} />
    );
}
export default ChatScreen;