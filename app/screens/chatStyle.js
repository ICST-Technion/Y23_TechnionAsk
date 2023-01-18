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

const httpObj = new SearchHTTPRequest;
const ChatScreen = ({navigation, route}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello, '+ route.params?.email +'. Enter your question',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'N L P',
                },
            },
        ])
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        httpObj.getNLPsearchData('search', route.params?.email, messages[0].text)
        let sources = '';
        let sourcesArray = httpObj.state.data['Sources'].split('\n');
        for(let i=0; i < sourcesArray.length; i++) {
            sources += sourcesArray[i];
            sources += "\n";
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, {
                _id: 1,
                text: 'Answer: ' + httpObj.state.data['answer'] + "\n  Sources:\n" + sources,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'N L P',
                },
            },));
    }, [])
    return (
        <GiftedChat messages={messages} onSend={messages => onSend(messages)} user={{_id: 1,}} />
    );
}
export default ChatScreen;