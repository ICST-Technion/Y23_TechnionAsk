import { styles } from "../styles";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Linking,
    Animated
} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import { t } from "./i18n"
const backendURL = 'http://ec2-3-82-191-102.compute-1.amazonaws.com:65442/';
export function linkingSources(sourcesArray) {
    let sourceLinks = sourcesArray.map((sourceLink) => <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(sourceLink)}>{sourceLink}</Text>)
    return (
        <View>{sourceLinks}</View>
    );
}
export default class SearchHTTPRequest extends React.Component {
    state = {
        data: { 'data': '' },
        searchState: false,
        query: "When was World War II?",
        loading: false,
        animatedState: new Animated.Value(0.5),
        messages : [{
                        _id: 1,
                        text: 'Hello, '+ this.props.data['email'] +'. Enter your question',
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'N L P',
                        },
                    },],
    }
    authenticateEmailCredentials = (username, password) => {
        if (username == "" || password == "") { return; }
        return this.getNLPdata("login", '?username=' + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    }
    animationStateChange = () => {
        Animated.loop(
            Animated.timing(this.state.animatedState, {
                toValue: 25,
                duration: 3000,
                useNativeDriver: false,
            })).start()
    };
    animationLoading = () => {
        return (
            <View>
                <Text>{this.state.loading ?
                    <Animated.View style={{
                        alignItems: 'center',
                        opacity: this.state.animatedState, // Binds directly
                        height: 10,
                        transform: [
                            {
                                rotate: this.state.animatedState.interpolate({
                                    inputRange: [0, 25],
                                    outputRange: ['0deg', '360deg'],
                                }),
                            },
                        ],
                    }}>
                        <Image style={styles.loadingIcon} source={require('../../assets/loading-icon.png')} />
                    </Animated.View> : null}
                </Text>
            </View>
        );
    }
    getNLPdata = (route, paramList = "") => {
        if (route == "" || route == undefined)
            return;
        this.setState({ loading: true });
        fetch(backendURL+route+paramList)
        // The option above sends Email and Password as parameters, 
        // the option below sends them in a json body, uncomment in backend adding headers
        //  ,{
        //     method: 'OPTIONS',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: this.props.data['email'],
        //         password: this.props.data['password'],
        //     })
        // })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: responseJson,
                searchState: false,
                query: this.state.query,
                loading: false
            })
            return this.state.data['data'];
        })
        .catch(error => {
            this.setState({ loading: false });
            alert(error)
        });
    }
    async getNLPsearchData (route, user = "", query ="") {
        if("user" == "" || query == "" || route == "" || route == undefined)
            return;
        this.setState({loading : true});
        await fetch(backendURL+route+"/"+user+"/"+query)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: responseJson,
                searchState: true,
                query : query,
                loading : false
            }, this.forceUpdate());
        })
        .catch(error => {
            this.setState({loading : false});
            alert(error)
        });
    }
    componentDidMount = () => {
        if (this.props.data['httpRequestType'] == 'Search') { this.getNLPsearchData() }
        else { this.getNLPdata() }
        this.animationStateChange()
    }
    async onSend(messages = []) {
        this.setState({'messages' : GiftedChat.append(this.state.messages, messages)});
        await this.getNLPsearchData('search', this.props.data['email'], messages[0].text);
        let sources = '';
        let sourcesArray = this.state.data['Sources'].split('\n');
        for(let i=0; i < sourcesArray.length; i++) {
            sources += sourcesArray[i];
            sources += "\n";
        }
        this.setState({'messages' : GiftedChat.append(this.state.messages, 
            {
                _id: this.state.messages.length+1,
                text: 'Answer: ' + this.state.data['answer'] + "\nSources:\n" + sources,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'N L P',
                }}
        )});
    }
    render() {
        if(this.props.data['httpRequestType'] == 'Search') {
            return (
                <GiftedChat messages={this.state.messages} onSend={messages => {this.onSend(messages);}} user={{_id: 1,}} />);}
        if (this.props.data['httpRequestType'] == 'Sign-up') {
            return (
                <View style={styles.alignment}>

                    <TouchableOpacity style={styles.login_button} onPress={() => { this.getNLPdata('signup', '?username=' + encodeURIComponent(this.props.data['email']) + "&password=" + encodeURIComponent(this.props.data['password'])); }}>
                        <Text>{t("Sign up")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.data['navigation'].navigate('Login Page')}>
                        <Text >{t("Already have an account? Login")}</Text>
                    </TouchableOpacity>
                    <this.animationLoading />
                    {this.state.data['data'] == 'sign-up' && 'result' in this.state.data ? (this.state.data['result'] == 'Successfully registered' ? this.props.data['navigation'].navigate('Search Page', { 'email': this.props.data['email'] }) : <Text>Unable to sign up with given credentials</Text>) : null}
                </View>
            );
        }
        if (this.props.data['httpRequestType'] == 'Login') {
            return (
                <View style={styles.alignment}>
                    <TouchableOpacity style={styles.login_button} onPress={() => { this.authenticateEmailCredentials(this.props.data['email'], this.props.data['password']) }}>
                        <Text>{t("Login")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.data['navigation'].navigate('Sign up Page')}>
                        <Text >{t("Don't have an account? Sign up")}</Text>
                    </TouchableOpacity>
                    <this.animationLoading />
                    {this.state.data['data'] == 'login' && 'result' in this.state.data ? (this.state.data['result'] ? this.props.data['navigation'].navigate('Search Page', { 'email': this.props.data['email'] }) : <Text>Wrong Credentials</Text>) : null}
                </View>
            );
        }
    }
}